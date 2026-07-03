import { useState } from 'react'
import { Link } from 'react-router-dom'
import BoardSearch from './BoardSearch'
import BoardList from './BoardList'
import BoardSide from './SideBar/BoardSide'
import BoardSummary from './BoardSummary'
import '../Common/commonBoard.css'

function BoardContainer({ posts }) {
  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 8
  const totalPage = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage)

  return (
    <main className="board-page">
      <section className="board-layout">
        <div className="board-main">
          <div className="board-title-row">
            <h2>자유게시판 <span>{posts.length}건</span></h2>
          </div>

          <div className="board-toolbar">
            <BoardSearch />
            <Link to="/write" className="write-button">+ 글쓰기</Link>
          </div>

          <BoardSummary posts={posts} />
          <BoardList posts={currentPosts} />

          <div className="pagination">
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                type="button"
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <BoardSide posts={posts} />
      </section>
    </main>
  )
}

export default BoardContainer