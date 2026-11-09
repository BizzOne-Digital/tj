import { revalidatePath } from "next/cache";
import type { CmsContentType } from "@/lib/cms";

export function revalidateCmsContent(type: CmsContentType, slug?: string) {
  switch (type) {
    case "news":
      revalidatePath("/");
      revalidatePath("/news");
      if (slug) revalidatePath(`/news/${slug}`);
      revalidatePath("/sitemap.xml");
      break;
    case "program":
      revalidatePath("/");
      revalidatePath("/programs");
      break;
    case "staff":
      revalidatePath("/team");
      break;
    case "sponsor":
      revalidatePath("/");
      revalidatePath("/sponsors");
      break;
    case "announcement":
      revalidatePath("/", "layout");
      break;
    case "faq":
      revalidatePath("/faq");
      break;
  }
}

export function revalidateSiteNavigation() {
  revalidatePath("/", "layout");
}
