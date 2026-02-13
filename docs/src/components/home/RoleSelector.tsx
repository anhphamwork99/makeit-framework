import {
    Target,
    ClipboardList,
    Cpu,
    Layout,
    Server,
    Rocket,
} from "lucide-react";
import { SectionCard } from "./SectionCard";

/**
 * Role data with distinct accent colors per CONTEXT.md decisions.
 * Each role gets a subtle accent tint for visual identity.
 */
const roles = [
    {
        name: "Product Owner",
        slug: "po",
        icon: Target,
        description: "Định hình vision, quản lý backlog, review & approve",
        accentColor: "#9B59B6", // Purple
    },
    {
        name: "Business Analyst",
        slug: "ba",
        icon: ClipboardList,
        description: "Phân tích yêu cầu, viết user stories, bridge PO ↔ Dev",
        accentColor: "#3498DB", // Blue
    },
    {
        name: "Techlead",
        slug: "techlead",
        icon: Cpu,
        description: "Thiết kế giải pháp, break tasks, review code quality",
        accentColor: "#2ECC71", // Green
    },
    {
        name: "Dev Frontend",
        slug: "dev-fe",
        icon: Layout,
        description: "Implement UI từ Figma, handle states, responsive layout",
        accentColor: "#E67E22", // Orange
    },
    {
        name: "Dev Backend",
        slug: "dev-be",
        icon: Server,
        description: "Build APIs, manage database, xử lý business logic",
        accentColor: "#E74C3C", // Red
    },
];

export function RoleSelector() {
    return (
        <div className="space-y-6">
            {/* Section header */}
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
                <h2 className="text-lg font-semibold text-foreground tracking-tight">
                    Chọn vai trò của bạn
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-border/80 to-transparent" />
            </div>

            {/* Role cards grid - 3-col desktop, 2-col tablet, 1-col mobile */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <SectionCard
                        key={role.slug}
                        icon={role.icon}
                        title={role.name}
                        description={role.description}
                        href={`/roles/${role.slug}`}
                        accentColor={role.accentColor}
                    />
                ))}
            </div>

            {/* Onboarding sub-link */}
            <div className="text-center">
                <a
                    href="/getting-started"
                    className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-primary/5"
                >
                    <Rocket className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                    <span>
                        Mới gia nhập?{" "}
                        <span className="text-primary/80 group-hover:text-primary">
                            → Bắt đầu từ đây
                        </span>
                    </span>
                </a>
            </div>
        </div>
    );
}
