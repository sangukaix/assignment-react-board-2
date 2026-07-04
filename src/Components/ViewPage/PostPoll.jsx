import { useState } from 'react'
import { Link } from 'react-router-dom'

function PostPoll({ poll, postId, boardType, onVote, onResetPoll }) {
  const [selectedOptions, setSelectedOptions] = useState(poll.selectedOptionIds || [])
  const totalVotes = poll.options.reduce((sum, option) => sum + option.count, 0)

  const handleSelect = (optionId) => {
    if (poll.isVoted) {
      return
    }

    if (poll.type === 'single') {
      setSelectedOptions([optionId])
      return
    }

    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
      return
    }

    setSelectedOptions([...selectedOptions, optionId])
  }

  const handleVote = () => {
    if (selectedOptions.length === 0) {
      alert('투표 항목을 선택해주세요.')
      return
    }

    onVote(postId, selectedOptions)
  }

  const handleReset = () => {
    setSelectedOptions([])
    onResetPoll(postId)
  }

  return (
    <section className="post-poll-box">
      <div className="post-poll-head">
        <div className="post-poll-title">
          <span>☑</span>
          <strong>{poll.title}</strong>
        </div>

        <div className="post-poll-meta">
          <span>{poll.voters}명 참여</span>
          <em>⏱ {poll.deadline} 남음</em>
        </div>
      </div>

      <div className="post-poll-options">
        {poll.options.map((option) => {
          const percent = totalVotes === 0 ? 0 : Math.round((option.count / totalVotes) * 100)
          const isSelected = selectedOptions.includes(option.id)

          if (poll.isVoted) {
            return (
              <div
                className={isSelected ? 'post-poll-result selected' : 'post-poll-result'}
                key={option.id}
              >
                <div className="post-poll-result-top">
                  <span>{isSelected ? '✓ ' : ''}{option.text}</span>
                  <strong>{percent}% ({option.count}표)</strong>
                </div>
                <div className="post-poll-progress">
                  <i style={{ width: `${percent}%` }}></i>
                </div>
              </div>
            )
          }

          return (
            <button
              type="button"
              className={isSelected ? 'post-poll-choice selected' : 'post-poll-choice'}
              key={option.id}
              onClick={() => handleSelect(option.id)}
            >
              <i></i>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>

      <div className="post-poll-actions">
        {poll.isVoted ? (
          <>
            <span className="poll-done">✓ 투표 완료</span>
            <button type="button" onClick={handleReset}>↻ 다시 투표</button>
            <Link to={`/boards/${boardType}`} className="poll-list-link">목록으로</Link>
          </>
        ) : (
          <button type="button" className="post-poll-submit" onClick={handleVote}>
            투표하기
          </button>
        )}
      </div>
    </section>
  )
}

export default PostPoll