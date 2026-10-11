import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "../../components/theme-toggle";
import { blogAuthor, blogEntries } from "../data";
import PostContent from "../post-content";
import styles from "../blog.module.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return blogEntries.map(entry => ({ slug: entry.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = blogEntries.find(post => post.slug === slug);
  if (!entry) notFound();
  return { title: `${entry.title} | Hitaesh Saravanarajan`, description: entry.excerpt };
}
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const entry = blogEntries.find(post => post.slug === slug);
  if (!entry) notFound();
  return <main className={`portfolio-root ${styles.root}`}>
    <div className="noise pointer-events-none fixed inset-0 z-[9999] opacity-[var(--noise-opacity)]" />
    <div className={`${styles.container} ${styles.articleContainer}`}>
      <nav className={styles.nav} aria-label="Page navigation">
        <Link href="/blog" className="inline-flex items-center gap-2"><ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />Back to blog</Link>
        <ThemeToggle />
      </nav>
      <article>
        <header className={styles.articleHeader}>
          <h1>{entry.title}</h1>
          <p><span>{blogAuthor}</span><span aria-hidden="true">&middot;</span><time dateTime={entry.date}>{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${entry.date}T12:00:00Z`))}</time></p>
        </header>
        <PostContent content={entry.content} />
      </article>
      <footer className={styles.footer}><span>Hitaesh Saravanarajan</span><Link href="/blog">Back to blog</Link></footer>
    </div>
  </main>;
}
