import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { EyebrowHeading } from "@/components/EyebrowHeading";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { QuizCTA } from "@/components/QuizCTA";
import { getAllPosts, formatPostDate } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sleep & Airway Blog",
  description:
    "Read sleep and airway health insights from Austin Sleep and Airway Health in Austin, TX, with guidance on sleep apnea, breathing, and comfortable care.",
  path: "/blog/",
});

/*
  Blog index. Lists the three migrated posts as cards. Each card links to the
  post at its root-level live URL (/slug/). Data comes from lib/blog.ts.
*/

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1">
      <Section background="cream">
        <Container>
          <EyebrowHeading
            eyebrow="Sleep and Airway Insights"
            heading="Blog"
            as="h1"
          />
          <p className="text-body mt-6 max-w-2xl text-ink">
            Guidance on sleep apnea, airway health, and comfortable treatment
            options from the team at Austin Sleep & Airway Health.
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li key={post.slug} className="h-full">
                <Reveal className="h-full" delayMs={(index % 3) * 90}>
                  <Link
                    href={`/${post.slug}/`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-soft transition duration-200 ease-out hover:-translate-y-1.5 hover:border-sage/40 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-300 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-eyebrow">{formatPostDate(post.publishedAt)}</p>
                      <h2 className="text-h3 mt-3 text-forest transition-colors duration-200 ease-out group-hover:text-sage">
                        {post.title}
                      </h2>
                      <p className="text-body mt-3 text-ink">{post.excerpt}</p>
                      <span className="text-small mt-5 font-semibold text-terracotta">
                        Read more
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <QuizCTA />
    </main>
  );
}
