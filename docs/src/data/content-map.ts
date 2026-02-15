/**
 * Content-map: Maps wiki file paths to route paths.
 * Handles special cases like README.md → section index.
 */

export interface ContentRoute {
    wikiPath: string;
    routePath: string;
    section: string;
    subSection?: string;
}

/**
 * Map a wiki file path to its corresponding route path.
 *
 * Examples:
 * - wiki/README.md → /
 * - wiki/getting-started/README.md → /getting-started
 * - wiki/getting-started/how-we-work.md → /getting-started/how-we-work
 * - wiki/roles/README.md → /roles
 * - wiki/roles/ba/README.md → /roles/ba
 * - wiki/roles/ba/templates.md → /roles/ba/templates
 * - wiki/tools/git/setup.md → /tools/git/setup
 */
export function wikiPathToRoute(wikiPath: string): string {
    // Remove wiki/ prefix and .md extension
    const clean = wikiPath
        .replace(/^wiki\//, "")
        .replace(/^content\//, "")
        .replace(/\.md$/, "");

    // Root README
    if (clean === "README") return "/";

    // Replace README with empty string (section index)
    const route = clean.replace(/\/README$/, "");

    return `/${route}`;
}

/**
 * Map a route path back to its wiki file path.
 *
 * Examples:
 * - / → wiki/README.md
 * - /getting-started → wiki/getting-started/README.md
 * - /getting-started/how-we-work → wiki/getting-started/how-we-work.md
 * - /roles/ba → wiki/roles/ba/README.md
 * - /tools/git/setup → wiki/tools/git/setup.md
 */
export function routeToWikiPath(routePath: string): string {
    if (routePath === "/") return "wiki/README.md";

    const clean = routePath.replace(/^\//, "");
    const parts = clean.split("/");

    // Sections with nested folders (roles/*, tools/*)
    const nestedSections = ["roles", "tools"];

    if (nestedSections.includes(parts[0]) && parts.length === 2) {
        // Could be either a section index (roles/ba → roles/ba/README.md)
        // or a flat page (roles/README → roles/README.md)
        // For roles/ba, roles/po, etc. → nested README
        return `wiki/${clean}/README.md`;
    }

    // Default: direct file
    return `wiki/${clean}.md`;
}

/**
 * Section display names (Vietnamese-first per CONTEXT.md)
 */
export const sectionLabels: Record<string, string> = {
    home: "Home",
    "getting-started": "Bắt đầu",
    roles: "Roles",
    workflows: "Sprint",
    tools: "Công cụ",
    reference: "Chuẩn mực",
    integrations: "Tích hợp",
};

/**
 * Get display label for a section
 */
export function getSectionLabel(section: string): string {
    return sectionLabels[section] || section;
}
