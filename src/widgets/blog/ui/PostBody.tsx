// `> p:first-of-type` outranks the MDX map's paragraph classes, so the colour is restated
export function PostBody({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex flex-col gap-7 [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-[1.55] [&>p:first-of-type]:text-ink">
      {children}
    </div>
  )
}
