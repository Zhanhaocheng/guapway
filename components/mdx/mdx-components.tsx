import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { slugify } from "@/lib/posts";

function headingId(children: ReactNode) {
  return slugify(String(children));
}

function H2(props: ComponentPropsWithoutRef<"h2">) {
  const id = headingId(props.children);
  return <h2 id={id} {...props} />;
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  const id = headingId(props.children);
  return <h3 id={id} {...props} />;
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
};
