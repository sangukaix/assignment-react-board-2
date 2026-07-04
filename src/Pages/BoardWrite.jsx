import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BoardSide from '../Components/SideBar/BoardSide'
import './BoardWrite.css'

function BoardWrite({ posts }) {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('자유')
  const [isPollOpen, setIsPollOpen] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (title.trim() === '') {
      alert('제목을 입력해주세요.')
      return
    }

    if (content.trim() === '') {
      alert('내용을 입력해주세요.')
      return
    }

    alert('작성완료 되었습니다. 더미 게시판이라 실제 저장은 되지 않습니다.')
    navigate('/')
  }

  return (
    <main className="board-page">
      <section className="write-layout">
        <div className="write-main">
          <form className="write-card" onSubmit={handleSubmit}>
            <div className="write-card-head">
              <h2>자유게시판 글쓰기</h2>
              <Link to="/" className="write-cancel-top">목록</Link>
            </div>

            <div className="write-field">
              <label>카테고리</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="자유">자유</option>
                <option value="공지사항">공지사항</option>
                <option value="질문">질문</option>
                <option value="공유">공유</option>
              </select>
            </div>

            <div className="write-field">
              <label>제목 <span>*</span></label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="제목을 입력하세요"
              />
            </div>

            <div className="write-field">
              <label>내용 <span>*</span></label>

              <div className="write-editor">
                <div className="write-toolbar">
                  <button type="button">😊</button>
                  <button type="button">B</button>
                  <button type="button">I</button>
                  <button type="button">U</button>
                  <button type="button">🔗</button>
                  <button type="button">🖼</button>
                  <button type="button">?</button>
                </div>

                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="내용을 입력하세요"
                />
              </div>
            </div>

            <div className="write-sub-buttons">
              <button type="button">미리보기</button>
              <button type="button">임시저장</button>
              <span>{content.length}글자</span>
            </div>

            <div className={isPollOpen ? 'write-poll active' : 'write-poll'}>
              <div>
                <strong>📊 투표 추가하기</strong>
                <p>회원들이 참여할 수 있는 투표를 게시글에 추가합니다.</p>
              </div>

              <button
                type="button"
                onClick={() => setIsPollOpen(!isPollOpen)}
              >
                {isPollOpen ? 'ON' : 'OFF'}
              </button>
            </div>

            {isPollOpen && (
              <div className="write-poll-box">
                <input type="text" placeholder="투표 제목" />
                <input type="text" placeholder="선택지 1" />
                <input type="text" placeholder="선택지 2" />
              </div>
            )}

            <div className="write-action">
              <Link to="/" className="write-cancel-button">취소</Link>
              <button type="submit">작성완료</button>
            </div>
          </form>
        </div>

        <BoardSide posts={posts} />
      </section>
    </main>
  )
}

export default BoardWrite