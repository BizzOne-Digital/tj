"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export function Tabs({
  tabs,
  defaultTab,
  className,
}: {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const current = tabs.find((t) => t.id === active);

  return (
    <div className={className}>
      <div
        className="mb-8 flex gap-1 overflow-x-auto border-b border-mountie-blue/10 pb-px"
        role="tablist"
        aria-label="Section tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "shrink-0 px-4 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors",
              active === tab.id
                ? "border-b-2 border-electric-blue text-electric-blue"
                : "text-mountie-blue/60 hover:text-deep-navy"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${current?.id}`}
        aria-labelledby={`tab-${current?.id}`}
      >
        {current?.content}
      </div>
    </div>
  );
}

export function SubTabs({
  tabs,
  defaultTab,
}: {
  tabs: TabItem[];
  defaultTab?: string;
}) {
  return (
    <Tabs
      tabs={tabs}
      defaultTab={defaultTab}
      className="rounded-lg border border-mountie-blue/10 bg-white p-6"
    />
  );
}
