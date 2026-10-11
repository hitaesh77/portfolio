import type { BlogBlock, BlogText } from "./data";
import styles from "./blog.module.css";

function InlineText({ text }: { text: BlogText }) {
  if (typeof text === "string") return text;
  return text.map((part, index) => typeof part === "string" ? part : <a key={index} href={part.href}>{part.text}</a>);
}
export default function PostContent({ content }: { content: BlogBlock[] }) {
  return <div className={styles.articleBody}>{content.map((block, index) => {
    if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
    if (block.type === "orderedList") return <ol key={index} className={styles.contentList}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} /></li>)}</ol>;
    return <p key={index}><InlineText text={block.text} /></p>;
  })}</div>;
}
