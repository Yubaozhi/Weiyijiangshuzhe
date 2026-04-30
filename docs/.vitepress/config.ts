import { basename, resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { nav, sidebar, head } from './configs'
import { search as zhSearch } from './configs/zh_CN'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-Hans',
  title: '我的网站',
  description: '网站描述',

  head,

  lastUpdated: false,
  cleanUrls: true,

  // 站点地图
  sitemap: {
    hostname: 'https://example.com',
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    },
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
          return htmlResult;
      }
    },
  },

  /* 主题配置 */
  themeConfig: {
    logo: '/logo.png',
    siteTitle: '我的网站',
    nav,
    sidebar,

    editLink: {
      pattern: 'https://github.com/Yubaozhi/Weiyijiangshuzhe/edit/main/docs/:path',
      text: '编辑此页面'
    },

    outline: {
      level: 'deep',
      label: '页面导航',
    },


    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深浅模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    notFound: {
      code: '404',
      title: '不存在的页面',
      quote: '这里什么都没有，去别处看看吧。',
      linkText: '返回首页',
    },

    search: {
      provider: 'algolia',
      options: {
        appId: 'VTCVHVPS1J',
        apiKey: 'c3e9345ef8310ece1bb44e178fe36dbd',
        indexName: 'my-index',
        locales: {
          ...zhSearch,
        },
        askAi: {
          assistantId: '3Qom2fOfl9eY'
        },
      },
    },
  },

  vite: {
    plugins: [MarkdownPreview({ root: resolve(__dirname, '..') })],
    css: {
      preprocessorOptions: {
        scss: {}
      }
    }
  },
})