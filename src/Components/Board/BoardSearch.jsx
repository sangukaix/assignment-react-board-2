function BoardSearch({ searchType, setSearchType, searchKeyword, setSearchKeyword, resetPage }) {
  const handleSearchSubmit = (event) => {
    event.preventDefault()
    resetPage()
  }

  return (
    <form className="board-search" onSubmit={handleSearchSubmit}>
      <select
        value={searchType}
        onChange={(event) => {
          setSearchType(event.target.value)
          resetPage()
        }}
      >
        <option value="titleContent">제목+내용</option>
        <option value="title">제목</option>
        <option value="writer">작성자</option>
      </select>

      <input
        type="text"
        value={searchKeyword}
        onChange={(event) => {
          setSearchKeyword(event.target.value)
          resetPage()
        }}
        placeholder="검색어"
      />

      <button type="submit">
        <span className="search-button-icon"></span>
        검색
      </button>
    </form>
  )
}

export default BoardSearch