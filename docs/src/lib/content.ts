/**
 * Lightweight frontmatter parser (browser-safe, no Buffer dependency).
 * gray-matter relies on Node.js Buffer which is unavailable in browsers.
 */
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {}, content: raw };

    const yamlBlock = match[1];
    const content = match[2];

    // Simple YAML key:value parser (handles title, order, etc.)
    const data: Record<string, any> = {};
    for (const line of yamlBlock.split("\n")) {
        const kv = line.match(/^(\w[\w-]*)\s*:\s*(.+)$/);
        if (kv) {
            const key = kv[1];
            let val: any = kv[2].trim();
            // Unquote strings
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            // Coerce numbers
            if (/^\d+$/.test(val)) val = Number(val);
            // Coerce booleans
            if (val === "true") val = true;
            if (val === "false") val = false;
            data[key] = val;
        }
    }

    return { data, content };
}

// Glob import all markdown files as raw strings at build time
const markdownModules = import.meta.glob("/content/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

export interface Heading {
    id: string;
    text: string;
    level: number;
}

export interface ContentPage {
    slug: string;
    section: string;
    subSection?: string;
    title: string;
    content: string;
    headings: Heading[];
    path: string;
    order: number;
    filePath: string;
}

/**
 * Section mapping: wiki folder → route section
 */
const SECTION_MAP: Record<string, string> = {
    "getting-started": "getting-started",
    roles: "roles",
    workflows: "workflows",
    tools: "tools",
    reference: "reference",
};

/**
 * Order mapping for files within sections (for prev/next navigation)
 */
const SECTION_ORDER: Record<string, string[]> = {
    "getting-started": ["README", "how-we-work", "first-week-checklist", "first-win-guide"],
    workflows: ["README", "team-workflow", "sprint-refinement", "sprint-planning", "weekly-sync"],
    reference: [
        "README",
        "quality-gates",
        "coding-standards",
        "handoff-format",
        "shared-resources",
        "api-contract-convention",
        "fe-be-coordination",
        "lifecycle-types",
        "plan-task-limits",
    ],
};

/**
 * Extract title from markdown content (first H1)
 */
function extractTitleFromContent(content: string): string {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : "Untitled";
}

/**
 * Extract headings (H2, H3) from markdown for ToC
 */
function extractHeadings(content: string): Heading[] {
    const headings: Heading[] = [];
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const text = match[2].trim();
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

        headings.push({
            id,
            text,
            level: match[1].length,
        });
    }

    return headings;
}

/**
 * Extract slug from file path
 * /content/roles/ba/README.md → "README"
 * /content/tools/git/setup.md → "setup"
 */
function extractSlug(filePath: string): string {
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    return fileName.replace(".md", "");
}

/**
 * Extract section from file path
 * /content/roles/ba/README.md → "roles"
 * /content/tools/git/setup.md → "tools"
 * /content/README.md → "home"
 */
function extractSection(filePath: string): string {
    const parts = filePath.replace("/content/", "").split("/");
    if (parts.length === 1) return "home"; // Root README.md
    return SECTION_MAP[parts[0]] || parts[0];
}

/**
 * Extract sub-section from file path (for nested structures like tools/git, roles/ba)
 * /content/tools/git/setup.md → "git"
 * /content/roles/ba/README.md → "ba"
 */
function extractSubSection(filePath: string): string | undefined {
    const parts = filePath.replace("/content/", "").split("/");
    if (parts.length >= 3) return parts[1];
    return undefined;
}

/**
 * Build route path from section, sub-section, and slug
 */
function buildRoutePath(section: string, subSection: string | undefined, slug: string): string {
    if (section === "home") return "/";

    const basePath = `/${section}`;

    if (subSection) {
        // e.g., /tools/git, /roles/ba
        if (slug === "README") return `${basePath}/${subSection}`;
        return `${basePath}/${subSection}/${slug}`;
    }

    // e.g., /getting-started, /reference/quality-gates
    if (slug === "README") return basePath;
    return `${basePath}/${slug}`;
}

/**
 * Get order index for sorting
 */
function getOrder(section: string, slug: string): number {
    const sectionOrder = SECTION_ORDER[section];
    if (sectionOrder) {
        const index = sectionOrder.indexOf(slug);
        return index >= 0 ? index : 999;
    }
    return slug === "README" ? 0 : 999;
}

/**
 * Process all markdown modules into ContentPage objects
 */
function processPages(): ContentPage[] {
    return Object.entries(markdownModules)
        .map(([filePath, raw]) => {
            const { data, content } = parseFrontmatter(raw);
            const slug = extractSlug(filePath);
            const section = extractSection(filePath);
            const subSection = extractSubSection(filePath);

            return {
                slug,
                section,
                subSection,
                title: data.title || extractTitleFromContent(content),
                content,
                headings: extractHeadings(content),
                path: buildRoutePath(section, subSection, slug),
                order: data.order ?? getOrder(section, slug),
                filePath,
            };
        })
        .sort((a, b) => a.order - b.order);
}

// Cache processed pages
let _cachedPages: ContentPage[] | null = null;

function getPages(): ContentPage[] {
    if (!_cachedPages) {
        _cachedPages = processPages();
    }
    return _cachedPages;
}

/**
 * Get all pages
 */
export function getAllPages(): ContentPage[] {
    return getPages();
}

/**
 * Get a single page by its route path
 */
export function getPageByPath(path: string): ContentPage | undefined {
    return getPages().find((p) => p.path === path);
}

/**
 * Get pages by section
 */
export function getPagesBySection(section: string): ContentPage[] {
    return getPages().filter((p) => p.section === section);
}

/**
 * Get pages by section and sub-section
 */
export function getPagesBySubSection(section: string, subSection: string): ContentPage[] {
    return getPages().filter((p) => p.section === section && p.subSection === subSection);
}

/**
 * Get sections list with page counts
 */
export function getSections(): { name: string; count: number }[] {
    const pages = getPages();
    const sectionCounts = new Map<string, number>();

    for (const page of pages) {
        const count = sectionCounts.get(page.section) || 0;
        sectionCounts.set(page.section, count + 1);
    }

    return Array.from(sectionCounts.entries()).map(([name, count]) => ({
        name,
        count,
    }));
}
