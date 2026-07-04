import { useRef, useState } from 'react'

function CommentWrite({ onAddComment }) {
  const editorRef = useRef(null)
  const [commentText, setCommentText] = useState('')
  const [commentHtml, setCommentHtml] = useState('')

  const syncComment = () => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    setCommentHtml(editor.innerHTML)
    setCommentText(editor.innerText.trim())
  }

  const runEditorCommand = (command, value = null) => {
    editorRef.current.focus()
    document.execCommand(command, false, value)
    syncComment()
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    syncComment()

    if (commentText === '') {
      alert('댓글 내용을 입력해주세요.')
      return
    }

    onAddComment(commentHtml)
    editorRef.current.innerHTML = ''
    setCommentText('')
    setCommentHtml('')
  }

  return (
    <form className="comment-write" onSubmit={handleCommentSubmit}>
      <div className="comment-toolbar">
        <button type="button" onClick={() => runEditorCommand('insertText', '😊')}>😊</button>
        <button type="button" onClick={() => runEditorCommand('bold')}>B</button>
        <button type="button" onClick={() => runEditorCommand('italic')}>I</button>
        <button type="button" onClick={() => runEditorCommand('underline')}>U</button>
        <button type="button" onClick={() => runEditorCommand('insertText', '📎')}>📎</button>
      </div>

      <div
        ref={editorRef}
        className="comment-content-editor"
        contentEditable
        data-placeholder="댓글을 입력하세요"
        onInput={syncComment}
      ></div>

      <div className="comment-write-bottom">
        <span>{commentText.length}글자</span>
        <button type="submit">댓글 등록</button>
      </div>
    </form>
  )
}

export default CommentWrite