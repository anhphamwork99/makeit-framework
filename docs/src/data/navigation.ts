export interface NavItem {
    label: string;
    path: string;
    icon?: string;
    children?: NavItem[];
}

export interface SidebarSection {
    label: string;
    icon: string;
    path: string;
    children?: NavItem[];
}

/**
 * Sidebar navigation structure matching CONTEXT.md sidebar labels.
 * Vietnamese-first labels per PACE-reviewed UX decisions.
 */
export const sidebarSections: SidebarSection[] = [
    {
        label: "Home",
        icon: "BookOpen",
        path: "/",
    },
    {
        label: "Bắt đầu",
        icon: "Rocket",
        path: "/getting-started",
        children: [
            { label: "Cách team hoạt động", path: "/getting-started/how-we-work" },
            { label: "Checklist tuần đầu", path: "/getting-started/first-week-checklist" },
            { label: "First Win Guide", path: "/getting-started/first-win-guide" },
        ],
    },
    {
        label: "Roles",
        icon: "Users",
        path: "/roles",
        children: [
            { label: "Product Owner", path: "/roles/po" },
            { label: "Business Analyst", path: "/roles/ba" },
            { label: "Techlead", path: "/roles/techlead" },
            { label: "Dev Frontend", path: "/roles/dev-fe" },
            { label: "Dev Backend", path: "/roles/dev-be" },
        ],
    },
    {
        label: "Sprint",
        icon: "RefreshCw",
        path: "/workflows",
        children: [
            { label: "Team Workflow", path: "/workflows/team-workflow" },
            { label: "Sprint Refinement", path: "/workflows/sprint-refinement" },
            { label: "Sprint Planning", path: "/workflows/sprint-planning" },
            { label: "Weekly Sync", path: "/workflows/weekly-sync" },
        ],
    },
    {
        label: "Công cụ",
        icon: "Wrench",
        path: "/tools",
        children: [
            {
                label: "Git",
                path: "/tools/git",
                children: [
                    { label: "Setup", path: "/tools/git/setup" },
                    { label: "Branching", path: "/tools/git/branching" },
                    { label: "PR Review", path: "/tools/git/pr-review" },
                    { label: "Automation", path: "/tools/git/automation" },
                    { label: "Troubleshooting", path: "/tools/git/troubleshooting" },
                ],
            },
            {
                label: "Figma",
                path: "/tools/figma",
                children: [
                    { label: "Setup", path: "/tools/figma/setup" },
                    { label: "Conventions", path: "/tools/figma/conventions" },
                    { label: "Handoff", path: "/tools/figma/handoff" },
                    { label: "Automation", path: "/tools/figma/automation" },
                    { label: "Troubleshooting", path: "/tools/figma/troubleshooting" },
                ],
            },
            {
                label: "Lark",
                path: "/tools/lark",
                children: [
                    { label: "Setup", path: "/tools/lark/setup" },
                    { label: "Task Board", path: "/tools/lark/task-board" },
                    { label: "Conventions", path: "/tools/lark/conventions" },
                    { label: "Automation", path: "/tools/lark/automation" },
                    { label: "Troubleshooting", path: "/tools/lark/troubleshooting" },
                ],
            },
            {
                label: "Shopify",
                path: "/tools/shopify",
                children: [
                    { label: "Setup", path: "/tools/shopify/setup" },
                    { label: "Architecture", path: "/tools/shopify/architecture" },
                    { label: "Data Model", path: "/tools/shopify/data-model" },
                    { label: "Automation", path: "/tools/shopify/automation" },
                    { label: "Troubleshooting", path: "/tools/shopify/troubleshooting" },
                ],
            },
        ],
    },
    {
        label: "Chuẩn mực",
        icon: "BookMarked",
        path: "/reference",
        children: [
            { label: "Quality Gates", path: "/reference/quality-gates" },
            { label: "Coding Standards", path: "/reference/coding-standards" },
            { label: "Handoff Format", path: "/reference/handoff-format" },
            { label: "Shared Resources", path: "/reference/shared-resources" },
            { label: "API Contract", path: "/reference/api-contract-convention" },
            { label: "FE-BE Coordination", path: "/reference/fe-be-coordination" },
            { label: "Lifecycle Types", path: "/reference/lifecycle-types" },
            { label: "Plan & Task Limits", path: "/reference/plan-task-limits" },
        ],
    },
    {
        label: "Tích hợp",
        icon: "Puzzle",
        path: "/integrations",
        children: [
            { label: "Serena MCP", path: "/integrations/serena-mcp" },
        ],
    },
];
