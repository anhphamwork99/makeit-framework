import { useEffect, useState } from "react";
import { getAllPages } from "@/lib/content";
import { Command } from "lucide-react";

export function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const pages = getAllPages();
    const pageCount = pages.length;

    useEffect(() => {
        // Trigger fade-in animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-primary/4" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(hsl(330, 90%, 56%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(330, 90%, 56%) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative px-8 py-16 text-center sm:px-12 sm:py-20">
                {/* Logo / Brand */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span>{pageCount} trang tài liệu</span>
                </div>

                {/* Main headline */}
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                        MakeIt
                    </span>{" "}
                    <span className="text-foreground">Team Wiki</span>
                </h1>

                {/* Value proposition */}
                <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground sm:text-xl">
                    Mọi thứ team cần, ở một nơi duy nhất.
                </p>

                {/* Category hints */}
                <p className="mt-2 text-sm text-muted-foreground/70">
                    Quy trình · Công cụ · Chuẩn mực
                </p>

                {/* Search shortcut hint — clickable to open ⌘K */}
                <button
                    type="button"
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent("open-command-palette"));
                    }}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground cursor-pointer"
                >
                    <Command className="h-3.5 w-3.5" />
                    <span>K</span>
                    <span className="mx-1 text-border">|</span>
                    <span>Tìm nhanh</span>
                </button>
            </div>
        </section>
    );
}
