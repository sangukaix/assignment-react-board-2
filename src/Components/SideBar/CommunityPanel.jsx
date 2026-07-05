import { Link, useParams } from 'react-router-dom'
import PopularPosts from './PopularPosts'

function CommunityPanel({ posts, resetPage, activeBoardType }) {
  const { boardType } = useParams()
  const currentBoardType = activeBoardType || boardType

  const menuList = [
    { type: 'free', icon: '🔥', name: '자유게시판', path: '/boards/free' },
    { type: 'resource', icon: '📁', name: '자료게시판', path: '/boards/resource' },
    { type: 'greeting', icon: '👋', name: '가입인사', path: '/boards/greeting' },
    { type: 'favorite', icon: '⭐', name: '즐겨찾기', path: '/boards/favorite' },
  ]

  return (
    <div className="community-panel">
      <div className="community-header">
        <span className="community-icon">!</span>
        <strong>커뮤니티</strong>
      </div>

      <div className="community-body">
        <ul className="community-menu">
          {menuList.map((menu) => (
            <li
              key={menu.type}
              className={currentBoardType === menu.type ? 'active' : ''}
            >
              <Link to={menu.path} onClick={resetPage}>
                {menu.icon} {menu.name}
              </Link>
            </li>
          ))}
        </ul>

        <PopularPosts posts={posts} />
      </div>
    </div>
  )
}

export default CommunityPanel
