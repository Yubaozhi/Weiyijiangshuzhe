export interface MinecraftServer {
  id: string
  name: string
  type: string
  version: string
  icon: string | {
    src: string
    alt?: string
    width?: number
    height?: number
  }
  description: string
  link: string
  ip?: string
}

export const serverTypes = ['生存', '生电', '创造', '模组', '小游戏', '群组服', '无政府']
export const serverVersions = ['中国版', '互通', '基岩版', '1.21.X', '1.21.4', '1.21.1', '1.20.4', '1.20.1', '1.18.2', '1.16.5']

export const servers: MinecraftServer[] = [
  // 在此添加服务器数据，示例：
  // {
  //   id: '1',
  //   name: '示例服务器',
  //   type: '生存',
  //   version: '1.21.1',
  //   icon: '/server_icons/example.png',
  //   description: '服务器简介',
  //   link: 'https://example.com',
  //   ip: 'example.com'
  // },
]
