import { useState } from 'react'

function BoardCategory() {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [voteCounts, setVoteCounts] = useState({
    developer: 4,
    pm: 2,
    designer: 3,
    marketer: 1,
  })
  const [isVoted, setIsVoted] = useState(false)

  const voteOptions = [
    { id: 'developer', icon: '💻', name: '개발자', color: 'notice' },
    { id: 'pm', icon: '📋', name: 'PM', color: 'question' },
    { id: 'designer', icon: '🎨', name: '웹디자이너', color: 'share' },
    { id: 'marketer', icon: '📣', name: '마케터', color: 'free' },
  ]

  const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0)

  const handleSelectOption = (optionId) => {
    if (isVoted) {
      return
    }

    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
      return
    }

    if (selectedOptions.length >= 2) {
      alert('최대 2개까지만 선택할 수 있습니다.')
      return
    }

    setSelectedOptions([...selectedOptions, optionId])
  }

  const handleVote = () => {
    if (selectedOptions.length === 0) {
      alert('투표할 항목을 선택해주세요.')
      return
    }

    const nextVoteCounts = { ...voteCounts }

    selectedOptions.forEach((optionId) => {
      nextVoteCounts[optionId] += 1
    })

    setVoteCounts(nextVoteCounts)
    setIsVoted(true)
  }

  return (
    <div className="poll-card">
      <div className="poll-title-row">
        <strong>
          <span className="poll-title-icon"></span>
          공식투표
        </strong>
        <span>진행중</span>
      </div>

      <h4>AI시대 최고 수혜자는?</h4>
      <p className="poll-info">복수 선택 가능 <span>(최대 2개)</span></p>

      <ul className="poll-list">
        {voteOptions.map((option) => {
          const count = voteCounts[option.id]
          const percent = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100)
          const isSelected = selectedOptions.includes(option.id)

          return (
            <li key={option.id}>
              <button
                type="button"
                className={isSelected ? 'poll-option selected' : 'poll-option'}
                onClick={() => handleSelectOption(option.id)}
              >
                <span className="poll-option-name">
                  {option.icon} {option.name}
                  <i className="poll-check-circle"></i>
                </span>
                <em>{percent}%</em>
              </button>

              <div className="poll-bar">
                <div
                  className={`poll-fill ${option.color}`}
                  style={{ width: `${percent}%` }}
                >
                  {count}표
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="poll-submit-button"
        onClick={handleVote}
        disabled={isVoted}
      >
        {isVoted ? '투표완료' : '투표하기'}
      </button>

      <div className="poll-bottom">
        <span>{totalVotes}명 참여</span>
        <span>26/9/30 종료</span>
      </div>
    </div>
  )
}

export default BoardCategory
