import './SideBar.css'
import CommunityPanel from './CommunityPanel'
import BoardCategory from './BoardCategory'

function BoardSide(props) {
  return (
    <aside className="board-side">
      <CommunityPanel
        posts={props.posts}
        resetPage={props.resetPage}
        activeBoardType={props.activeBoardType}
      />
      <BoardCategory posts={props.posts} />
    </aside>
  )
}

export default BoardSide
