function PostDetail({ post }) {
  const categoryName = post.boardType === 'free' ? '자유게시판' : post.category

  const isImageFile = (file) => {
    return file.type === 'image' || file.src?.startsWith('data:image')
  }

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
          <div className="post-file-list">
            {post.files.map((file) => (
              isImageFile(file) ? (
                <img key={file.name} src={file.src} alt={file.name} />
              ) : (
                <a key={file.name} href={file.src} download={file.name}>
                  📎 {file.name}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default PostDetail