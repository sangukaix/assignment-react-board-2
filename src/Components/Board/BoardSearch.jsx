function BoardSearch() {
  return (
    <div className="board-search">
      <select>
        <option>제목+내용</option>
        <option>제목</option>
        <option>작성자</option>
      </select>

      <input type="text" placeholder="검색어" />

      <button type="button">
        <span className="search-button-icon"></span>
        검색
      </button>
    </div>
  )
}

export default BoardSearch
