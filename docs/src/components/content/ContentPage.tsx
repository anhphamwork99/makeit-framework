import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { FileQuestion } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { PrevNextNav } from "./PrevNextNav";
import { useTocContext } from "@/lib/toc-context";
import type { ContentPage as ContentPageType } from "@/lib/content";

interface ContentPageProps {
    page: ContentPageType;
}

export function ContentPage({ page }: ContentPageProps) {
    const { setHeadings } = useTocContext();
    const articleRef = useRef<HTMLElement>(null);

    // Extract headings from rendered DOM (matches rehype-slug IDs exactly)
    useEffect(() => {
        // Small delay to ensure DOM is rendered with rehype-slug IDs
        const timer = setTimeout(() => {
            if (!articleRef.current) return;
            const elements = articleRef.current.querySelectorAll("h2[id], h3[id]");
            const extracted = Array.from(elements).map((el) => ({
                id: el.id,
                text: el.textContent?.trim() || "",
                level: el.tagName === "H2" ? 2 : 3,
            }));
            setHeadings(extracted);
        }, 50);
        return () => {
            clearTimeout(timer);
            setHeadings([]);
        };
    }, [page.path, setHeadings]);

    return (
        <article ref={articleRef}>
            <MarkdownRenderer content={page.content} />
            <PrevNextNav currentPage={page} />
        </article>
    );
}

/**
 * 404 component for pages not found
 */
export function ContentNotFound({
    path,
    section,
}: {
    path: string;
    section?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileQuestion className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                The page <code className="text-primary bg-muted/50 px-1.5 py-0.5 rounded text-sm">{path}</code> could not be found.
            </p>
            <div className="flex gap-3">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Go Home
                </Link>
                {section && (
                    <Link
                        to={`/${section}` as any}
                        className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50 transition-colors"
                    >
                        Back to Section
                    </Link>
                )}
            </div>
        </div>
    );
}
