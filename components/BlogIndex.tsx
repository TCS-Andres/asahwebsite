"use client";

import { useState } from "react";
import { BlogCard, type BlogCardPost } from "./BlogCard";

export interface BlogIndexProps {
  posts: BlogCardPost[];
  categories: readonly string[];
  /** Cards shown at first and added per "Load more" click. */
  pageSize?: number;
}

/*
  Filterable, progressively revealed grid for the blog index. Every card is
  rendered into the HTML so crawlers and no-JS visitors can reach every post;
  cards past the current page are only hidden with the hidden attribute, and
  their lazy cover images do not load until revealed. The topic chips filter
  client side, and "Load more" reveals the next page of the current filter.
*/
export function BlogIndex({ posts, categories, pageSize = 12 }: BlogIndexProps) {
  const [active, setActive] = useState<string>("All");
  const [visible, setVisible] = useState(pageSize);

  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  const chips = ["All", ...categories.filter((c) => counts.has(c))];
  const matching = posts.filter(
    (post) => active === "All" || post.category === active,
  );
  const remaining = matching.length - visible;

  function choose(category: string) {
    setActive(category);
    setVisible(pageSize);
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by topic"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {chips.map((chip) => {
          const selected = chip === active;
          const count = chip === "All" ? posts.length : counts.get(chip);
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={selected}
              onClick={() => choose(chip)}
              className={`shrink-0 rounded-full border px-4 py-2 text-small font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 ${
                selected
                  ? "border-forest bg-forest text-cream"
                  : "border-sage/30 bg-white text-forest hover:border-sage hover:bg-cream"
              }`}
            >
              {chip}
              <span className={selected ? "text-cream/70" : "text-ink/50"}>
                {" "}
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {Math.min(visible, matching.length)} of {matching.length}{" "}
        articles{active === "All" ? "" : ` about ${active}`}.
      </p>

      <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const index = matching.indexOf(post);
          const hidden = index === -1 || index >= visible;
          return (
            <li key={post.slug} className="h-full" hidden={hidden}>
              <BlogCard post={post} />
            </li>
          );
        })}
      </ul>

      {remaining > 0 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisible((count) => count + pageSize)}
            className="inline-flex items-center justify-center rounded-full border-2 border-sage px-7 py-3 text-base font-semibold text-sage transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-sage hover:text-white hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            Load more articles
            <span className="ml-2 font-normal opacity-80">
              ({remaining} more)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
