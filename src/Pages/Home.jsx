import { useParams } from 'react-router-dom'
import BoardContainer from '../Components/Board/BoardContainer'

function Home({ posts, boardInfo }) {
  const { boardType } = useParams()
  const currentBoardType = boardInfo[boardType] ? boardType : 'free'
  const currentBoardInfo = boardInfo[currentBoardType]

  const currentPosts = currentBoardType === 'favorite'
    ? posts.filter((post) => post.favorite)
    : posts.filter((post) => post.boardType === currentBoardType)

  return (
    <BoardContainer
      posts={currentPosts}
      allPosts={posts}
      boardType={currentBoardType}
      boardInfo={currentBoardInfo}
    />
  )
}

export default Home