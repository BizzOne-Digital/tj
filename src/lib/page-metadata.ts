import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

type PageConfig = {
  title: string;
  description: string;
  path: string;
  eyebrow?: string;
  subtitle?: string;
};

export function createPageMetadata(config: PageConfig): Metadata {
  return createMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
  });
}

export { type PageConfig };
