import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import BoardWrite from '../Pages/BoardWrite'
import BoardView from '../Pages/BoardView'
import { freePosts } from '../BoardData/Free'
import { resourcePosts } from '../BoardData/Resource'
import { greetingPosts } from '../BoardData/Greeting'

const boardInfo = {
  free: {
    title: '자유게시판',
    subTitle: '',
  },
  resource: {
    title: '자료게시판',
    subTitle: '나만의 Desktop app을 만들어 올려보세요',
  },
  greeting: {
    title: '가입인사',
    subTitle: '',
  },
}

const initialPosts = [
  ...freePosts,
  ...resourcePosts,
  ...greetingPosts,
]

function Router() {
  const [posts, setPosts] = useState(initialPosts)

  const increaseViews = (postId) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id === postId) {
        return { ...post, views: post.views + 1 }
      }

      return post
    }))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/boards/free" />} />

        <Route
          path="/boards/:boardType"
          element={<Home posts={posts} boardInfo={boardInfo} />}
        />

        <Route path="/write" element={<BoardWrite posts={posts} />} />

        <Route
          path="/board/:id"
          element={<BoardView posts={posts} increaseViews={increaseViews} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router