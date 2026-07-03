import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Components/Pages/Home'
import BoardWrite from '../Components/Pages/BoardWrite'
import BoardView from '../Components/Pages/BoardView'

const initialPosts = [
  { id: 1, category: '공지사항', title: 'React Router로 SPA 게시판 만들기', writer: '홍길동', date: '1분 전', views: 52, comments: 3, isNew: true, content: 'React Router를 사용해서 SPA 게시판을 만드는 예제입니다.' },
  { id: 2, category: '공유', title: '다크모드 토글 구현 예제 공유합니다', writer: '김코딩', date: '1시간 전', views: 63, comments: 1, isNew: true, content: 'useState로 다크모드 상태를 관리하는 예제입니다.' },
  { id: 3, category: '질문', title: '컴포넌트 분리 기준에 대해', writer: '이리액트', date: '2시간 전', views: 32, comments: 0, isNew: true, content: '컴포넌트를 어디까지 나누는 게 좋은지 질문합니다.' },
  { id: 4, category: '공유', title: 'Pagination 구현 방식 비교하기', writer: '박자바', date: '3시간 전', views: 39, comments: 2, isNew: false, content: '페이지네이션 구현 방식을 비교해봤습니다.' },
  { id: 5, category: '질문', title: 'useState 사용법 질문입니다.', writer: '최프론트', date: '4시간 전', views: 18, comments: 4, isNew: false, content: 'useState를 사용할 때 헷갈리는 부분이 있습니다.' },
  { id: 6, category: '자유', title: '수업 복습하면서 게시판 만들고 있어요', writer: '정리왕', date: '5시간 전', views: 27, comments: 2, isNew: false, content: '수업 내용을 복습하면서 게시판을 만들고 있습니다.' },
  { id: 7, category: '공유', title: 'CSS 파일을 컴포넌트별로 나누는 방법', writer: '스타일러', date: '6시간 전', views: 44, comments: 1, isNew: false, content: 'CSS 파일을 기능별로 나누는 방법을 정리했습니다.' },
  { id: 8, category: '질문', title: 'props로 데이터를 넘기는 이유가 궁금합니다', writer: '리액트초보', date: '7시간 전', views: 21, comments: 5, isNew: false, content: 'props를 왜 사용하는지 궁금합니다.' },
  { id: 9, category: '공지사항', title: '게시판 프로젝트 제출 전 체크리스트', writer: '관리자', date: '어제', views: 88, comments: 6, isNew: false, content: '제출 전에 확인해야 할 내용을 정리했습니다.' },
  { id: 10, category: '자유', title: 'AI 웹앱 디자인 아이디어 모음', writer: '디자인러', date: '어제', views: 74, comments: 3, isNew: false, content: 'AI 웹앱 디자인 아이디어를 공유합니다.' },
  { id: 11, category: '공유', title: 'Router 사용하면서 헷갈렸던 점 정리', writer: '라우터맨', date: '2일 전', views: 56, comments: 2, isNew: false, content: 'Router를 사용할 때 헷갈렸던 부분을 정리했습니다.' },
  { id: 12, category: '질문', title: '게시글 상세 페이지는 어떻게 연결하나요?', writer: '질문요정', date: '2일 전', views: 35, comments: 7, isNew: false, content: '게시글 상세 페이지 연결 방법을 알고 싶습니다.' },
]

function Router() {
  const [posts, setPosts] = useState(initialPosts)

  const increaseViews = (postId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return { ...post, views: post.views + 1 }
      }

      return post
    }))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/write" element={<BoardWrite />} />
        <Route
          path="/board/:id"
          element={<BoardView posts={posts} increaseViews={increaseViews} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router