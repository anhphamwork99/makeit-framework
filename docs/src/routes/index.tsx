import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { RoleSelector } from "@/components/home/RoleSelector";
import { QuickAccess } from "@/components/home/QuickAccess";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    return (
        <div className="space-y-12 py-4">
            <HeroSection />
            <RoleSelector />

            {/* Decorative divider */}
            <div className="flex items-center gap-4 px-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            </div>

            <QuickAccess />

            {/* Footer spacer */}
            <div className="pb-8" />
        </div>
    );
}
