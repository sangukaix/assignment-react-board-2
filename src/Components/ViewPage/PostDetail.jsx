function PostDetail({ post }) {
  const categoryName = post.boardType === 'free' ? '자유게시판' : post.category

  return (
    <article className="post-detail">
      <div className="post-detail-head">
        <span className="post-category">{categoryName}</span>
        <h2>{post.title}</h2>

        <div className="post-meta">
          <span>글쓴이 {post.writer}</span>
          <span>날짜 {post.date}</span>
          <span>조회 {post.views}</span>
          <span>댓글 {post.comments}</span>
        </div>
      </div>

      <div className="post-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

        {post.files.length > 0 && (
          <div className="post-image-list">
            {post.files.map((file) => (
              <img key={file.name} src={file.src} alt={file.name} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default PostDetail
