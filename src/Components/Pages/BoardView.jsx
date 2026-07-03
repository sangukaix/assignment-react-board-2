import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function BoardView({ posts, increaseViews }) {
  const { id } = useParams()
  const postId = Number(id)
  const post = posts.find((item) => item.id === postId)

  useEffect(() => {
    if (post) {
      increaseViews(postId)
    }
  }, [])

  if (!post) {
    return (
      <main className="board-page">
        <section className="board-layout">
          <div className="board-main">
            <div className="post-view-card">
              <h2>게시글을 찾을 수 없습니다.</h2>
              <Link to="/" className="write-button">목록으로</Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="board-page">
      <section className="board-layout">
        <div className="board-main">
          <div className="post-view-card">
            <div className="post-view-top">
              <Link to="/" className="post-back-link">← 목록</Link>
              <span>{post.category}</span>
            </div>

            <h2>{post.title}</h2>

            <div className="post-view-info">
              <span>글쓴이 {post.writer}</span>
              <span>날짜 {post.date}</span>
              <span>조회 {post.views}</span>
              <span>댓글 {post.comments}</span>
            </div>

            <p className="post-view-content">
              {post.content}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BoardView