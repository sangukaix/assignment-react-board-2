import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BoardSearch from './BoardSearch'
import BoardList from './BoardList'
import BoardSide from '../SideBar/BoardSide'
import BoardSummary from './BoardSummary'
import './Board.css'

function BoardContainer({ posts, allPosts, boardType, boardInfo }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = Number(searchParams.get('page')) || 1
  const [currentPage, setCurrentPage] = useState(pageParam)
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

  const postsPerPage = 10
  const totalPage = Math.max(Math.ceil(filteredPosts.length / postsPerPage), 1)
  const displayPage = Math.min(currentPage, totalPage)
  const startIndex = (displayPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)
  const writeBoardType = boardType === 'favorite' ? 'free' : boardType

  const changePage = (nextPage) => {
    const page = Math.min(Math.max(nextPage, 1), totalPage)
    setCurrentPage(page)
    setSearchParams(page === 1 ? {} : { page: String(page) })
  }


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
              resetPage={() => changePage(1)}
            />
            <Link to={`/write?board=${writeBoardType}`} className="write-button">+ 글쓰기</Link>
          </div>

          <BoardSummary allPosts={allPosts} />
          <BoardList posts={currentPosts} />

          {filteredPosts.length === 0 && (
            <div className="board-empty">검색 결과가 없습니다.</div>
          )}

          <div className="pagination">
            <button type="button" onClick={() => changePage(1)} disabled={displayPage === 1}>{'<<'}</button>
            <button type="button" onClick={() => changePage(displayPage - 1)} disabled={displayPage === 1}>{'<'}</button>

            {Array.from({ length: totalPage }, (_, index) => (
              <button
                type="button"
                key={index + 1}
                className={displayPage === index + 1 ? 'active' : ''}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button type="button" onClick={() => changePage(displayPage + 1)} disabled={displayPage === totalPage}>{'>'}</button>
            <button type="button" onClick={() => changePage(totalPage)} disabled={displayPage === totalPage}>{'>>'}</button>
          </div>
        </div>

        <BoardSide
          posts={allPosts}
          resetPage={() => changePage(1)}
          activeBoardType={boardType}
        />
      </section>
    </main>
  )
}

export default BoardContainer