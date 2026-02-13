interface Ceremony {
    name: string;
    icon: string;
    frequency: string;
    duration: string;
    description: string;
    color: string;
    day: number; // 0-9 for 2-week sprint (Mon=0, Fri=4, Mon=5, Fri=9)
    recurring?: boolean; // true = repeats every day
}

const ceremonies: Ceremony[] = [
    {
        name: "Sprint Planning",
        icon: "📋",
        frequency: "Sprint start",
        duration: "~45 min",
        description: "Team define sprint goal, BA present stories, TL break tasks, assign work.",
        color: "#EB2F96",
        day: 0,
    },
    {
        name: "Daily Standup",
        icon: "💬",
        frequency: "Hàng ngày",
        duration: "~15 min",
        description: "Async trên Telegram hoặc sync nhanh. Mỗi người: Done / Doing / Blocked.",
        color: "#1890FF",
        day: -1, // special: recurring
        recurring: true,
    },
    {
        name: "Refinement",
        icon: "🔍",
        frequency: "Giữa sprint",
        duration: "~30 min",
        description: "BA clarify next stories, TL estimate, team align scope cho sprint tiếp.",
        color: "#722ED1",
        day: 5,
    },
    {
        name: "Sprint Review",
        icon: "🎯",
        frequency: "Sprint end",
        duration: "~30 min",
        description: "Demo deliverables, PO review, stakeholder feedback, celebrate wins.",
        color: "#52C41A",
        day: 8,
    },
    {
        name: "Retrospective",
        icon: "🔄",
        frequency: "Sprint end",
        duration: "~30 min",
        description: "What went well? What to improve? Action items cho sprint sau.",
        color: "#FA8C16",
        day: 9,
    },
];

const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T2", "T3", "T4", "T5", "T6"];
const weekLabels = ["Tuần 1", "Tuần 2"];

export function SprintTimeline() {
    return (
        <div className="w-full">
            {/* Desktop: Horizontal timeline */}
            <div className="hidden md:block">
                <HorizontalTimeline />
            </div>

            {/* Mobile: Vertical timeline */}
            <div className="md:hidden">
                <VerticalTimeline />
            </div>
        </div>
    );
}

function HorizontalTimeline() {
    return (
        <div className="px-2 py-4">
            {/* Week labels */}
            <div className="grid grid-cols-10 gap-1 mb-1 px-1">
                <div className="col-span-5 text-[10px] font-semibold text-muted-foreground">
                    {weekLabels[0]}
                </div>
                <div className="col-span-5 text-[10px] font-semibold text-muted-foreground">
                    {weekLabels[1]}
                </div>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-10 gap-1 mb-2">
                {dayLabels.map((label, i) => (
                    <div
                        key={i}
                        className="text-center text-[10px] font-medium text-muted-foreground/70"
                    >
                        {label}
                    </div>
                ))}
            </div>

            {/* Timeline track */}
            <div className="relative">
                {/* Base track line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

                {/* Day markers grid */}
                <div className="grid grid-cols-10 gap-1 relative">
                    {dayLabels.map((_, dayIndex) => {
                        const ceremoniesOnDay = ceremonies.filter(
                            (c) => c.day === dayIndex || (c.recurring && dayIndex !== 0 && dayIndex !== 9)
                        );

                        return (
                            <div key={dayIndex} className="flex flex-col items-center gap-1 py-2 min-h-[60px]">
                                {/* Day dot */}
                                <div className="w-2 h-2 rounded-full bg-border/50 shrink-0" />

                                {/* Ceremonies stacked */}
                                {ceremoniesOnDay.map((ceremony) => (
                                    <CeremonyBadge
                                        key={`${ceremony.name}-${dayIndex}`}
                                        ceremony={ceremony}
                                        compact
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
                {ceremonies.map((ceremony) => (
                    <div key={ceremony.name} className="flex items-center gap-1.5">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: ceremony.color }}
                        />
                        <span className="text-[10px] text-muted-foreground">
                            {ceremony.icon} {ceremony.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function VerticalTimeline() {
    const orderedCeremonies = ceremonies
        .filter((c) => !c.recurring)
        .sort((a, b) => a.day - b.day);

    // Insert daily standup at position 1
    const daily = ceremonies.find((c) => c.recurring);

    return (
        <div className="px-2 py-4">
            <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

                {/* Sprint Planning */}
                {orderedCeremonies.slice(0, 1).map((ceremony) => (
                    <TimelineItem key={ceremony.name} ceremony={ceremony} />
                ))}

                {/* Daily standup */}
                {daily && <TimelineItem ceremony={daily} />}

                {/* Rest of ceremonies */}
                {orderedCeremonies.slice(1).map((ceremony) => (
                    <TimelineItem key={ceremony.name} ceremony={ceremony} />
                ))}
            </div>
        </div>
    );
}

function TimelineItem({ ceremony }: { ceremony: Ceremony }) {
    return (
        <div className="relative mb-4 last:mb-0">
            {/* Dot on the line */}
            <div
                className="absolute -left-8 top-1 w-3 h-3 rounded-full border-2 border-background"
                style={{ backgroundColor: ceremony.color }}
            />

            <div
                className="rounded-lg border border-border/50 p-3 transition-colors hover:border-border"
                style={{
                    background: `linear-gradient(135deg, ${ceremony.color}08 0%, transparent 100%)`,
                }}
            >
                <div className="flex items-center gap-2 mb-1">
                    <span>{ceremony.icon}</span>
                    <h4 className="text-sm font-semibold">{ceremony.name}</h4>
                    <span
                        className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                            backgroundColor: `${ceremony.color}15`,
                            color: ceremony.color,
                        }}
                    >
                        {ceremony.frequency}
                    </span>
                </div>
                <p className="text-xs text-muted-foreground">{ceremony.description}</p>
                <span className="text-[10px] text-muted-foreground/60 mt-1 inline-block">
                    ⏱ {ceremony.duration}
                </span>
            </div>
        </div>
    );
}

function CeremonyBadge({
    ceremony,
    compact = false,
}: {
    ceremony: Ceremony;
    compact?: boolean;
}) {
    return (
        <div
            className={`
                group relative rounded-md border border-transparent cursor-default transition-all duration-200
                hover:scale-110 hover:z-10
                ${compact ? "p-1" : "p-1.5"}
            `}
            style={{
                backgroundColor: `${ceremony.color}15`,
            }}
            title={`${ceremony.name} (${ceremony.frequency}, ${ceremony.duration})`}
        >
            <span className={compact ? "text-xs" : "text-sm"}>{ceremony.icon}</span>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div
                    className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg whitespace-nowrap"
                    style={{ minWidth: "140px" }}
                >
                    <p className="text-xs font-semibold" style={{ color: ceremony.color }}>
                        {ceremony.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                        {ceremony.frequency} · {ceremony.duration}
                    </p>
                </div>
            </div>
        </div>
    );
}
