"use client";

import { useState } from "react";
import { LocalImageField } from "@/components/admin/LocalImageField";
import type { UploadFolder } from "@/lib/uploads-shared";
import { cn } from "@/lib/utils";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const IMAGE_KEY = /(image|photo|logo|poster|thumbnail|banner|picture|img|avatar|headshot)s?$/i;
const IMAGE_VALUE = /\.(png|jpe?g|webp|gif|avif)$/i;

function isImageField(name: string, value: unknown): boolean {
  if (typeof value !== "string" && value !== null) return false;
  if (typeof value === "string" && value.startsWith("/api/uploads/")) return true;
  if (typeof value === "string" && IMAGE_VALUE.test(value)) return true;
  return IMAGE_KEY.test(name) && (value === null || value === "" || !/\s{2,}/.test(value));
}

function humanize(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}

function blank(value: Json | undefined): Json {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blank(child)]));
  }
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return "";
}

function summarize(value: Json, index: number): string {
  if (typeof value === "string") return value.slice(0, 70) || `Item ${index + 1}`;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const key of ["title", "name", "label", "question", "date", "week", "id", "season"]) {
      const candidate = (value as Record<string, Json>)[key];
      if (typeof candidate === "string" || typeof candidate === "number") {
        const text = String(candidate);
        if (text) return text.slice(0, 70);
      }
    }
    for (const child of Object.values(value)) {
      if (typeof child === "string" && child) return child.slice(0, 70);
    }
  }
  return `Item ${index + 1}`;
}

const inputClass =
  "w-full rounded-md border border-mountie-blue/20 bg-white px-3 py-2 text-sm text-deep-navy focus:border-electric-blue focus:outline-none";

const smallButton =
  "rounded-sm border border-mountie-blue/30 px-2 py-1 text-xs font-semibold uppercase text-deep-navy hover:bg-light-bg disabled:opacity-40";

function PrimitiveField({
  name,
  value,
  onChange,
  imageFolder,
  label,
}: {
  name: string;
  value: string | number | boolean | null;
  onChange: (next: Json) => void;
  imageFolder: UploadFolder;
  label?: string;
}) {
  const title = label ?? humanize(name);

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-semibold text-deep-navy">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {title}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block text-sm font-semibold text-deep-navy">
        {title}
        <input
          type="number"
          className={cn(inputClass, "mt-1")}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      </label>
    );
  }

  const text = value ?? "";

  if (isImageField(name, value)) {
    return (
      <div className="space-y-2 rounded-md border border-mountie-blue/10 bg-light-bg/60 p-3">
        <LocalImageField
          label={title}
          value={text}
          folder={imageFolder}
          onChange={(url) => onChange(url)}
        />
        <label className="block text-xs font-semibold text-cool-grey">
          Or image path / URL
          <input
            className={cn(inputClass, "mt-1")}
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/example.jpg"
          />
        </label>
      </div>
    );
  }

  const long = text.includes("\n") || text.length > 90;
  return (
    <label className="block text-sm font-semibold text-deep-navy">
      {title}
      {long ? (
        <textarea
          className={cn(inputClass, "mt-1 min-h-28")}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className={cn(inputClass, "mt-1")} value={text} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Collapsible({
  title,
  badge,
  defaultOpen = false,
  actions,
  children,
}: {
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-md border border-mountie-blue/15 bg-white">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-semibold text-deep-navy"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="text-electric-blue">{open ? "−" : "+"}</span>
          <span className="truncate">{title}</span>
          {badge && <span className="shrink-0 text-xs font-normal text-cool-grey">{badge}</span>}
        </button>
        {actions}
      </div>
      {open && <div className="space-y-3 border-t border-mountie-blue/10 p-3">{children}</div>}
    </div>
  );
}

function ArrayEditor({
  name,
  value,
  onChange,
  imageFolder,
}: {
  name: string;
  value: Json[];
  onChange: (next: Json[]) => void;
  imageFolder: UploadFolder;
}) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const sample = value[value.length - 1];
  const primitives = value.every((item) => item === null || typeof item !== "object");

  return (
    <div className="space-y-2">
      {value.map((item, index) => {
        const actions = (
          <div className="flex shrink-0 gap-1">
            <button type="button" className={smallButton} disabled={index === 0} onClick={() => move(index, index - 1)} aria-label="Move up">
              Up
            </button>
            <button type="button" className={smallButton} disabled={index === value.length - 1} onClick={() => move(index, index + 1)} aria-label="Move down">
              Down
            </button>
            <button
              type="button"
              className="rounded-sm border border-red-300 px-2 py-1 text-xs font-semibold uppercase text-red-600"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
            >
              Delete
            </button>
          </div>
        );

        if (primitives) {
          return (
            <div key={index} className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <PrimitiveField
                  name={name}
                  label={`#${index + 1}`}
                  value={item as string | number | boolean | null}
                  imageFolder={imageFolder}
                  onChange={(next) => onChange(value.map((v, i) => (i === index ? next : v)))}
                />
              </div>
              {actions}
            </div>
          );
        }

        return (
          <Collapsible key={index} title={summarize(item, index)} badge={`#${index + 1}`} actions={actions}>
            <NodeEditor
              name={name}
              value={item}
              imageFolder={imageFolder}
              onChange={(next) => onChange(value.map((v, i) => (i === index ? next : v)))}
              bare
            />
          </Collapsible>
        );
      })}
      <button
        type="button"
        className="rounded-sm bg-electric-blue px-3 py-1.5 text-xs font-semibold uppercase text-white disabled:opacity-40"
        disabled={value.length === 0}
        title={value.length === 0 ? "Empty lists cannot be extended here" : undefined}
        onClick={() => onChange([...value, blank(sample)])}
      >
        Add item
      </button>
    </div>
  );
}

export function NodeEditor({
  name,
  value,
  onChange,
  imageFolder = "pages",
  bare = false,
}: {
  name: string;
  value: Json;
  onChange: (next: Json) => void;
  imageFolder?: UploadFolder;
  /** Render without an extra heading/collapsible (used inside array items and the root). */
  bare?: boolean;
}) {
  if (Array.isArray(value)) {
    const body = <ArrayEditor name={name} value={value} onChange={onChange} imageFolder={imageFolder} />;
    return bare ? body : (
      <Collapsible title={humanize(name)} badge={`${value.length} items`}>
        {body}
      </Collapsible>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    const body = (
      <div className="space-y-3">
        {entries.map(([key, child]) => (
          <NodeEditor
            key={key}
            name={key}
            value={child}
            imageFolder={imageFolder}
            onChange={(next) => onChange({ ...value, [key]: next })}
          />
        ))}
        {entries.length === 0 && <p className="text-xs text-cool-grey">Empty</p>}
      </div>
    );
    return bare ? body : <Collapsible title={humanize(name)}>{body}</Collapsible>;
  }

  return (
    <PrimitiveField
      name={name}
      value={value as string | number | boolean | null}
      imageFolder={imageFolder}
      onChange={onChange}
    />
  );
}

export type { Json };
