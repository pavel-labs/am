import { PostCard } from '@/entities/post'
import type { BlogPost } from '@/shared/types'

export function BlogList({ posts }: { posts: readonly BlogPost[] }): React.ReactElement {
  return (
    <div className="border-t border-rule">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
