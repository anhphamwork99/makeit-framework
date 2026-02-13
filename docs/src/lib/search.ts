import MiniSearch from "minisearch";
import { getAllPages } from "./content";
import { sectionLabels } from "@/data/content-map";

export interface SearchResult {
    title: string;
    section: string;
    sectionLabel: string;
    path: string;
    slug: string;
    snippet: string;
    score: number;
}

// Build search index from all wiki pages
const pages = getAllPages();

const miniSearch = new MiniSearch({
    fields: ["title", "content", "section"],
    storeFields: ["title", "section", "path", "slug"],
    searchOptions: {
        boost: { title: 3, section: 1.5 },
        prefix: true,
        fuzzy: 0.2,
        combineWith: "AND",
    },
});

miniSearch.addAll(
    pages.map((p, i) => ({
        id: i,
        title: p.title,
        content: p.content,
        section: p.section,
        path: p.path,
        slug: p.slug,
    }))
);

/**
 * Extract a context snippet around the first match of query terms in content
 */
function extractSnippet(content: string, query: string): string {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const plainContent = content
        .replace(/^#+\s+.+$/gm, "") // Remove headings
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Markdown links
        .replace(/[*_`~]/g, "") // Formatting
        .replace(/\n{2,}/g, "\n") // Multiple newlines
        .trim();

    // Find first occurrence of any search term
    const lowerContent = plainContent.toLowerCase();
    let bestIndex = -1;

    for (const term of terms) {
        const idx = lowerContent.indexOf(term);
        if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
            bestIndex = idx;
        }
    }

    if (bestIndex === -1) {
        // No match in content, return first 120 chars
        return plainContent.slice(0, 120).trim() + (plainContent.length > 120 ? "…" : "");
    }

    // Extract ~120 chars around the match
    const start = Math.max(0, bestIndex - 40);
    const end = Math.min(plainContent.length, bestIndex + 80);
    let snippet = plainContent.slice(start, end).trim();

    if (start > 0) snippet = "…" + snippet;
    if (end < plainContent.length) snippet += "…";

    return snippet;
}

/**
 * Search all wiki pages. Returns results grouped-ready with section labels.
 */
export function searchPages(query: string): SearchResult[] {
    if (!query.trim()) return [];

    const raw = miniSearch.search(query).slice(0, 15);

    return raw.map((r) => ({
        title: r.title as string,
        section: r.section as string,
        sectionLabel: sectionLabels[r.section as string] || (r.section as string),
        path: r.path as string,
        slug: r.slug as string,
        snippet: extractSnippet(
            pages.find((p) => p.path === r.path)?.content || "",
            query
        ),
        score: r.score,
    }));
}

/**
 * Get a list of suggested pages when search is empty (section index pages)
 */
export function getSuggestedPages(): Pick<SearchResult, "title" | "section" | "sectionLabel" | "path">[] {
    return pages
        .filter((p) => p.slug === "README" && p.section !== "home" && !p.subSection)
        .map((p) => ({
            title: sectionLabels[p.section] || p.title,
            section: p.section,
            sectionLabel: sectionLabels[p.section] || p.section,
            path: p.path,
        }));
}
