import { useState, useEffect, useCallback } from "react";
import { useTocContext } from "@/lib/toc-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function TableOfContents() {
    const { headings } = useTocContext();
    const [activeId, setActiveId] = useState<string>("");

    // Scroll spy using IntersectionObserver
    useEffect(() => {
        if (headings.length < 2) return;

        const headingElements = headings
            .map((h) => document.getElementById(h.id))
            .filter(Boolean) as HTMLElement[];

        if (headingElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the first visible heading
                const visibleEntries = entries.filter((e) => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: "-80px 0px -60% 0px",
                threshold: 0,
            }
        );

        headingElements.forEach((el) => observer.observe(el));

        return () => {
            headingElements.forEach((el) => observer.unobserve(el));
        };
    }, [headings]);

    const handleClick = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveId(id);
        }
    }, []);

    // Don't show ToC if fewer than 2 headings
    if (headings.length < 2) {
        return null;
    }

    return (
        <ScrollArea className="h-full">
            <div className="p-4 sticky top-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    On this page
                </p>
                <nav aria-label="Table of contents" className="space-y-1">
                    {headings.map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => handleClick(heading.id)}
                            className={cn(
                                "block w-full text-left text-xs py-1 transition-colors truncate",
                                heading.level === 3 ? "pl-3" : "pl-0",
                                activeId === heading.id
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {heading.text}
                        </button>
                    ))}
                </nav>
            </div>
        </ScrollArea>
    );
}
