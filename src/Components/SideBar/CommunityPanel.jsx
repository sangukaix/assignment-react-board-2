import PopularPosts from './PopularPosts'

function CommunityPanel(props) {
  return (
    <div className="community-panel">
      <div className="community-header">
        <span className="community-icon">!</span>
        <strong>커뮤니티</strong>
      </div>

      <div className="community-body">
        <ul className="community-menu">
          <li className="active">🔥 자유게시판</li>
          <li>🙂 유머게시판</li>
          <li>⚔️ 오늘의 배틀</li>
          <li>👋 가입인사</li>
        </ul>

        <PopularPosts posts={props.posts} />
      </div>
    </div>
  )
}

export default CommunityPanel