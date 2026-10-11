"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  const onStorage = (event: StorageEvent) => {
    if (event.key === "portfolio-theme" || event.key === null) {
      document.documentElement.classList.toggle("dark", event.newValue === "dark");
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => { observer.disconnect(); window.removeEventListener("storage", onStorage); };
}
function getTheme() {
  return document.documentElement.classList.contains("dark");
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getTheme, () => false);
  return <button
    type="button"
    className="grid h-[18px] w-[18px] place-items-center border-0 bg-transparent p-0 text-[var(--text-faint)] transition-all duration-300 hover:rotate-12 hover:text-[var(--text-primary)]"
    aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
    title={`Switch to ${dark ? "light" : "dark"} theme`}
    onClick={() => {
      document.documentElement.classList.toggle("dark", !dark);
      try { window.localStorage.setItem("portfolio-theme", dark ? "light" : "dark"); }
      catch { /* Theme remains active for this session if storage is blocked. */ }
    }}
  >{dark ? <SunIcon /> : <MoonIcon />}</button>;
}
