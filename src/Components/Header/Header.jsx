import { NavLink } from 'react-router-dom'
import './Header.css'
import HeaderShapeBar from './HeaderShapeBar'
import logo from '../../assets/image/logo1.png'

function Header() {
  const showAuthAlert = () => {
    alert('현재 로그인/회원가입 없이 모든 기능을 다 사용할 수 있습니다.')
  }

  return (
    <header className="site-header">
      <HeaderShapeBar />

      <div className="site-header-inner">
        <NavLink to="/boards/free" className="site-logo-area">
          <img src={logo} alt="MBC 아카데미 학생게시판" />
        </NavLink>

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