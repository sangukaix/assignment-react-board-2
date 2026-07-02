import CommunityPanel from './CommunityPanel'
import BoardCategory from './BoardCategory'

function BoardSide(props) {
  return (
    <aside className="board-side">
      <CommunityPanel posts={props.posts} />
      <BoardCategory posts={props.posts} />
    </aside>
  )
}

export default BoardSide