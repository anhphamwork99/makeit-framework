import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
    BookOpen,
    Rocket,
    Users,
    RefreshCw,
    Wrench,
    BookMarked,
    ChevronRight,
    ChevronDown,
    PanelLeftClose,
    PanelLeft,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarSections, type NavItem, type SidebarSection } from "@/data/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

/** Map icon string names to lucide-react components */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    BookOpen,
    Rocket,
    Users,
    RefreshCw,
    Wrench,
    BookMarked,
};

const STORAGE_KEY_COLLAPSED = "sidebar-collapsed";
const STORAGE_KEY_SECTIONS = "sidebar-state";

function getStoredCollapsed(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY_COLLAPSED) === "true";
    } catch {
        return false;
    }
}

function getStoredSections(): Record<string, boolean> {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_SECTIONS);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

interface NavTreeItemProps {
    item: NavItem;
    depth: number;
    currentPath: string;
    expandedSections: Record<string, boolean>;
    onToggleSection: (path: string) => void;
}

function NavTreeItem({
    item,
    depth,
    currentPath,
    expandedSections,
    onToggleSection,
}: NavTreeItemProps) {
    const isActive = currentPath === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.path] ?? false;

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => onToggleSection(item.path)}
                    className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                        depth > 0 && "pl-6"
                    )}
                >
                    {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                </button>
                {isExpanded && (
                    <div className="mt-0.5">
                        {item.children!.map((child) => (
                            <NavTreeItem
                                key={child.path}
                                item={child}
                                depth={depth + 1}
                                currentPath={currentPath}
                                expandedSections={expandedSections}
                                onToggleSection={onToggleSection}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            to={item.path}
            className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                "hover:bg-muted/50",
                depth === 0 && "pl-2",
                depth === 1 && "pl-8",
                depth >= 2 && "pl-12",
                isActive
                    ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
            )}
        >
            <span className="truncate">{item.label}</span>
        </Link>
    );
}

interface SidebarSectionItemProps {
    section: SidebarSection;
    collapsed: boolean;
    currentPath: string;
    expandedSections: Record<string, boolean>;
    onToggleSection: (path: string) => void;
}

function SidebarSectionItem({
    section,
    collapsed,
    currentPath,
    expandedSections,
    onToggleSection,
}: SidebarSectionItemProps) {
    const Icon = iconMap[section.icon] || BookOpen;
    const isExpanded = expandedSections[section.path] ?? false;
    const hasChildren = section.children && section.children.length > 0;
    const isActive = currentPath === section.path;
    const isActiveSection = currentPath.startsWith(section.path) && section.path !== "/";

    if (collapsed) {
        return (
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            to={section.path}
                            className={cn(
                                "flex items-center justify-center rounded-md p-2.5 transition-colors",
                                "hover:bg-muted/50",
                                isActive || isActiveSection
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        {section.label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    // No children — just a link
    if (!hasChildren) {
        return (
            <Link
                to={section.path}
                className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-muted/50",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{section.label}</span>
            </Link>
        );
    }

    return (
        <div>
            <button
                onClick={() => onToggleSection(section.path)}
                className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-muted/50",
                    isActiveSection
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate text-left">{section.label}</span>
                {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                ) : (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
            </button>
            {isExpanded && (
                <div className="ml-3 mt-0.5 space-y-0.5 border-l border-border/50 pl-1">
                    {section.children!.map((child) => (
                        <NavTreeItem
                            key={child.path}
                            item={child}
                            depth={1}
                            currentPath={currentPath}
                            expandedSections={expandedSections}
                            onToggleSection={onToggleSection}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [collapsed, setCollapsed] = useState(getStoredCollapsed);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
        getStoredSections
    );

    // Persist collapsed state
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY_COLLAPSED, String(collapsed));
        } catch {
            // noop
        }
    }, [collapsed]);

    // Persist section expanded state
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(expandedSections));
        } catch {
            // noop
        }
    }, [expandedSections]);

    // Auto-expand the active section on navigation
    useEffect(() => {
        const activeSection = sidebarSections.find(
            (s) => s.path !== "/" && currentPath.startsWith(s.path)
        );
        if (activeSection && !expandedSections[activeSection.path]) {
            setExpandedSections((prev) => ({ ...prev, [activeSection.path]: true }));
        }
    }, [currentPath]);

    const toggleSection = useCallback((path: string) => {
        setExpandedSections((prev) => ({ ...prev, [path]: !prev[path] }));
    }, []);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col border-r border-border bg-card/50 shrink-0 transition-all duration-200 ease-in-out",
                collapsed ? "w-[60px]" : "w-[var(--sidebar-width)]"
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "flex items-center border-b border-border shrink-0",
                    collapsed ? "justify-center p-3" : "justify-between px-4 py-4"
                )}
            >
                {!collapsed && (
                    <Link to="/" className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold tracking-tight">
                            <span className="text-primary">MakeIt</span>{" "}
                            <span className="text-muted-foreground">Wiki</span>
                        </h1>
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? (
                        <PanelLeft className="h-4 w-4" />
                    ) : (
                        <PanelLeftClose className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1">
                <nav aria-label="Main navigation" className={cn("space-y-1", collapsed ? "p-1.5" : "p-3")}>
                    {sidebarSections.map((section) => (
                        <SidebarSectionItem
                            key={section.path}
                            section={section}
                            collapsed={collapsed}
                            currentPath={currentPath}
                            expandedSections={expandedSections}
                            onToggleSection={toggleSection}
                        />
                    ))}
                </nav>
            </ScrollArea>

            {/* Footer */}
            <div
                className={cn(
                    "border-t border-border shrink-0",
                    collapsed ? "p-2 flex justify-center" : "p-3"
                )}
            >
                <ThemeToggle collapsed={collapsed} />
            </div>
        </aside>
    );
}
