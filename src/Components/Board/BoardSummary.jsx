function BoardSummary({ posts }) {
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)

  const summaryList = [
    { icon: '💬', label: '전체 게시글', value: posts.length, color: 'purple' },
    { icon: '👁', label: '오늘 조회수', value: totalViews, color: 'blue' },
    { icon: '☆', label: '즐겨찾기', value: 7, color: 'yellow' },
    { icon: '✎', label: '내가 작성한 글', value: 9, color: 'green' },
  ]

  return (
    <div className="board-summary">
      {summaryList.map((item) => (
        <div className="summary-item" key={item.label}>
          <span className={`summary-icon ${item.color}`}>{item.icon}</span>
          <span className="summary-label">{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default BoardSummary