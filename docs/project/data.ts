import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: '示例分类',
    items: [
      {
        icon: '/logo.png',
        title: '示例项目',
        desc: '在此填写项目描述',
        link: 'https://example.com/',
      },
    ],
  },
]
