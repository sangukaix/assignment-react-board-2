import { useParams } from 'react-router-dom'
import BoardContainer from '../Components/Board/BoardContainer'

function Home({ posts, boardInfo }) {
  const { boardType } = useParams()

  const currentBoardInfo = boardInfo[boardType] || boardInfo.free
  const currentPosts = posts.filter((post) => post.boardType === boardType)

  return (
    <BoardContainer
      posts={currentPosts}
      allPosts={posts}
      boardType={boardType}
      boardInfo={currentBoardInfo}
    />
  )
}

export default Home