import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "b", "i", "u",
      "ul", "ol", "li", "a",
      "h2", "h3", "h4",
      "span", "div", "blockquote",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });
}
