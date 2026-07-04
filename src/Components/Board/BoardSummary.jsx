function BoardSummary({ allPosts }) {
  const freePosts = allPosts.filter((post) => post.boardType === 'free')
  const totalViews = freePosts.reduce((sum, post) => sum + post.views, 0)
  const favoriteCount = allPosts.filter((post) => post.favorite).length
  const myPostCount = allPosts.filter((post) => post.mine).length

  const summaryList = [
    { icon: '💬', label: '전체 게시글', value: freePosts.length, color: 'purple' },
    { icon: '👁', label: '오늘 조회수', value: totalViews, color: 'blue' },
    { icon: '☆', label: '즐겨찾기', value: favoriteCount, color: 'yellow' },
    { icon: '✎', label: '내가 작성한 글', value: myPostCount, color: 'green' },
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