function BoardCategory(props) {
  const total = props.posts.length
  const noticeCount = props.posts.filter(post => post.category === '공지사항').length
  const questionCount = props.posts.filter(post => post.category === '질문').length
  const shareCount = props.posts.filter(post => post.category === '공유').length
  const freeCount = props.posts.filter(post => post.category === '자유').length

  const categories = [
    { icon: '📢', name: '공지사항', count: noticeCount, color: 'notice' },
    { icon: '💻', name: '질문 게시글', count: questionCount, color: 'question' },
    { icon: '🚀', name: '공유 게시글', count: shareCount, color: 'share' },
    { icon: '💬', name: '자유 게시글', count: freeCount, color: 'free' },
  ]

  return (
    <div className="poll-card">
      <div className="poll-title-row">
        <strong>투표</strong>
        <span>전체보기</span>
      </div>

      <h4>어떤 게시글을 가장 많이 보고 있나요?</h4>
      <p className="poll-info">복수 선택 가능 <span>(최대 3개)</span></p>

      <ul className="poll-list">
        {
          categories.map((category) => {
            const percent = total === 0 ? 0 : Math.round((category.count / total) * 100)

            return (
              <li key={category.name}>
                <div className="poll-item-top">
                  <span>{category.icon} {category.name}</span>
                  <em>{percent}%</em>
                </div>

                <div className="poll-bar">
                  <div
                    className={`poll-fill ${category.color}`}
                    style={{ width: `${percent}%` }}
                  >
                    {category.count}표
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>

      <button className="poll-cancel">투표 취소</button>

      <div className="poll-bottom">
        <span>{total}명 참여</span>
        <span>3주 후</span>
      </div>
    </div>
  )
}

export default BoardCategory