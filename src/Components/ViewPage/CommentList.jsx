function CommentList() {
  const comments = [
    {
      id: 1,
      writer: '미니님',
      time: '어제',
      content: 'React Router로 게시판을 나누니까 페이지 이동 구조가 훨씬 이해됩니다.',
      emoji: '🟢',
      reaction: '😂',
      reactionCount: 3,
    },
    {
      id: 2,
      writer: '마루디렉터',
      time: '19시간 전',
      content: '컴포넌트 분리 기준을 게시판으로 연습하는 방식이 좋은 것 같아요.',
      emoji: '🦉',
      reaction: '😂',
      reactionCount: 1,
    },
    {
      id: 3,
      writer: '슬직한직장인지구',
      time: '19시간 전',
      content: '댓글, 반응, 상세 페이지까지 나누면 유지보수하기 훨씬 편하겠네요.',
      emoji: '🟣',
      reaction: '👍',
      reactionCount: 2,
    },
  ]

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

              <p>{comment.content}</p>

              <div className="comment-reaction">
                <span>{comment.reaction}</span>
                <em>{comment.reactionCount}</em>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CommentList