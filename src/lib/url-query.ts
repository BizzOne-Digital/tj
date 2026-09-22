export function withQueryParams(
  href: string,
  params: Record<string, string | undefined>,
): string {
  const [path, existingQuery] = href.split("?");
  const search = new URLSearchParams(existingQuery ?? "");
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) search.delete(key);
    else search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `${path}?${qs}` : path;
}
