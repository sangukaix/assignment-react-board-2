import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import BoardSide from '../Components/SideBar/BoardSide'
import PostDetail from '../Components/ViewPage/PostDetail'
import ReactionButtons from '../Components/ViewPage/ReactionButtons'
import CommentList from '../Components/ViewPage/CommentList'
import CommentWrite from '../Components/ViewPage/CommentWrite'
import '../Components/ViewPage/ViewPage.css'

function BoardView({ posts, increaseViews }) {
  const { id } = useParams()
  const postId = Number(id)
  const viewedPostId = useRef(null)
  const post = posts.find((item) => item.id === postId)

  useEffect(() => {
    if (!post || viewedPostId.current === postId) {
      return
    }

    increaseViews(postId)
    viewedPostId.current = postId
  }, [increaseViews, post, postId])

  if (!post) {
    return (
      <main className="board-page">
        <section className="view-layout">
          <div className="view-main">
            <div className="view-card">
              <p>게시글을 찾을 수 없습니다.</p>
              <Link to="/boards/free" className="view-back-button">목록으로</Link>
            </div>
          </div>

          <BoardSide posts={posts} />
        </section>
      </main>
    )
  }

  return (
    <main className="board-page">
      <section className="view-layout">
        <div className="view-main">
          <div className="view-top-nav">
            <Link to={`/boards/${post.boardType}`} className="view-back-link">
              목록으로
            </Link>
            <span>이전 글 | 다음 글</span>
          </div>

          <div className="view-card">
            <PostDetail post={post} />
            <ReactionButtons />
          </div>

          <CommentList />
          <CommentWrite />
        </div>

        <BoardSide posts={posts} />
      </section>
    </main>
  )
}

export default BoardView