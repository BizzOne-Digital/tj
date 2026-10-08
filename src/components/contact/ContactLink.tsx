"use client";

import { useState } from "react";

type ContactLinkProps = {
  href: string;
  label: string;
  copyValue?: string;
  icon: React.ReactNode;
  className?: string;
};

export function ContactLink({ href, label, copyValue, icon, className }: ContactLinkProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    if (!copyValue) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = href;
    }
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <a href={href} className={className}>
        {icon} {label}
      </a>
      {copyValue && (
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-semibold text-mountie-blue/60 hover:text-electric-blue"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}
