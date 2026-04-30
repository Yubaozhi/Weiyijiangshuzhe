export interface AnnouncementConfig {
  id: string
  title: string
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
  priority: number
  startTime?: string
  endTime?: string
  showIcon: boolean
  closable: boolean
  duration: number // 0 表示不自动关闭
  position: 'top' | 'bottom'
  target?: string[] // 指定显示的页面路径，空数组表示所有页面
}

export const announcements: AnnouncementConfig[] = [
  // 在此添加公告，示例：
  // {
  //   id: 'welcome',
  //   title: '欢迎',
  //   content: '欢迎来到本站！',
  //   type: 'info',
  //   priority: 100,
  //   showIcon: true,
  //   closable: true,
  //   duration: 5000,
  //   position: 'top',
  //   target: ['/']
  // },
]

export const globalConfig = {
  maxVisible: 3,
  spacing: 12,
  animationDuration: 400,
  enableSound: true,
  enableVibration: true,
  zIndex: 99999,
  enableKeyboard: true,
  showDelay: 500
}
