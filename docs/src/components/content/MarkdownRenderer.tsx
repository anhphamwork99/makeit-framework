import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { Link, useLocation } from "@tanstack/react-router";
import { MermaidDiagram } from "./MermaidDiagram";

interface MarkdownRendererProps {
    content: string;
}

/**
 * Resolve a relative markdown link against the current route path.
 * Examples (currentPath = "/roles/ba"):
 *   "./templates.md" → "/roles/ba/templates"
 *   "../README.md" → "/roles"
 *   "../../reference/quality-gates.md" → "/reference/quality-gates"
 *   "/tools/git/setup.md" → "/tools/git/setup"
 */
function resolveRelativeLink(href: string, currentPath: string): string {
    // Clean .md extension and README
    let cleaned = href
        .replace(/\.md$/, "")
        .replace(/\/README$/, "");

    // Absolute paths — just return cleaned
    if (cleaned.startsWith("/")) return cleaned;

    // Get the "directory" of the current path
    const segments = currentPath.replace(/\/$/, "").split("/").filter(Boolean);

    // For ./something — resolve relative to current path
    if (cleaned.startsWith("./")) {
        cleaned = cleaned.slice(2);
        return `/${[...segments, cleaned].join("/")}`;
    }

    // For ../something — go up one level per ../
    if (cleaned.startsWith("../")) {
        const parts = cleaned.split("/");
        let upCount = 0;
        while (parts[0] === "..") {
            parts.shift();
            upCount++;
        }
        const base = segments.slice(0, segments.length - upCount);
        const remaining = parts.join("/");
        if (!remaining) return `/${base.join("/")}` || "/";
        return `/${[...base, remaining].join("/")}`;
    }

    // Bare relative (no ./ or ../) — resolve relative to current path
    return `/${[...segments, cleaned].join("/")}`;
}

/**
 * Custom component overrides for react-markdown.
 * Handles code blocks (including mermaid), links, tables, and images.
 */
function createComponents(currentPath: string) {
    return {
        // Code blocks — detect mermaid language for diagram rendering
        code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match?.[1];
            const codeContent = String(children).replace(/\n$/, "");

            // Mermaid diagrams
            if (lang === "mermaid") {
                return <MermaidDiagram chart={codeContent} />;
            }

            // Block code (has language class — inside <pre>)
            if (lang) {
                return (
                    <code className={className} {...props}>
                        {children}
                    </code>
                );
            }

            // Inline code
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },

        // Links — internal links use TanStack Router, external get target="_blank"
        a({ href, children, ...props }: any) {
            if (!href) {
                return <span {...props}>{children}</span>;
            }

            // Anchor links — keep as regular anchor
            if (href.startsWith("#")) {
                return (
                    <a href={href} {...props}>
                        {children}
                    </a>
                );
            }

            // External links
            if (href.startsWith("http") || href.startsWith("mailto:")) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                        {...props}
                    >
                        {children}
                        <span className="inline-block ml-0.5 text-[0.7em] opacity-50">↗</span>
                    </a>
                );
            }

            // Internal link — resolve relative path
            const routePath = resolveRelativeLink(href, currentPath);

            return (
                <Link to={routePath} className="text-primary hover:text-primary/80" {...props}>
                    {children}
                </Link>
            );
        },

        // Tables — wrap with overflow container
        table({ children }: any) {
            return (
                <div className="overflow-x-auto my-4 rounded-lg border border-border">
                    <table className="min-w-full">{children}</table>
                </div>
            );
        },

        // Images — lazy loading and rounded
        img({ src, alt, ...props }: any) {
            return (
                <img
                    src={src}
                    alt={alt || ""}
                    loading="lazy"
                    className="rounded-lg max-w-full h-auto"
                    {...props}
                />
            );
        },
    };
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const location = useLocation();
    const components = createComponents(location.pathname);

    return (
        <div className="prose-wiki">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkFrontmatter]}
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
