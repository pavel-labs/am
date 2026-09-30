/**
 * Wrapper for the compiled MDX of a post. Element styling lives in the MDX
 * component map; the lead paragraph is set larger here because it belongs to
 * the first paragraph alone. `> p:first-of-type` outranks the map's own
 * paragraph classes, so the colour has to be restated.
 */
export function PostBody({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex flex-col gap-7 [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-[1.55] [&>p:first-of-type]:text-ink">
      {children}
    </div>
  )
}
