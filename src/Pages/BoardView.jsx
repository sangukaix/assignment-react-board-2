import { useParams } from 'react-router-dom'

function BoardView() {
  const params = useParams()

  return (
    <div>
      <h2>게시글 상세보기</h2>
      <p>게시글 번호: {params.id}</p>
    </div>
  )
}

export default BoardView