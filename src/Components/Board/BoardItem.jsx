import { Link } from 'react-router-dom'

function BoardItem({ post }) {
  return (
    <div className="board-item">
      <span className="post-title">
        <Link to={`/board/${post.id}`}>
          {post.title}
        </Link>
        <em>{post.category}</em>
        {post.comments > 0 && <strong className="comment-count">[{post.comments}]</strong>}
        {post.isNew && <span className="new-badge">new</span>}
      </span>

      <span>{post.writer}</span>
      <span>{post.date}</span>
      <span>{post.views}</span>
    </div>
  )
}

export default BoardItem