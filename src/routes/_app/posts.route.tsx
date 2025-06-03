import { Link, Outlet } from '@tanstack/react-router'
// import { fetchPosts } from '~/utils/posts.js'

export const Route = createFileRoute({
  // loader: () => fetchPosts(),
  component: PostsComponent,
})

function PostsComponent() {
  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        <li>
          <Link to="/posts">Post 1</Link>
        </li>
        <li>
          <Link to="/posts">Post 2</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
