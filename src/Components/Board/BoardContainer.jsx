import { useState } from 'react'
import { Link } from 'react-router-dom'
import BoardSearch from './BoardSearch'
import BoardList from './BoardList'
import BoardSide from '../SideBar/BoardSide'
import BoardSummary from './BoardSummary'
import './Board.css'

function BoardContainer({ posts, allPosts, boardType, boardInfo }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchType, setSearchType] = useState('titleContent')
  const [searchKeyword, setSearchKeyword] = useState('')

  const filteredPosts = posts.filter((post) => {
    const keyword = searchKeyword.trim().toLowerCase()

    if (keyword === '') {
      return true
    }

    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()
    const writer = post.writer.toLowerCase()

    if (searchType === 'title') {
      return title.includes(keyword)
    }

    if (searchType === 'writer') {
      return writer.includes(keyword)
    }

    return title.includes(keyword) || content.includes(keyword)
  })

  const postsPerPage = 8
  const totalPage = Math.max(Math.ceil(filteredPosts.length / postsPerPage), 1)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)
  const writeBoardType = boardType === 'favorite' ? 'free' : boardType

  return (
    <main className="board-page">
      <section className="board-layout">
        <div className="board-main">
          <div className="board-title-row">
            <div>
              <h2>{boardInfo.title} <span>{filteredPosts.length}건</span></h2>
              {boardInfo.subTitle && (
                <p className="board-sub-title">{boardInfo.subTitle}</p>
              )}
            </div>
          </div>

          <div className="board-toolbar">
            <BoardSearch
              searchType={searchType}
              setSearchType={setSearchType}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              resetPage={() => setCurrentPage(1)}
            />
            <Link to={`/write?board=${writeBoardType}`} className="write-button">+ 글쓰기</Link>
          </div>

          <BoardSummary allPosts={allPosts} />
          <BoardList posts={currentPosts} />

          {filteredPosts.length === 0 && (
            <div className="board-empty">검색 결과가 없습니다.</div>
          )}

          <div className="pagination">
            <button type="button" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{'<<'}</button>
            <button type="button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>

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

            <button type="button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPage}>{'>'}</button>
            <button type="button" onClick={() => setCurrentPage(totalPage)} disabled={currentPage === totalPage}>{'>>'}</button>
          </div>
        </div>

        <BoardSide
          posts={allPosts}
          resetPage={() => setCurrentPage(1)}
          activeBoardType={boardType}
        />
      </section>
    </main>
  )
}

export default BoardContainer