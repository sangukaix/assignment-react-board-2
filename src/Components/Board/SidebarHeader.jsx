function SidebarHeader() {
  const menuList = [
    'AI+X',
    'AI웹앱 디자인',
    'AI게임 메타버스',
    'AI모션영상',
    '자유게시판',
  ]

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <h1 className="site-logo">
          <span className="site-logo-mark">M</span>
          <span>MBCA 자유게시판</span>
        </h1>

        <nav className="site-nav">
          {menuList.map((menu) => (
            <span key={menu}>{menu}</span>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default SidebarHeader