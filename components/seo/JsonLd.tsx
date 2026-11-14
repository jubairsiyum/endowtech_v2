import React from "react";

interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * JsonLd component renders JSON-LD structured data into the HTML head/body.
 * Critical for AI Search scrapers and search engine indexers.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

