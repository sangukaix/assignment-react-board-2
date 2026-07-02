import BoardItem from './BoardItem'

function BoardList(props) {
  return (
    <div className="board-list">
      <div className="board-list-head">
        <span>제목</span>
        <span>글쓴이</span>
        <span>날짜</span>
        <span>조회</span>
      </div>

      {
        props.posts.map((post) => {
          return <BoardItem post={post} key={post.id} />
        })
      }
    </div>
  )
}

export default BoardList