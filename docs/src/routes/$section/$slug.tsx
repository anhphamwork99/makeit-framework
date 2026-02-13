import { createFileRoute } from "@tanstack/react-router";
import { getPageByPath } from "@/lib/content";
import { ContentPage, ContentNotFound } from "@/components/content/ContentPage";

export const Route = createFileRoute("/$section/$slug")({
    component: SlugPage,
});

function SlugPage() {
    const { section, slug } = Route.useParams();
    const path = `/${section}/${slug}`;
    const page = getPageByPath(path);

    if (!page) {
        return <ContentNotFound path={path} section={section} />;
    }

    return <ContentPage page={page} />;
}
