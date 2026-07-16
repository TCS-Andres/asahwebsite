import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownProps {
  /** Raw markdown string to render. */
  children: string;
  /** Appended after the base prose classes. */
  className?: string;
}

/*
  Markdown renders a markdown string as brand-styled prose. It is a Server
  Component: react-markdown's default export renders synchronously and needs
  no client boundary. Colors are constrained to the brand token set through
  prose modifiers (forest headings, ink body, terracotta links, sage markers).
  Used by the legal pages and the blog post template.
*/
const proseClasses =
  "prose max-w-none " +
  "prose-headings:font-display prose-headings:text-forest " +
  "prose-h2:text-h2 prose-h3:text-h3 " +
  "prose-p:text-ink prose-li:text-ink prose-strong:text-forest " +
  "prose-a:text-terracotta prose-a:font-medium marker:text-sage";

export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={`${proseClasses} ${className}`.trim()}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
