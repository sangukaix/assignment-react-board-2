import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import BoardWrite from '../Pages/BoardWrite'
import BoardView from '../Pages/BoardView'
import { freePosts } from '../BoardData/Free'
import { resourcePosts } from '../BoardData/Resource'
import { greetingPosts } from '../BoardData/Greeting'
import { commentsByPostId } from '../BoardData/Comments'

const boardInfo = {
  free: {
    title: '자유게시판',
    subTitle: 'MBC 신림 학생 게시판입니다. 수강생분들끼리 자유롭게 의견을 공유하세요',
  },
  resource: {
    title: '자료게시판',
    subTitle: '나만의 Desktop app을 만들어 올려보세요',
  },
  greeting: {
    title: '가입인사',
    subTitle: '어떤 공부를 하시는지 작성해주세요',
  },
  favorite: {
    title: '즐겨찾기',
    subTitle: '즐겨찾기된 게시글입니다',
  },
}

const defaultReactions = {
  like: 0,
  laugh: 0,
  agree: 0,
  thanks: 0,
  wow: 0,
}

const normalizePost = (post) => {
  const commentsList = post.commentsList || commentsByPostId[post.id] || []

  return {
    ...post,
    favorite: post.favorite || false,
    mine: post.mine || false,
    comments: commentsList.length,
    commentsList,
    reactions: { ...defaultReactions, ...(post.reactions || {}) },
    files: post.files || [],
    poll: post.poll ? { isClosed: false, ...post.poll } : null,
  }
}

const initialPosts = [
  ...freePosts,
  ...resourcePosts,
  ...greetingPosts,
].map(normalizePost)

function Router() {
  const [posts, setPosts] = useState(initialPosts)

  const updatePost = (postId, updater) => {
    setPosts((prevPosts) => prevPosts.map((post) => (
      post.id === postId ? updater(post) : post
    )))
  }

  const increaseViews = (postId) => {
    updatePost(postId, (post) => ({ ...post, views: post.views + 1 }))
  }

  const addPost = (newPost) => {
    setPosts((prevPosts) => {
      const maxId = prevPosts.reduce((max, post) => Math.max(max, post.id), 0)

      return [
        normalizePost({
          ...newPost,
          id: maxId + 1,
          writer: '나',
          date: '방금 전',
          views: 0,
          comments: 0,
          isNew: true,
          mine: true,
        }),
        ...prevPosts,
      ]
    })
  }

  const editPost = (postId, editedPost) => {
    updatePost(postId, (post) => ({
      ...post,
      title: editedPost.title,
      content: editedPost.content,
      files: editedPost.files,
      isNew: false,
    }))
  }

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
  }

  const addReaction = (postId, reactionId) => {
    updatePost(postId, (post) => ({
      ...post,
      reactions: {
        ...post.reactions,
        [reactionId]: post.reactions[reactionId] + 1,
      },
    }))
  }

  const toggleFavorite = (postId) => {
    updatePost(postId, (post) => ({ ...post, favorite: !post.favorite }))
  }

  const addComment = (postId, commentText) => {
    updatePost(postId, (post) => {
      const commentsList = [
        ...post.commentsList,
        {
          id: Date.now(),
          writer: '나',
          time: '방금 전',
          content: commentText,
          emoji: '🙂',
          reactions: { ...defaultReactions },
        },
      ]

      return { ...post, commentsList, comments: commentsList.length }
    })
  }

  const addCommentReaction = (postId, commentId, reactionId) => {
    updatePost(postId, (post) => ({
      ...post,
      commentsList: post.commentsList.map((comment) => (
        comment.id === commentId
          ? {
              ...comment,
              reactions: {
                ...comment.reactions,
                [reactionId]: comment.reactions[reactionId] + 1,
              },
            }
          : comment
      )),
    }))
  }

  const votePostPoll = (postId, selectedOptionIds) => {
    updatePost(postId, (post) => {
      if (!post.poll || post.poll.isVoted || post.poll.isClosed) {
        return post
      }

      return {
        ...post,
        poll: {
          ...post.poll,
          isVoted: true,
          voters: post.poll.voters + 1,
          selectedOptionIds,
          options: post.poll.options.map((option) => (
            selectedOptionIds.includes(option.id)
              ? { ...option, count: option.count + 1 }
              : option
          )),
        },
      }
    })
  }

  const resetPostPoll = (postId) => {
    updatePost(postId, (post) => {
      if (!post.poll || !post.poll.isVoted) {
        return post
      }

      const selectedOptionIds = post.poll.selectedOptionIds

      return {
        ...post,
        poll: {
          ...post.poll,
          isVoted: false,
          voters: Math.max(post.poll.voters - 1, 0),
          selectedOptionIds: [],
          options: post.poll.options.map((option) => (
            selectedOptionIds.includes(option.id)
              ? { ...option, count: Math.max(option.count - 1, 0) }
              : option
          )),
        },
      }
    })
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards/free" />} />

      <Route
        path="/boards/:boardType"
        element={<Home posts={posts} boardInfo={boardInfo} />}
      />

      <Route
        path="/write"
        element={<BoardWrite posts={posts} addPost={addPost} />}
      />

      <Route
        path="/edit/:id"
        element={<BoardWrite posts={posts} addPost={addPost} editPost={editPost} />}
      />

      <Route
        path="/board/:id"
        element={(
          <BoardView
            posts={posts}
            increaseViews={increaseViews}
            addReaction={addReaction}
            toggleFavorite={toggleFavorite}
            addComment={addComment}
            addCommentReaction={addCommentReaction}
            votePostPoll={votePostPoll}
            resetPostPoll={resetPostPoll}
            deletePost={deletePost}
          />
        )}
      />
    </Routes>
  )
}

export default Router
