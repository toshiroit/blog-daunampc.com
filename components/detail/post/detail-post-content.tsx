"use client";

export default function DetailPostContent({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content || "" }} />;
}
