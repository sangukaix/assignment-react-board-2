import { NavLink } from 'react-router-dom'
import './Header.css'
import HeaderShapeBar from './HeaderShapeBar'

function Header() {
  const menuList = [
    { name: '커뮤니티', path: '/boards/free' },
  ]

  const showAuthAlert = () => {
    alert('현재 로그인/회원가입 없이 모든 기능을 다 사용할 수 있습니다.')
  }

  return (
    <header className="site-header">
      <HeaderShapeBar />

      <div className="site-header-inner">
        <NavLink to="/boards/free" className="site-logo-area">
          <img src="/src/assets/image/logo1.png" alt="MBC 아카데미 학생게시판" />
        </NavLink>

        <nav className="site-nav">
          {menuList.map((menu) => (
            <NavLink
              to={menu.path}
              key={menu.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {menu.name}
            </NavLink>
          ))}
        </nav>

        <div className="site-auth">
          <button type="button" className="login-button" onClick={showAuthAlert}>
            로그인
          </button>
          <button type="button" className="join-button" onClick={showAuthAlert}>
            회원가입
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
