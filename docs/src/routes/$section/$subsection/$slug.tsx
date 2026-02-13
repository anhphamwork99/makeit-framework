import { createFileRoute } from "@tanstack/react-router";
import { getPageByPath } from "@/lib/content";
import { ContentPage, ContentNotFound } from "@/components/content/ContentPage";

export const Route = createFileRoute("/$section/$subsection/$slug")({
    component: SubsectionSlugPage,
});

function SubsectionSlugPage() {
    const { section, subsection, slug } = Route.useParams();
    const path = `/${section}/${subsection}/${slug}`;
    const page = getPageByPath(path);

    if (!page) {
        return <ContentNotFound path={path} section={section} />;
    }

    return <ContentPage page={page} />;
}
