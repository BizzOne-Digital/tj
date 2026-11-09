import { headers } from "next/headers";
import { encodePublicAssetPath } from "@/lib/utils";
import { getPageHeroOverride } from "@/lib/page-heroes";

/**
 * Page header. Text/background can be overridden per page from the admin portal
 * (Page Headings), matched by the request path; otherwise the props are used.
 */
export async function PageHero({
  title,
  subtitle,
  eyebrow,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const override = pathname ? await getPageHeroOverride(pathname) : null;
  const finalEyebrow = override?.eyebrow ?? eyebrow;
  const finalTitle = override?.title ?? title;
  const finalSubtitle = override?.subtitle ?? subtitle;

  return (
    <section className="relative overflow-hidden bg-deep-navy pb-16 pt-32 md:pb-24 md:pt-40">
      {override?.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={encodePublicAssetPath(override.image)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="court-lines absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="grain absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container relative z-10">
        {finalEyebrow && (
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.25em] text-electric-blue">
            {finalEyebrow}
          </p>
        )}
        <h1 className="hero-title max-w-4xl text-white">
          {finalTitle}
        </h1>
        {finalSubtitle && (
          <p className="mt-6 max-w-2xl text-lg text-cool-grey md:text-xl">{finalSubtitle}</p>
        )}
        {children}
      </div>
      <div className="angle-divider-bottom" aria-hidden="true" />
    </section>
  );
}
