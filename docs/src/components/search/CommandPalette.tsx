import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { searchPages, getSuggestedPages, type SearchResult } from "@/lib/search";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
} from "@/components/ui/command";
import {
    FileText,
    Search,
    Users,
    RefreshCw,
    Wrench,
    BookMarked,
    Rocket,
    Command,
} from "lucide-react";

const sectionIcons: Record<string, React.ReactNode> = {
    "getting-started": <Rocket className="h-4 w-4" />,
    roles: <Users className="h-4 w-4" />,
    workflows: <RefreshCw className="h-4 w-4" />,
    tools: <Wrench className="h-4 w-4" />,
    reference: <BookMarked className="h-4 w-4" />,
};

function getSectionIcon(section: string) {
    return sectionIcons[section] || <FileText className="h-4 w-4" />;
}

/** Dispatch this event from anywhere to open the command palette */
export function openCommandPalette() {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
}

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const navigate = useNavigate();

    // ⌘K / Ctrl+K keyboard shortcut + custom event listener
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        }

        function handleOpenEvent() {
            setOpen(true);
        }

        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-command-palette", handleOpenEvent);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-command-palette", handleOpenEvent);
        };
    }, []);

    // Search as user types (debounced)
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            setResults(searchPages(query));
        }, 100);

        return () => clearTimeout(timer);
    }, [query]);

    // Reset search when closing
    useEffect(() => {
        if (!open) {
            // Small delay to avoid flash
            const timer = setTimeout(() => setQuery(""), 200);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleSelect = useCallback(
        (path: string) => {
            setOpen(false);
            navigate({ to: path });
        },
        [navigate]
    );

    // Group results by section
    const groupedResults = results.reduce<Record<string, SearchResult[]>>((acc, result) => {
        const key = result.sectionLabel;
        if (!acc[key]) acc[key] = [];
        acc[key].push(result);
        return acc;
    }, {});

    const suggestedPages = getSuggestedPages();

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Tìm kiếm trang wiki…"
                value={query}
                onValueChange={setQuery}
            />

            <CommandList className="max-h-[400px]">
                {query.trim() ? (
                    <>
                        <CommandEmpty>
                            <div className="flex flex-col items-center gap-2 py-4">
                                <Search className="h-8 w-8 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">
                                    Không tìm thấy kết quả cho "{query}"
                                </p>
                                <p className="text-xs text-muted-foreground/70">
                                    Thử từ khóa khác hoặc tên section
                                </p>
                            </div>
                        </CommandEmpty>

                        {Object.entries(groupedResults).map(([sectionLabel, items]) => (
                            <CommandGroup key={sectionLabel} heading={sectionLabel}>
                                {items.map((result) => (
                                    <CommandItem
                                        key={result.path}
                                        value={`${result.title} ${result.section} ${result.snippet}`}
                                        onSelect={() => handleSelect(result.path)}
                                        className="flex items-start gap-3 py-3"
                                    >
                                        <span className="mt-0.5 text-muted-foreground">
                                            {getSectionIcon(result.section)}
                                        </span>
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium truncate">
                                                    {result.title}
                                                </span>
                                                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                                                    {result.sectionLabel}
                                                </span>
                                            </div>
                                            {result.snippet && (
                                                <span className="text-xs text-muted-foreground line-clamp-1">
                                                    {result.snippet}
                                                </span>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </>
                ) : (
                    <>
                        <CommandGroup heading="Sections">
                            {suggestedPages.map((page) => (
                                <CommandItem
                                    key={page.path}
                                    value={page.title}
                                    onSelect={() => handleSelect(page.path)}
                                    className="flex items-center gap-3"
                                >
                                    <span className="text-muted-foreground">
                                        {getSectionIcon(page.section)}
                                    </span>
                                    <span className="text-sm">{page.title}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Mẹo">
                            <div className="px-2 py-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Command className="h-3 w-3" />
                                    <span>Gõ để tìm kiếm tất cả {suggestedPages.length > 0 ? "55+" : ""} trang wiki</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[10px] font-mono">↑↓</span>
                                    <span>Di chuyển</span>
                                    <span className="text-[10px] font-mono ml-2">↵</span>
                                    <span>Mở trang</span>
                                    <span className="text-[10px] font-mono ml-2">ESC</span>
                                    <span>Đóng</span>
                                </div>
                            </div>
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </CommandDialog>
    );
}
