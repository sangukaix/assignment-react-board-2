import { Link } from 'react-router-dom'

function BoardItem(props) {
  return (
    <div className="board-item">
      <span className="post-title">
        <Link to={`/board/${props.post.id}`}>
          {props.post.title}
        </Link>
        <em>{props.post.category}</em>
      </span>

      <span>{props.post.writer}</span>
      <span>{props.post.date}</span>
      <span>{props.post.views}</span>
    </div>
  )
}

export default BoardItem