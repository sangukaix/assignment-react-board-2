import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BoardSide from '../Components/SideBar/BoardSide'
import './BoardWrite.css'

function BoardWrite({ posts, addPost, editPost }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)

  const editPostId = Number(id)
  const editTarget = posts.find((post) => post.id === editPostId)
  const isEditPage = id !== undefined
  const isEditMode = Boolean(editTarget)
  const isActivePoll = editTarget?.poll && !editTarget.poll.isClosed

  const [boardType, setBoardType] = useState(editTarget?.boardType || searchParams.get('board') || 'free')
  const [title, setTitle] = useState(editTarget?.title || '')
  const [content, setContent] = useState(editTarget?.content || '')
  const [contentText, setContentText] = useState('')
  const [files, setFiles] = useState(editTarget?.files || [])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
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

  useEffect(() => {
    if (editorRef.current && editTarget) {
      editorRef.current.innerHTML = editTarget.content
      setContentText(editorRef.current.innerText.trim())
    }
  }, [editTarget])

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
    const selectedFiles = Array.from(event.target.files)

    selectedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onload = function () {
        setFiles((prevFiles) => [
          ...prevFiles,
          {
            name: file.name,
            src: reader.result,
          },
        ])
      }

      reader.readAsDataURL(file)
    })
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

  const handlePreview = () => {
    syncContent()
    setIsPreviewOpen(true)
  }

  const makePollData = () => {
    if (!isPollOpen || isEditMode) {
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

    if (isActivePoll) {
      alert('진행중인 투표는 수정 및 삭제가 불가합니다.')
      return
    }

    if (title.trim() === '') {
      alert('제목을 입력해주세요.')
      return
    }

    if (contentText === '') {
      alert('내용을 입력해주세요.')
      return
    }

    if (isEditMode) {
      editPost(editTarget.id, {
        title: title.trim(),
        content,
        files,
      })

      alert('게시글이 수정되었습니다.')
      navigate(`/board/${editTarget.id}`)
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

  if (isEditPage && !editTarget) {
    return (
      <main className="board-page">
        <section className="write-layout">
          <div className="write-main">
            <div className="write-card">
              <div className="write-card-head">
                <h2>게시글을 찾을 수 없습니다.</h2>
                <Link to="/boards/free" className="write-cancel-top">목록</Link>
              </div>
            </div>
          </div>
          <BoardSide posts={posts} activeBoardType={boardType} />
        </section>
      </main>
    )
  }

  return (
    <main className="board-page">
      <section className="write-layout">
        <div className="write-main">
          <form className="write-card" onSubmit={handleSubmit}>
            <div className="write-card-head">
              <h2>{isEditMode ? '게시글 수정' : '게시글 작성'}</h2>
              <Link to={isEditMode ? `/board/${editTarget.id}` : `/boards/${boardType}`} className="write-cancel-top">
                {isEditMode ? '본문' : '목록'}
              </Link>
            </div>

            {isActivePoll && (
              <p className="write-notice">진행중인 투표는 수정 및 삭제가 불가합니다.</p>
            )}

            <div className="write-field">
              <label>게시판</label>
              <select value={boardType} onChange={handleBoardChange} disabled={isEditMode}>
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
                disabled={isActivePoll}
              />
            </div>

            <div className="write-field">
              <label>내용 <span>*</span></label>

              <div className="write-editor">
                <div className="write-toolbar">
                  <button type="button" onClick={() => runEditorCommand('insertText', '😊')} disabled={isActivePoll}>😊</button>
                  <button type="button" onClick={() => runEditorCommand('bold')} disabled={isActivePoll}>B</button>
                  <button type="button" onClick={() => runEditorCommand('italic')} disabled={isActivePoll}>I</button>
                  <button type="button" onClick={() => runEditorCommand('underline')} disabled={isActivePoll}>U</button>
                  <button type="button" onClick={() => fileInputRef.current.click()} disabled={isActivePoll}>📎</button>
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  className="write-file-input"
                  onChange={handleFileChange}
                  disabled={isActivePoll}
                />

                <div
                  ref={editorRef}
                  className="write-content-editor"
                  contentEditable={!isActivePoll}
                  data-placeholder="내용을 입력하세요"
                  onInput={syncContent}
                ></div>
              </div>

              {files.length > 0 && (
                <div className="write-image-list">
                  {files.map((file) => (
                    <div className="write-image-item" key={file.name}>
                      <img src={file.src} alt={file.name} />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="write-sub-buttons">
              <button type="button" onClick={handlePreview}>미리보기</button>
              <span>{contentText.length}글자</span>
            </div>

            {isPreviewOpen && (
              <div className="write-preview">
                <div className="write-preview-head">
                  <strong>미리보기</strong>
                  <button type="button" onClick={() => setIsPreviewOpen(false)}>닫기</button>
                </div>
                <h3>{title || '제목 없음'}</h3>
                <div className="write-preview-content" dangerouslySetInnerHTML={{ __html: content || '<p>내용이 없습니다.</p>' }}></div>
                {files.length > 0 && (
                  <div className="write-preview-images">
                    {files.map((file) => (
                      <img src={file.src} alt={file.name} key={file.name} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!isEditMode && (
              <>
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
              </>
            )}

            <div className="write-action">
              <Link to={isEditMode ? `/board/${editTarget.id}` : `/boards/${boardType}`} className="write-cancel-button">
                취소
              </Link>
              <button type="submit" disabled={isActivePoll}>
                {isEditMode ? '수정완료' : '작성완료'}
              </button>
            </div>
          </form>
        </div>

        <BoardSide posts={posts} activeBoardType={boardType} />
      </section>
    </main>
  )
}

export default BoardWrite
