import Image from "next/image";
import type { BlogBlock, BlogText } from "./data";
import styles from "./blog.module.css";

function InlineText({ text }: { text: BlogText }) {
  if (typeof text === "string") return text;
  return text.map((part, index) => typeof part === "string" ? part : <a key={index} href={part.href}>{part.text}</a>);
}
export default function PostContent({ content }: { content: BlogBlock[] }) {
  return <div className={styles.articleBody}>{content.map((block, index) => {
    if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
    if (block.type === "image") return <figure key={index} className={styles.articleFigure}>
      <a href={block.src} target="_blank" rel="noopener noreferrer" className={styles.diagramLink} aria-label="Open the RISC-V RTL diagram at full resolution in a new tab">
        <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 720px) 100vw, 880px" />
        <span className={styles.diagramHint}>view full-resolution diagram ↗</span>
      </a>
      <figcaption>{block.caption}</figcaption>
    </figure>;
    if (block.type === "orderedList") return <ol key={index} className={styles.contentList}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} /></li>)}</ol>;
    return <p key={index}><InlineText text={block.text} /></p>;
  })}</div>;
}
