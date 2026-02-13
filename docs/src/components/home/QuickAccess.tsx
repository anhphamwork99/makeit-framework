import {
    RefreshCw,
    Wrench,
    BookMarked,
    CalendarClock,
    ListChecks,
    ArrowRightLeft,
    GitBranch,
    Figma,
    MessageCircle,
    ShoppingBag,
    Shield,
    Code2,
    FileText,
} from "lucide-react";
import { SectionCard } from "./SectionCard";

/**
 * Quick access data — all links verified against actual wiki content.
 * 3 groups per UX proposal: Sprint, Tools, Standards
 */
const quickAccessGroups = [
    {
        title: "Sprint",
        icon: RefreshCw,
        accentColor: "#3498DB",
        items: [
            {
                icon: ArrowRightLeft,
                title: "Team Workflow",
                href: "/workflows/team-workflow",
            },
            {
                icon: CalendarClock,
                title: "Sprint Refinement",
                href: "/workflows/sprint-refinement",
            },
            {
                icon: ListChecks,
                title: "Sprint Planning",
                href: "/workflows/sprint-planning",
            },
        ],
    },
    {
        title: "Công cụ",
        icon: Wrench,
        accentColor: "#E67E22",
        items: [
            {
                icon: GitBranch,
                title: "Git",
                href: "/tools/git",
            },
            {
                icon: Figma,
                title: "Figma",
                href: "/tools/figma",
            },
            {
                icon: MessageCircle,
                title: "Lark",
                href: "/tools/lark",
            },
            {
                icon: ShoppingBag,
                title: "Shopify",
                href: "/tools/shopify",
            },
        ],
    },
    {
        title: "Chuẩn mực",
        icon: BookMarked,
        accentColor: "#2ECC71",
        items: [
            {
                icon: Shield,
                title: "Quality Gates",
                href: "/reference/quality-gates",
            },
            {
                icon: Code2,
                title: "Coding Standards",
                href: "/reference/coding-standards",
            },
            {
                icon: FileText,
                title: "Handoff Format",
                href: "/reference/handoff-format",
            },
        ],
    },
];

export function QuickAccess() {
    return (
        <div className="space-y-6">
            {/* Section header */}
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
                <h2 className="text-lg font-semibold text-foreground tracking-tight">
                    Tra cứu nhanh
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-border/80 to-transparent" />
            </div>

            {/* Groups - 3 columns on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {quickAccessGroups.map((group) => (
                    <div key={group.title} className="space-y-3">
                        {/* Group header */}
                        <div className="flex items-center gap-2 px-1">
                            <group.icon
                                className="h-4 w-4"
                                style={{ color: group.accentColor }}
                            />
                            <span className="text-sm font-medium text-muted-foreground">
                                {group.title}
                            </span>
                        </div>

                        {/* Group items */}
                        <div className="space-y-2">
                            {group.items.map((item) => (
                                <SectionCard
                                    key={item.href}
                                    icon={item.icon}
                                    title={item.title}
                                    href={item.href}
                                    accentColor={group.accentColor}
                                    variant="compact"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
