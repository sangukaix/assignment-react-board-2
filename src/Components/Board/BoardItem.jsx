import { Link } from 'react-router-dom'

const reactionTypes = [
  { id: 'like', icon: '👍' },
  { id: 'laugh', icon: '😂' },
  { id: 'agree', icon: '👌' },
  { id: 'thanks', icon: '🙏' },
  { id: 'wow', icon: '😮' },
]

function BoardItem({ post }) {
  const visibleReactions = reactionTypes.filter((reaction) => (
    (post.reactions?.[reaction.id] || 0) > 0
  ))
  const pollBadgeText = post.poll?.isVoted ? '투표완료' : '☑ 투표'
  const pollBadgeClass = post.poll?.isVoted ? 'poll-badge done' : 'poll-badge'

  return (
    <div className={post.poll ? 'board-item poll-post' : 'board-item'}>
      <span className="post-title">
        {post.poll && <em className={pollBadgeClass}>{pollBadgeText}</em>}

        <Link to={`/board/${post.id}`}>{post.title}</Link>

        {post.comments > 0 && <strong className="comment-count">[{post.comments}]</strong>}

        {visibleReactions.length > 0 && (
          <span className="board-reaction-summary">
            {visibleReactions.map((reaction) => (
              <i key={reaction.id}>
                <span>{reaction.icon}</span>
                <b>{post.reactions[reaction.id]}</b>
              </i>
            ))}
          </span>
        )}

        {post.isNew && <span className="new-badge">new</span>}
      </span>

      <span>{post.writer}</span>
      <span>{post.date}</span>
      <span>{post.views}</span>
    </div>
  )
}

export default BoardItem