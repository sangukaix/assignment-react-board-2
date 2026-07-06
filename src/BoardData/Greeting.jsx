const today = new Date().toLocaleDateString('ko-KR', {
  month: '2-digit',
  day: '2-digit',
})

export const greetingPosts = [
  {
    id: 201,
    boardType: 'greeting',
    category: '가입인사',
    title: 'MBCA 학원 입학했습니다',
    writer: '새싹개발자',
    date: today,
    views: 15,
    isNew: false,
    reactions: { like: 1, laugh: 0, agree: 0, thanks: 0, wow: 0 },
    content: '502호 학생입니다 잘부탁드립니다~',
  },
  {
    id: 202,
    boardType: 'greeting',
    category: '가입인사',
    title: '오늘 가입했습니다.',
    writer: '프론트입문',
    date: today,
    views: 16,
    isNew: false,
    reactions: { like: 0, laugh: 1, agree: 0, thanks: 0, wow: 0 },
    content: '502호에서 공부하고 있는 현상욱 이라고 합니다 반갑습니다~',
  },
  {
    id: 203,
    boardType: 'greeting',
    category: '가입인사',
    title: 'MBCA 학생게시판 반갑습니다',
    writer: '디자인코더',
    date: today,
    views: 17,
    isNew: false,
    reactions: { like: 0, laugh: 0, agree: 1, thanks: 0, wow: 0 },
    content: '잘부탁드립니다~',
  },
]
