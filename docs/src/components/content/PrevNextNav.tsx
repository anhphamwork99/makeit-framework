import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPagesBySection, getPagesBySubSection, type ContentPage } from "@/lib/content";
import { cn } from "@/lib/utils";

interface PrevNextNavProps {
    currentPage: ContentPage;
}

export function PrevNextNav({ currentPage }: PrevNextNavProps) {
    // Get pages in the same section/subsection for ordering
    let pages: ContentPage[];

    if (currentPage.subSection) {
        pages = getPagesBySubSection(currentPage.section, currentPage.subSection);
    } else {
        pages = getPagesBySection(currentPage.section).filter((p) => !p.subSection);
    }

    // Filter out README/index pages for prev/next (they're section landing pages)
    const contentPages = pages.filter((p) => p.slug !== "README");

    const currentIndex = contentPages.findIndex((p) => p.path === currentPage.path);

    // If current page is not in the filtered list (it's a README), don't show prev/next
    if (currentIndex === -1) return null;

    const prevPage = currentIndex > 0 ? contentPages[currentIndex - 1] : null;
    const nextPage =
        currentIndex < contentPages.length - 1 ? contentPages[currentIndex + 1] : null;

    if (!prevPage && !nextPage) return null;

    return (
        <nav className="flex items-stretch gap-4 mt-12 pt-6 border-t border-border">
            {prevPage ? (
                <Link
                    to={prevPage.path}
                    className={cn(
                        "flex-1 group flex items-center gap-3 rounded-lg border border-border p-4",
                        "hover:border-primary/50 hover:bg-muted/30 transition-all"
                    )}
                >
                    <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    <div className="text-right flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Previous</p>
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {prevPage.title}
                        </p>
                    </div>
                </Link>
            ) : (
                <div className="flex-1" />
            )}

            {nextPage ? (
                <Link
                    to={nextPage.path}
                    className={cn(
                        "flex-1 group flex items-center gap-3 rounded-lg border border-border p-4",
                        "hover:border-primary/50 hover:bg-muted/30 transition-all"
                    )}
                >
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Next</p>
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {nextPage.title}
                        </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
            ) : (
                <div className="flex-1" />
            )}
        </nav>
    );
}
