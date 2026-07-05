const today = new Date().toLocaleDateString('ko-KR', {
  month: '2-digit',
  day: '2-digit',
})

export const greetingPosts = [
  {
    id: 201,
    boardType: 'greeting',
    category: '가입인사',
    title: '안녕하세요. React 공부 시작했습니다.',
    writer: '새싹개발자',
    date: today,
    views: 12,
    isNew: false,
    reactions: { like: 1, laugh: 0, agree: 0, thanks: 0, wow: 0 },
    content: '게시판 과제를 하면서 React 흐름을 익혀보려고 합니다.',
  },
  {
    id: 202,
    boardType: 'greeting',
    category: '가입인사',
    title: '처음 가입했습니다. 잘 부탁드립니다.',
    writer: '프론트입문',
    date: today,
    views: 18,
    isNew: false,
    reactions: { like: 0, laugh: 1, agree: 0, thanks: 0, wow: 0 },
    content: '컴포넌트 분리와 Router 사용법을 연습하고 있습니다.',
  },
  {
    id: 203,
    boardType: 'greeting',
    category: '가입인사',
    title: 'MBCA 학생게시판 반갑습니다.',
    writer: '디자인코더',
    date: today,
    views: 25,
    isNew: false,
    reactions: { like: 0, laugh: 0, agree: 1, thanks: 0, wow: 0 },
    content: 'AI 웹앱 디자인과 React를 같이 공부하고 있습니다.',
  },
]
