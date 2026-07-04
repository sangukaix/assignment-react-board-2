function PostDetail({ post }) {
  return (
    <article className="post-detail">
      <div className="post-detail-head">
        <span className="post-category">{post.category}</span>
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
          <ul className="post-file-list">
            {post.files.map((file) => (
              <li key={file}>📎 {file}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default PostDetail