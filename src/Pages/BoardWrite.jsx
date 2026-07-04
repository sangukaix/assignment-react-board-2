import { useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import BoardSide from '../Components/SideBar/BoardSide'
import './BoardWrite.css'

function BoardWrite({ posts, addPost }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)

  const [boardType, setBoardType] = useState(searchParams.get('board') || 'free')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [contentText, setContentText] = useState('')
  const [files, setFiles] = useState([])
  const [isPollOpen, setIsPollOpen] = useState(false)
  const [pollTitle, setPollTitle] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [pollType, setPollType] = useState('single')
  const [pollDeadline, setPollDeadline] = useState('24시간')

  const boardOptions = [
    { value: 'free', label: '자유게시판' },
    { value: 'resource', label: '자료게시판' },
    { value: 'greeting', label: '가입인사' },
  ]

  const syncContent = () => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    setContent(editor.innerHTML)
    setContentText(editor.innerText.trim())
  }

  const runEditorCommand = (command, value = null) => {
    editorRef.current.focus()
    document.execCommand(command, false, value)
    syncContent()
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => file.name)
    setFiles(selectedFiles)
  }

  const handleBoardChange = (event) => {
    const nextBoardType = event.target.value
    setBoardType(nextBoardType)

    if (nextBoardType !== 'free' && isPollOpen) {
      alert('자유게시판에서만 투표기능을 사용할 수 있습니다.')
      setIsPollOpen(false)
    }
  }

  const handlePollToggle = () => {
    if (boardType !== 'free') {
      alert('자유게시판에서만 투표기능을 사용할 수 있습니다.')
      return
    }

    setIsPollOpen(!isPollOpen)
  }

  const handleAddPollOption = () => {
    setPollOptions([...pollOptions, ''])
  }

  const handlePollOptionChange = (index, value) => {
    setPollOptions(pollOptions.map((option, optionIndex) => (
      optionIndex === index ? value : option
    )))
  }

  const makePollData = () => {
    if (!isPollOpen) {
      return null
    }

    const filteredOptions = pollOptions.map((option) => option.trim()).filter(Boolean)

    if (pollTitle.trim() === '') {
      alert('투표 제목을 입력해주세요.')
      return false
    }

    if (filteredOptions.length < 2) {
      alert('투표 옵션은 최소 2개 이상 입력해주세요.')
      return false
    }

    return {
      title: pollTitle.trim(),
      type: pollType,
      deadline: pollDeadline,
      voters: 0,
      isVoted: false,
      selectedOptionIds: [],
      options: filteredOptions.map((option, index) => ({
        id: `option-${index + 1}`,
        text: option,
        count: 0,
      })),
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    syncContent()

    if (title.trim() === '') {
      alert('제목을 입력해주세요.')
      return
    }

    if (contentText === '') {
      alert('내용을 입력해주세요.')
      return
    }

    const poll = makePollData()

    if (poll === false) {
      return
    }

    addPost({
      boardType,
      category: boardOptions.find((board) => board.value === boardType).label,
      title: title.trim(),
      content,
      files,
      poll,
    })

    alert('게시글이 등록되었습니다.')
    navigate(`/boards/${boardType}`)
  }

  return (
    <main className="board-page">
      <section className="write-layout">
        <div className="write-main">
          <form className="write-card" onSubmit={handleSubmit}>
            <div className="write-card-head">
              <h2>게시글 작성</h2>
              <Link to={`/boards/${boardType}`} className="write-cancel-top">목록</Link>
            </div>

            <div className="write-field">
              <label>게시판</label>
              <select value={boardType} onChange={handleBoardChange}>
                {boardOptions.map((board) => (
                  <option value={board.value} key={board.value}>{board.label}</option>
                ))}
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
                  <button type="button" onClick={() => runEditorCommand('insertText', '😊')}>😊</button>
                  <button type="button" onClick={() => runEditorCommand('bold')}>B</button>
                  <button type="button" onClick={() => runEditorCommand('italic')}>I</button>
                  <button type="button" onClick={() => runEditorCommand('underline')}>U</button>
                  <button type="button" onClick={() => fileInputRef.current.click()}>📎</button>
                </div>

                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  className="write-file-input"
                  onChange={handleFileChange}
                />

                <div
                  ref={editorRef}
                  className="write-content-editor"
                  contentEditable
                  data-placeholder="내용을 입력하세요"
                  onInput={syncContent}
                ></div>
              </div>

              {files.length > 0 && (
                <ul className="write-file-list">
                  {files.map((file) => (
                    <li key={file}>📎 {file}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="write-sub-buttons">
              <button type="button" onClick={() => alert(contentText || '미리볼 내용이 없습니다.')}>미리보기</button>
              <button type="button" onClick={() => alert('임시저장은 서버/DB 없이 안내만 표시합니다.')}>임시저장</button>
              <span>{contentText.length}글자</span>
            </div>

            <div className={isPollOpen ? 'write-poll active' : 'write-poll'}>
              <div className="write-poll-info">
                <span className="write-poll-icon">📊</span>
                <div>
                  <strong>투표 추가하기 <em>선택사항</em></strong>
                  <p>회원들이 참여할 수 있는 투표를 게시글에 추가합니다</p>
                </div>
              </div>

              <button type="button" className="write-poll-toggle" onClick={handlePollToggle}>
                <span>{isPollOpen ? 'ON' : 'OFF'}</span>
                <i></i>
              </button>
            </div>

            {isPollOpen && (
              <div className="write-poll-box">
                <div className="write-poll-field">
                  <label>투표 제목 <span>*</span></label>
                  <input
                    type="text"
                    value={pollTitle}
                    onChange={(event) => setPollTitle(event.target.value)}
                    placeholder="예: 가장 선호하는 기능은?"
                  />
                </div>

                <div className="write-poll-field">
                  <label>투표 옵션 (최소 2개)</label>
                  {pollOptions.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      value={option}
                      onChange={(event) => handlePollOptionChange(index, event.target.value)}
                      placeholder={`옵션 ${index + 1}`}
                    />
                  ))}
                  <button type="button" className="poll-option-add" onClick={handleAddPollOption}>
                    + 옵션 추가
                  </button>
                </div>

                <div className="write-poll-field">
                  <label>선택 방식</label>
                  <div className="write-radio-row">
                    <label>
                      <input
                        type="radio"
                        name="pollType"
                        value="single"
                        checked={pollType === 'single'}
                        onChange={(event) => setPollType(event.target.value)}
                      />
                      단일 선택
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="pollType"
                        value="multi"
                        checked={pollType === 'multi'}
                        onChange={(event) => setPollType(event.target.value)}
                      />
                      복수 선택
                    </label>
                  </div>
                </div>

                <div className="write-poll-field">
                  <label>투표 마감 시간 <span>*</span></label>
                  <div className="write-deadline-row">
                    <select
                      value={pollDeadline}
                      onChange={(event) => setPollDeadline(event.target.value)}
                    >
                      <option>24시간</option>
                      <option>3일</option>
                      <option>7일</option>
                    </select>
                    <span>후 자동 마감</span>
                  </div>
                </div>
              </div>
            )}

            <div className="write-action">
              <Link to={`/boards/${boardType}`} className="write-cancel-button">취소</Link>
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