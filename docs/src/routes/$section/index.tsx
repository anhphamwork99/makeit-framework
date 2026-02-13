import { createFileRoute, Link } from "@tanstack/react-router";
import { getPagesBySection, getPageByPath, type ContentPage } from "@/lib/content";
import { ContentPage as ContentPageComponent, ContentNotFound } from "@/components/content/ContentPage";
import { sectionLabels } from "@/data/content-map";
import { BookOpen } from "lucide-react";
import { TeamWorkflow } from "@/components/visualizations/TeamWorkflow";
import { SprintTimeline } from "@/components/visualizations/SprintTimeline";

export const Route = createFileRoute("/$section/")({
    component: SectionIndex,
});

function SectionIndex() {
    const { section } = Route.useParams();
    const sectionLabel = sectionLabels[section] || section;

    // Special case: workflows section gets interactive visualizations
    if (section === "workflows") {
        return <WorkflowsSectionIndex />;
    }

    // Check if there's a README/index page for this section
    const indexPage = getPageByPath(`/${section}`);

    // If the section has a README, render it as the section landing
    if (indexPage) {
        return <ContentPageComponent page={indexPage} />;
    }

    // Otherwise, show a card grid of all pages in this section
    const pages = getPagesBySection(section).filter((p) => p.slug !== "README");

    if (pages.length === 0) {
        return <ContentNotFound path={`/${section}`} />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{sectionLabel}</h1>
            <div className="grid gap-4 sm:grid-cols-2">
                {pages.map((page) => (
                    <PageCard key={page.path} page={page} />
                ))}
            </div>
        </div>
    );
}

/**
 * Workflows section: TeamWorkflow + SprintTimeline + page list
 */
function WorkflowsSectionIndex() {
    const pages = getPagesBySection("workflows").filter((p) => p.slug !== "README");

    return (
        <div className="space-y-10">
            {/* Section header */}
            <div>
                <h1 className="text-3xl font-bold">Sprint Process</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Quy trình làm việc của team qua 5 giai đoạn — từ goal đến shipped. Mỗi role
                    có trách nhiệm rõ ràng, handoff rõ ràng, quality gate rõ ràng.
                </p>
            </div>

            {/* Team Workflow Swimlane */}
            <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    Team Pipeline
                </h2>
                <div className="rounded-xl border border-border bg-card/50 p-4">
                    <TeamWorkflow />
                </div>
            </div>

            {/* Sprint Timeline */}
            <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    Sprint Ceremonies
                </h2>
                <div className="rounded-xl border border-border bg-card/50 p-4">
                    <SprintTimeline />
                </div>
            </div>

            {/* Workflow pages list */}
            {pages.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="text-primary">▸</span>
                        Tài liệu Sprint
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {pages.map((page) => (
                            <PageCard key={page.path} page={page} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function PageCard({ page }: { page: ContentPage }) {
    // Extract first paragraph for summary
    const summary = extractSummary(page.content);

    return (
        <Link
            to={page.path}
            className="group rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/30 transition-all"
        >
            <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors truncate">
                        {page.title}
                    </h3>
                    {summary && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {summary}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

function extractSummary(content: string): string {
    // Skip the first heading and get the first paragraph
    const lines = content.split("\n");
    let foundHeading = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (trimmed.startsWith("#")) {
            foundHeading = true;
            continue;
        }
        if (foundHeading && trimmed.length > 10) {
            // Clean up markdown formatting
            return trimmed
                .replace(/\*\*(.+?)\*\*/g, "$1")
                .replace(/\*(.+?)\*/g, "$1")
                .replace(/\[(.+?)\]\(.+?\)/g, "$1")
                .replace(/`(.+?)`/g, "$1")
                .slice(0, 150);
        }
    }

    return "";
}
