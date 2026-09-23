import Image from "next/image";
import Link from "next/link";

export interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  /** Preformatted display date, for example "November 25, 2025". */
  displayDate: string;
  image: string;
  imageAlt: string;
  category: string;
  readingMinutes: number;
}

export interface BlogCardProps {
  post: BlogCardPost;
  /** Heading level for the card title. Defaults to h2 on the index. */
  headingAs?: "h2" | "h3";
  /** next/image sizes attribute for the cover. */
  sizes?: string;
}

/*
  Blog post card used on the blog index and in the related posts strip. The
  whole card is one link to the post at its root-level URL. Plain server
  markup with no client state, so it can render inside client or server trees.
*/
export function BlogCard({
  post,
  headingAs: Heading = "h2",
  sizes = "(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw",
}: BlogCardProps) {
  return (
    <Link
      href={`/${post.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-soft transition duration-200 ease-out hover:-translate-y-1.5 hover:border-sage/40 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-cream">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-eyebrow">{post.category}</p>
        <Heading className="text-h3 mt-3 text-forest transition-colors duration-200 ease-out group-hover:text-sage">
          {post.title}
        </Heading>
        <p className="text-body mt-3 text-ink">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <span className="text-small font-semibold text-terracotta">
            Read more
          </span>
          <span className="text-small text-ink/60">
            <time dateTime={post.publishedAt}>{post.displayDate}</time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
