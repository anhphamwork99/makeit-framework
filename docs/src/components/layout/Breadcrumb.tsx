import { Link, useLocation } from "@tanstack/react-router";
import { Home, ChevronRight } from "lucide-react";
import { sectionLabels } from "@/data/content-map";
import { cn } from "@/lib/utils";

/**
 * Map a path segment to a display label.
 * Uses section labels for top-level segments, then titleCase for subsegments.
 */
function segmentToLabel(segment: string, depth: number): string {
    if (depth === 0) {
        return sectionLabels[segment] || titleCase(segment);
    }
    return titleCase(segment);
}

function titleCase(str: string): string {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function Breadcrumb() {
    const location = useLocation();
    const pathname = location.pathname;

    // Home page — no breadcrumb needed
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);
    const crumbs = segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");
        const label = segmentToLabel(segment, index);
        const isLast = index === segments.length - 1;
        return { path, label, isLast };
    });

    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
            <Link
                to="/"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
                <Home className="h-3.5 w-3.5" />
                <span className="sr-only">Home</span>
            </Link>
            {crumbs.map(({ path, label, isLast }) => (
                <span key={path} className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                    {isLast ? (
                        <span className={cn("text-foreground font-medium truncate max-w-[200px]")}>
                            {label}
                        </span>
                    ) : (
                        <Link
                            to={path}
                            className="text-muted-foreground hover:text-foreground transition-colors truncate max-w-[200px]"
                        >
                            {label}
                        </Link>
                    )}
                </span>
            ))}
        </nav>
    );
}
