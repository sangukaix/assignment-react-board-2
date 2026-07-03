import { useState } from 'react'

function CommentWrite() {
  const [commentText, setCommentText] = useState('')

  const handleCommentSubmit = (event) => {
    event.preventDefault()

    if (commentText.trim() === '') {
      alert('댓글 내용을 입력해주세요.')
      return
    }

    alert('댓글이 등록되었습니다.')
    setCommentText('')
  }

  return (
    <form className="comment-write" onSubmit={handleCommentSubmit}>
      <div className="comment-toolbar">
        <button type="button">😊</button>
        <button type="button">B</button>
        <button type="button">I</button>
        <button type="button">U</button>
        <button type="button">🔗</button>
      </div>

      <textarea
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        placeholder="댓글을 입력하세요."
      />

      <div className="comment-write-bottom">
        <span>{commentText.length}자</span>
        <button type="submit">댓글 등록</button>
      </div>
    </form>
  )
}

export default CommentWrite