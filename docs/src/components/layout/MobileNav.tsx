import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ChevronRight, ChevronDown } from "lucide-react";
import {
    BookOpen,
    Rocket,
    Users,
    RefreshCw,
    Wrench,
    BookMarked,
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarSections, type NavItem, type SidebarSection } from "@/data/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    BookOpen,
    Rocket,
    Users,
    RefreshCw,
    Wrench,
    BookMarked,
};

interface MobileNavItemProps {
    item: NavItem;
    depth: number;
    currentPath: string;
    onNavigate: () => void;
    expandedSections: Record<string, boolean>;
    onToggleSection: (path: string) => void;
}

function MobileNavItem({
    item,
    depth,
    currentPath,
    onNavigate,
    expandedSections,
    onToggleSection,
}: MobileNavItemProps) {
    const isActive = currentPath === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.path] ?? false;

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => onToggleSection(item.path)}
                    className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm transition-colors min-h-[44px]",
                        "hover:bg-muted/50 text-muted-foreground",
                        depth > 0 && "pl-8"
                    )}
                >
                    {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                    ) : (
                        <ChevronRight className="h-4 w-4 shrink-0" />
                    )}
                    <span>{item.label}</span>
                </button>
                {isExpanded && (
                    <div className="mt-0.5">
                        {item.children!.map((child) => (
                            <MobileNavItem
                                key={child.path}
                                item={child}
                                depth={depth + 1}
                                currentPath={currentPath}
                                onNavigate={onNavigate}
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
            onClick={onNavigate}
            className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition-colors min-h-[44px]",
                "hover:bg-muted/50",
                depth === 0 && "pl-3",
                depth === 1 && "pl-10",
                depth >= 2 && "pl-14",
                isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground"
            )}
        >
            <span>{item.label}</span>
        </Link>
    );
}

interface MobileSectionProps {
    section: SidebarSection;
    currentPath: string;
    onNavigate: () => void;
    expandedSections: Record<string, boolean>;
    onToggleSection: (path: string) => void;
}

function MobileSection({
    section,
    currentPath,
    onNavigate,
    expandedSections,
    onToggleSection,
}: MobileSectionProps) {
    const Icon = iconMap[section.icon] || BookOpen;
    const isExpanded = expandedSections[section.path] ?? false;
    const hasChildren = section.children && section.children.length > 0;
    const isActive = currentPath === section.path;
    const isActiveSection = currentPath.startsWith(section.path) && section.path !== "/";

    if (!hasChildren) {
        return (
            <Link
                to={section.path}
                onClick={onNavigate}
                className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors min-h-[44px]",
                    "hover:bg-muted/50",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                )}
            >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{section.label}</span>
            </Link>
        );
    }

    return (
        <div>
            <button
                onClick={() => onToggleSection(section.path)}
                className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors min-h-[44px]",
                    "hover:bg-muted/50",
                    isActiveSection
                        ? "text-primary"
                        : "text-muted-foreground"
                )}
            >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left">{section.label}</span>
                {isExpanded ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
            </button>
            {isExpanded && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border/50 pl-1">
                    {section.children!.map((child) => (
                        <MobileNavItem
                            key={child.path}
                            item={child}
                            depth={1}
                            currentPath={currentPath}
                            onNavigate={onNavigate}
                            expandedSections={expandedSections}
                            onToggleSection={onToggleSection}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Close sheet on navigation
    useEffect(() => {
        setOpen(false);
    }, [currentPath]);

    // Auto-expand active section
    useEffect(() => {
        const activeSection = sidebarSections.find(
            (s) => s.path !== "/" && currentPath.startsWith(s.path)
        );
        if (activeSection) {
            setExpandedSections((prev) => ({ ...prev, [activeSection.path]: true }));
        }
    }, [currentPath]);

    const toggleSection = (path: string) => {
        setExpandedSections((prev) => ({ ...prev, [path]: !prev[path] }));
    };

    const handleNavigate = () => setOpen(false);

    return (
        <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button
                        className="fixed top-3 left-3 z-50 rounded-md bg-card/80 backdrop-blur-sm border border-border p-2 shadow-sm hover:bg-muted/50 transition-colors"
                        aria-label="Open navigation"
                    >
                        <Menu className="h-5 w-5 text-foreground" />
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                    <SheetHeader className="px-4 py-4 border-b border-border">
                        <SheetTitle className="text-lg font-semibold tracking-tight text-left">
                            <span className="text-primary">MakeIt</span>{" "}
                            <span className="text-muted-foreground">Wiki</span>
                        </SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
                        <nav className="p-3 space-y-1">
                            {sidebarSections.map((section) => (
                                <MobileSection
                                    key={section.path}
                                    section={section}
                                    currentPath={currentPath}
                                    onNavigate={handleNavigate}
                                    expandedSections={expandedSections}
                                    onToggleSection={toggleSection}
                                />
                            ))}
                        </nav>
                    </ScrollArea>
                    <div className="border-t border-border p-3">
                        <ThemeToggle />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
