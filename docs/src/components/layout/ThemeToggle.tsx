import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
    collapsed?: boolean;
}

export function ThemeToggle({ collapsed }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();

    const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <button
            onClick={toggle}
            className={cn(
                "flex items-center gap-2 rounded-md transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                collapsed ? "p-2.5 justify-center" : "px-3 py-2 w-full text-sm"
            )}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {theme === "dark" ? (
                <>
                    <Sun className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Light mode</span>}
                </>
            ) : (
                <>
                    <Moon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Dark mode</span>}
                </>
            )}
        </button>
    );
}
