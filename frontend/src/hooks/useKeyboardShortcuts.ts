import { useEffect } from "react";

interface Shortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          event.ctrlKey === (shortcut.ctrlKey || false) &&
          event.shiftKey === (shortcut.shiftKey || false) &&
          event.altKey === (shortcut.altKey || false)
        ) {
          event.preventDefault();
          shortcut.callback();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}
