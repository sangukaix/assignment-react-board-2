const commentReactions = [
  { id: 'like', icon: '👍' },
  { id: 'laugh', icon: '😂' },
  { id: 'agree', icon: '👌' },
  { id: 'thanks', icon: '🙏' },
  { id: 'wow', icon: '😮' },
]

function CommentList({ comments, onCommentReaction }) {
  return (
    <section className="comment-section">
      <h3>댓글 {comments.length}개</h3>

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-profile">
              <span>{comment.emoji}</span>
            </div>

            <div className="comment-body">
              <div className="comment-top">
                <strong>{comment.writer}</strong>
                <span>{comment.time}</span>
              </div>

              <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>

              <div className="comment-reaction-panel">
                <button type="button" className="comment-reaction-add">+</button>
                {commentReactions.map((reaction) => (
                  <button
                    type="button"
                    key={reaction.id}
                    className="comment-reaction-button"
                    onClick={() => onCommentReaction(comment.id, reaction.id)}
                  >
                    <span>{reaction.icon}</span>
                    <em>{comment.reactions[reaction.id] || 0}</em>
                  </button>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CommentList