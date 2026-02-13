import { createContext, useContext, useState, useCallback } from "react";
import type { Heading } from "@/lib/content";

interface TocContextType {
    headings: Heading[];
    setHeadings: (headings: Heading[]) => void;
}

const TocContext = createContext<TocContextType>({
    headings: [],
    setHeadings: () => { },
});

export function TocProvider({ children }: { children: React.ReactNode }) {
    const [headings, setHeadingsState] = useState<Heading[]>([]);

    const setHeadings = useCallback((h: Heading[]) => {
        setHeadingsState(h);
    }, []);

    return (
        <TocContext.Provider value={{ headings, setHeadings }}>
            {children}
        </TocContext.Provider>
    );
}

export function useTocContext() {
    return useContext(TocContext);
}
