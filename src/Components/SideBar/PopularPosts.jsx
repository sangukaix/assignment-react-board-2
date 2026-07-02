import { Link } from 'react-router-dom'

function PopularPosts(props) {
  const popularPosts = [...props.posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  return (
    <div className="popular-area">
      <div className="side-menu-title">🔥 인기글</div>

      <ul className="popular-list">
        {
          popularPosts.map((post, idx) => {
            return (
              <li key={post.id}>
                <span className="popular-rank">{idx + 1}</span>

                <Link to={`/board/${post.id}`} className="popular-title">
                  {post.title}
                </Link>

                <span className="popular-view">{post.views}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default PopularPosts