const today = new Date().toLocaleDateString('ko-KR', {
  month: '2-digit',
  day: '2-digit',
})

export const resourcePosts = [
  {
    id: 105,
    boardType: 'resource',
    category: '자료',
    title: '제가 만든 cpu,gpu 온도계 입니다',
    writer: '나',
    date: today,
    views: 15,
    isNew: true,
    reactions: { like: 0, laugh: 0, agree: 0, thanks: 0, wow: 0 },
    content: '헤비한 work할때 사용하시면 유용합니다. (gpu없는 노트북에서는 gpu 온도계는 작동하지 않습니다)',
    files: [
      {
        name: 'cpu-gpu-temperature.exe',
        src: '/downloads/cpu-gpu-temperature.exe',
        type: 'file',
      },
    ],
  },
]