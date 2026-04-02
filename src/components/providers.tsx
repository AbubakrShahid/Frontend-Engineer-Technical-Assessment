"use client";

import { useRef, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store, persistor } from "@/store";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = persistor.subscribe(() => {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        setIsHydrated(true);
        unsub();
      }
    });
    unsubRef.current = unsub;

    if (persistor.getState().bootstrapped) {
      setIsHydrated(true);
      unsub();
    }

    return () => {
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          {isHydrated ? children : null}
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  );
}
