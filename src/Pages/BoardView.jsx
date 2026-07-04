import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import BoardSide from '../Components/SideBar/BoardSide'
import PostDetail from '../Components/ViewPage/PostDetail'
import PostPoll from '../Components/ViewPage/PostPoll'
import ReactionButtons from '../Components/ViewPage/ReactionButtons'
import CommentList from '../Components/ViewPage/CommentList'
import CommentWrite from '../Components/ViewPage/CommentWrite'
import '../Components/ViewPage/ViewPage.css'

function BoardView({
  posts,
  increaseViews,
  addReaction,
  toggleFavorite,
  addComment,
  addCommentReaction,
  votePostPoll,
  resetPostPoll,
}) {
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
            <Link to={`/boards/${post.boardType}`} className="view-back-link">목록</Link>
            <span>확실히 휴먼 피드백이 가장 좋네요. 〉</span>
          </div>

          <div className="view-card">
            <PostDetail post={post} />

            {post.poll && (
              <PostPoll
                poll={post.poll}
                postId={post.id}
                boardType={post.boardType}
                onVote={votePostPoll}
                onResetPoll={resetPostPoll}
              />
            )}

            <ReactionButtons
              reactions={post.reactions}
              onReaction={(reactionId) => addReaction(post.id, reactionId)}
            />

            <div className="view-card-actions">
              <button
                type="button"
                className={post.favorite ? 'favorite-button active' : 'favorite-button'}
                onClick={() => toggleFavorite(post.id)}
              >
                {post.favorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기'}
              </button>
              <Link to={`/boards/${post.boardType}`} className="view-list-button">목록으로</Link>
            </div>
          </div>

          <CommentList
            comments={post.commentsList}
            onCommentReaction={(commentId, reactionId) => addCommentReaction(post.id, commentId, reactionId)}
          />
          <CommentWrite onAddComment={(commentText) => addComment(post.id, commentText)} />
        </div>

        <BoardSide posts={posts} />
      </section>
    </main>
  )
}

export default BoardView