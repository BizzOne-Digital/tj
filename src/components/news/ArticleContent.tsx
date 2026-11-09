function renderBlock(block: string, index: number) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={index} className="mb-4 mt-8 font-display text-xl font-bold uppercase text-deep-navy">
        {trimmed.slice(3).trim()}
      </h2>
    );
  }

  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={index} className="mb-3 mt-6 font-display text-lg font-bold uppercase text-deep-navy">
        {trimmed.slice(4).trim()}
      </h3>
    );
  }

  const lines = trimmed.split("\n").map((line) => line.trim());
  const isList = lines.length > 0 && lines.every((line) => line.startsWith("- "));

  if (isList) {
    return (
      <ul key={index} className="mb-4 list-disc space-y-2 pl-6 leading-relaxed">
        {lines.map((line) => (
          <li key={line}>{line.slice(2)}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="mb-4 leading-relaxed">
      {trimmed}
    </p>
  );
}

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg mt-6 max-w-none text-mountie-blue/80">
      {content.split("\n\n").map((block, index) => renderBlock(block, index))}
    </div>
  );
}
