import { Link, useParams } from 'react-router-dom'
import PopularPosts from './PopularPosts'

function CommunityPanel({ posts }) {
  const { boardType } = useParams()

  const menuList = [
    { type: 'free', icon: '🔥', name: '자유게시판', path: '/boards/free' },
    { type: 'resource', icon: '📁', name: '자료게시판', path: '/boards/resource' },
    { type: 'greeting', icon: '👋', name: '가입인사', path: '/boards/greeting' },
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
              className={boardType === menu.type ? 'active' : ''}
            >
              <Link to={menu.path}>
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