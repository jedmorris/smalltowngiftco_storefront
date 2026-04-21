import sanitizeHtmlLib from "sanitize-html";

// Pure-JS sanitizer (no jsdom) — works in Next.js server bundle without the
// @exodus/bytes ESM/CJS conflict that isomorphic-dompurify triggers in Next 16.
export function sanitizeHtml(dirty: string): string {
  return sanitizeHtmlLib(dirty, {
    allowedTags: [
      "p", "br", "strong", "em", "b", "i", "u",
      "ul", "ol", "li", "a",
      "h2", "h3", "h4",
      "span", "div", "blockquote",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "class"],
      span: ["class"],
      div: ["class"],
      p: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });
}
