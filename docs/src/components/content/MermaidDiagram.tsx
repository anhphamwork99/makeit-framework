import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

let idCounter = 0;

interface MermaidDiagramProps {
    chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        let cancelled = false;
        const id = `mermaid-${idCounter++}`;

        async function renderDiagram() {
            setLoading(true);
            setError(null);
            try {
                // Dynamic import to avoid SSR issues and keep bundle smaller
                const mermaid = (await import("mermaid")).default;
                mermaid.initialize({
                    startOnLoad: false,
                    theme: theme === "dark" ? "dark" : "default",
                    securityLevel: "loose",
                    fontFamily: "Inter, sans-serif",
                });

                const { svg: renderedSvg } = await mermaid.render(id, chart);
                if (!cancelled) {
                    setSvg(renderedSvg);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : "Failed to render diagram");
                    setLoading(false);
                }
            }
        }

        renderDiagram();

        return () => {
            cancelled = true;
            // Clean up the generated SVG element mermaid may have left in the DOM
            const el = document.getElementById(id);
            if (el) el.remove();
        };
    }, [chart, theme]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
                <div className="animate-pulse">Loading diagram...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 my-4">
                <p className="text-xs text-destructive mb-2 font-medium">Diagram render error</p>
                <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                    {chart}
                </pre>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="my-4 flex justify-center overflow-x-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
