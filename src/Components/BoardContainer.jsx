import { useState } from 'react'
import { Link } from 'react-router-dom'
import BoardSearch from './BoardSearch'
import BoardList from './BoardList'
import BoardSide from './SideBar/BoardSide'
import '../Common/commonBoard.css'
import BoardSummary from './BoardSummary'

function BoardContainer() {
  const [posts] = useState([
    { id: 1, category: '공지사항', title: 'React Router로 SPA 게시판 만들기', writer: '홍길동', date: '1분 전', views: 52 },
    { id: 2, category: '공유', title: '다크모드 토글 구현 예제 공유합니다', writer: '김코딩', date: '1시간 전', views: 63 },
    { id: 3, category: '질문', title: '컴포넌트 분리 기준에 대해', writer: '이리액트', date: '2시간 전', views: 32 },
    { id: 4, category: '공유', title: 'Pagination 구현 방식 비교하기', writer: '박자바', date: '3시간 전', views: 39 },
    { id: 5, category: '질문', title: 'useState 사용법 질문입니다.', writer: '최프론트', date: '4시간 전', views: 18 },
  ])

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
            <BoardList posts={posts} />
        </div>

        <BoardSide posts={posts} />
      </section>
    </main>
  )
}

export default BoardContainer