import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    href: string;
    accentColor?: string;
    variant?: "default" | "compact";
}

export function SectionCard({
    icon: Icon,
    title,
    description,
    href,
    accentColor = "hsl(330, 90%, 56%)",
    variant = "default",
}: SectionCardProps) {
    const isCompact = variant === "compact";

    return (
        <a
            href={href}
            className={cn(
                "group relative block rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20",
                "hover:border-transparent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isCompact ? "p-3" : "p-5"
            )}
            style={
                {
                    "--card-accent": accentColor,
                } as React.CSSProperties
            }
        >
            {/* Accent border glow on hover */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)`,
                    boxShadow: `inset 0 0 0 1px ${accentColor}40`,
                    borderRadius: "inherit",
                }}
            />

            <div
                className={cn(
                    "relative z-10",
                    isCompact ? "flex items-center gap-3" : "space-y-3"
                )}
            >
                {/* Icon */}
                <div
                    className={cn(
                        "flex items-center justify-center rounded-lg transition-all duration-300",
                        "group-hover:scale-110",
                        isCompact ? "h-8 w-8 shrink-0" : "h-10 w-10"
                    )}
                    style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                    }}
                >
                    <Icon className={isCompact ? "h-4 w-4" : "h-5 w-5"} />
                </div>

                {/* Text */}
                <div className={isCompact ? "min-w-0" : ""}>
                    <h3
                        className={cn(
                            "font-medium text-foreground transition-colors duration-300",
                            isCompact ? "text-sm truncate" : "text-base"
                        )}
                    >
                        {title}
                    </h3>
                    {description && !isCompact && (
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Arrow indicator */}
            {!isCompact && (
                <div
                    className="absolute bottom-4 right-4 opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0"
                    style={{ color: accentColor }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M6 3L11 8L6 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}
        </a>
    );
}
