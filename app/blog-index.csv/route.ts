/*
  Machine-readable blog index, served as CSV so the blog tracker Google Sheet
  can pull it live with =IMPORTDATA().

  It lists every post in content/blog, published or scheduled. A post is
  Published once its date arrives in Austin (its Link fills in then) and
  Scheduled before that. Scheduled posts never render on the site itself:
  this route only lists their titles.

  Columns: Date, Status, Category, Title, Description, Link, Review Doc, Cover.
  Review Doc is the Google Doc the team reads and approves before a post goes
  live, keyed by slug in content/blog-review.json. Cover is the cover image URL,
  which the sheet renders with =IMAGE(). Keep those two LAST: the sheet's own
  columns (cover thumbnail, Approval, Notes) start right after the import.

  Rows are in date order, oldest first, so a new post lands at the bottom and
  existing rows never shift. The team types an Approval status into each row,
  so a post dated before existing posts would misalign them: never backdate.

  Optional `?from=YYYY-MM-DD` limits the feed to that date onward, and
  `?order=desc` returns newest first. Absent or malformed values fall back to
  everything, ascending.

  Re-renders hourly so links appear on schedule without a redeploy.
*/
import reviewDocs from "@/content/blog-review.json";
import { getAllPostsIncludingScheduled, todayInAustin } from "@/lib/blog";

export const revalidate = 3600;

/* The apex domain 308s to www, and Sheets IMAGE() does not follow redirects. */
const BASE = "https://www.austinsleephealth.com";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/* Collapse whitespace and escape for CSV. */
function cell(value: string): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return `"${clean.replace(/"/g, '""')}"`;
}

export function GET(request: Request) {
  const today = todayInAustin();
  const params = new URL(request.url).searchParams;
  const from = params.get("from");
  const cutoff = from && ISO_DATE.test(from) ? from : null;
  const desc = params.get("order") === "desc";
  const docs = reviewDocs as Record<string, string>;

  const rows = getAllPostsIncludingScheduled()
    .filter((post) => !cutoff || post.publishedAt >= cutoff)
    .sort(
      (a, b) =>
        a.publishedAt.localeCompare(b.publishedAt) || a.slug.localeCompare(b.slug),
    );
  if (desc) rows.reverse();

  const lines = [
    ["Date", "Status", "Category", "Title", "Description", "Link", "Review Doc", "Cover"]
      .map(cell)
      .join(","),
    ...rows.map((post) => {
      const published = post.publishedAt <= today;
      return [
        post.publishedAt,
        cell(published ? "Published" : "Scheduled"),
        cell(post.category),
        cell(post.title),
        cell(post.excerpt),
        cell(published ? `${BASE}/${post.slug}/` : ""),
        cell(docs[post.slug] ?? ""),
        cell(post.image ? `${BASE}${post.image}` : ""),
      ].join(",");
    }),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="asah-blog-index.csv"',
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
