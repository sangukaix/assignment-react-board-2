import { useState } from 'react'
import './Header.css'

function Header() {
  const [isJoinOpen, setIsJoinOpen] = useState(false)

  const menuList = [
    'AI+X',
    'AI웹앱 디자인',
    'AI게임 메타버스',
    'AI모션영상',
    '자유게시판',
  ]

  const handleJoinSubmit = (event) => {
    event.preventDefault()
    alert('회원가입이 완료되었습니다.')
    setIsJoinOpen(false)
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-logo-area">
            <img src="/src/assets/image/logo1.png" alt="MBC 아카데미 학생게시판" />
          </div>

          <nav className="site-nav">
            {menuList.map((menu) => (
              <span key={menu}>{menu}</span>
            ))}
          </nav>

          <div className="site-auth">
            <button type="button" className="login-button">
              로그인
            </button>
            <button
              type="button"
              className="join-button"
              onClick={() => setIsJoinOpen(true)}
            >
              회원가입
            </button>
          </div>
        </div>
      </header>

      {isJoinOpen && (
        <div className="join-modal-bg">
          <form className="join-modal" onSubmit={handleJoinSubmit}>
            <div className="join-modal-title">
              <h2>회원가입</h2>
              <button type="button" onClick={() => setIsJoinOpen(false)}>
                닫기
              </button>
            </div>

            <label>
              아이디
              <input type="text" placeholder="아이디를 입력하세요" required />
            </label>

            <label>
              비밀번호
              <input type="password" placeholder="비밀번호를 입력하세요" required />
            </label>

            <label>
              이름
              <input type="text" placeholder="이름을 입력하세요" required />
            </label>

            <button type="submit" className="join-submit-button">
              가입하기
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Header