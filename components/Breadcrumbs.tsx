import Link from "next/link";

export interface BreadcrumbItem {
  /** Visible label for the crumb. */
  label: string;
  /** Destination. Omit on the current (last) page so it renders as plain text. */
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/*
  Breadcrumbs render a small sage trail. The last item is treated as the current
  page: it is never a link and carries aria-current="page". Earlier items link
  when an href is provided.
*/
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const showLink = item.href !== undefined && !isLast;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-x-2">
              {showLink ? (
                <Link
                  href={item.href as string}
                  className="text-small text-sage underline-offset-4 transition hover:text-forest hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`text-small ${isLast ? "text-ink" : "text-sage"}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-small text-sage/50">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
