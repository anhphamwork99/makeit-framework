import { useState } from "react";

interface Stage {
    id: number;
    name: string;
    role: string;
    icon: string;
    deliverable: string;
    description: string;
    color: string;
    glowColor: string;
}

const stages: Stage[] = [
    {
        id: 1,
        name: "Design & Define",
        role: "PO + Designer",
        icon: "🎯",
        deliverable: "Backlog items + Figma screens",
        description: "PO định hình vision, Designer tạo UI. Output là backlog với goals rõ ràng và Figma designs.",
        color: "#EB2F96",
        glowColor: "rgba(235, 47, 150, 0.3)",
    },
    {
        id: 2,
        name: "Analyze",
        role: "Business Analyst",
        icon: "📋",
        deliverable: "User stories + Acceptance criteria",
        description: "BA phân tích design + goals, tạo user stories actionable với acceptance criteria cụ thể.",
        color: "#722ED1",
        glowColor: "rgba(114, 46, 209, 0.3)",
    },
    {
        id: 3,
        name: "Architect",
        role: "Techlead",
        icon: "💻",
        deliverable: "Technical tasks + Estimates",
        description: "TL break stories thành tasks, thiết kế solution, assign cho Dev FE/BE với estimates.",
        color: "#1890FF",
        glowColor: "rgba(24, 144, 255, 0.3)",
    },
    {
        id: 4,
        name: "Implement",
        role: "Dev FE / BE",
        icon: "⚙️",
        deliverable: "Working code + PR",
        description: "Dev implement code theo tasks, self-review, tạo PR. FE builds UI, BE builds APIs.",
        color: "#52C41A",
        glowColor: "rgba(82, 196, 26, 0.3)",
    },
    {
        id: 5,
        name: "Review",
        role: "Team + PO",
        icon: "✅",
        deliverable: "Approved & shipped",
        description: "Code review, design verification, PO approval. Gate check trước khi merge & deploy.",
        color: "#FA8C16",
        glowColor: "rgba(250, 140, 22, 0.3)",
    },
];

export function TeamWorkflow() {
    const [activeStage, setActiveStage] = useState<number | null>(null);

    return (
        <div className="w-full">
            {/* Desktop: Horizontal swimlane */}
            <div className="hidden md:block">
                <div className="relative flex items-stretch gap-3 px-2 py-4">
                    {stages.map((stage, index) => (
                        <div key={stage.id} className="flex items-center flex-1 min-w-0">
                            <StageCard
                                stage={stage}
                                isActive={activeStage === stage.id}
                                onHover={(active) => setActiveStage(active ? stage.id : null)}
                            />
                            {index < stages.length - 1 && <ConnectorArrow color={stage.color} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile: Vertical flow */}
            <div className="md:hidden flex flex-col gap-2 px-2">
                {stages.map((stage, index) => (
                    <div key={stage.id} className="flex flex-col items-center">
                        <StageCard
                            stage={stage}
                            isActive={activeStage === stage.id}
                            onHover={(active) => setActiveStage(active ? stage.id : null)}
                            vertical
                        />
                        {index < stages.length - 1 && <VerticalConnector color={stage.color} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

function StageCard({
    stage,
    isActive,
    onHover,
    vertical = false,
}: {
    stage: Stage;
    isActive: boolean;
    onHover: (active: boolean) => void;
    vertical?: boolean;
}) {
    return (
        <div
            className={`
                relative rounded-xl border transition-all duration-300 cursor-default
                ${vertical ? "w-full" : "flex-1 min-w-0"}
                ${isActive
                    ? "border-transparent scale-[1.02] z-10"
                    : "border-border/50 hover:border-border"
                }
            `}
            style={{
                background: isActive
                    ? `linear-gradient(135deg, ${stage.color}15 0%, ${stage.color}08 100%)`
                    : "hsl(var(--card))",
                boxShadow: isActive
                    ? `0 0 20px ${stage.glowColor}, 0 4px 16px rgba(0,0,0,0.2)`
                    : "0 1px 3px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            {/* Stage number badge */}
            <div
                className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: stage.color }}
            >
                Stage {stage.id}
            </div>

            <div className="p-3 pt-4">
                {/* Icon + Role */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{stage.icon}</span>
                    <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-foreground truncate">
                            {stage.name}
                        </h4>
                        <p className="text-[10px] text-muted-foreground truncate">{stage.role}</p>
                    </div>
                </div>

                {/* Deliverable */}
                <div
                    className="text-[10px] font-medium px-2 py-1 rounded-md truncate"
                    style={{
                        backgroundColor: `${stage.color}15`,
                        color: stage.color,
                    }}
                >
                    📦 {stage.deliverable}
                </div>

                {/* Description (on hover) */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                >
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {stage.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ConnectorArrow({ color }: { color: string }) {
    return (
        <div className="flex items-center shrink-0 mx-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse-subtle">
                <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.7"
                />
            </svg>
        </div>
    );
}

function VerticalConnector({ color }: { color: string }) {
    return (
        <div className="flex justify-center py-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 5V19M12 19L6 13M12 19L18 13"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.7"
                />
            </svg>
        </div>
    );
}
