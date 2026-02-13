import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { TocProvider } from "@/lib/toc-context";
import { CommandPalette } from "@/components/search/CommandPalette";

export const Route = createRootRoute({
    component: RootLayout,
});

/**
 * Dynamic page title: updates document.title based on current route path.
 * Home → "MakeIt Team Wiki"
 * Content page → "{Page Title} — MakeIt Wiki"
 */
function useDocumentTitle() {
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (pathname === "/") {
            document.title = "MakeIt Team Wiki";
            return;
        }

        // Build title from path segments
        const segments = pathname.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        const title = lastSegment
            .split("-")
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

        document.title = `${title} — MakeIt Wiki`;
    }, [pathname]);
}

function RootLayout() {
    useDocumentTitle();
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <TocProvider>
            <div className="flex h-screen bg-background text-foreground overflow-hidden">
                {/* ⌘K Search Palette — modal overlay */}
                <CommandPalette />
                {/* Desktop Sidebar — hidden on mobile */}
                <Sidebar />

                {/* Mobile Nav — hamburger overlay */}
                <MobileNav />

                {/* Main content area with breadcrumb */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Breadcrumb bar */}
                    <div className="border-b border-border px-4 py-2 shrink-0 sm:px-6 lg:px-8">
                        <Breadcrumb />
                    </div>

                    {/* Content + ToC row */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Main content */}
                        <main id="main-content" role="main" className="flex-1 overflow-y-auto scrollbar-thin">
                            <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                                <Outlet />
                            </div>
                        </main>

                        {/* Right-side Table of Contents — desktop only, hidden on home */}
                        {!isHome && (
                            <aside className="hidden xl:flex flex-col w-[var(--toc-width)] border-l border-border shrink-0">
                                <TableOfContents />
                            </aside>
                        )}
                    </div>
                </div>
            </div>
        </TocProvider>
    );
}
