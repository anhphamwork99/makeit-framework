export interface TocItem {
    id: string;
    text: string;
    level: number;
}

/**
 * Extract H2/H3 headings from raw markdown content for Table of Contents.
 * Generates slug IDs matching rehype-slug output.
 */
export function extractToc(content: string): TocItem[] {
    const items: TocItem[] = [];
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

        items.push({
            id,
            text,
            level: match[1].length,
        });
    }

    return items;
}
