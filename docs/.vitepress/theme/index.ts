import { h, watch } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createMediumZoomProvider } from './composables/useMediumZoom'
import MLayout from './components/MLayout.vue'
import MNavLinks from './components/MNavLinks.vue'
import './styles/index.scss'
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'
import confetti from "./components/confetti.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'
import { install as installAnnouncementPlugin } from './plugins/announcement'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,

  setup() {
  },

  Layout: () => {
    const props: Record<string, any> = {}
    const { frontmatter } = useData()

    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(MLayout, props)
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    createMediumZoomProvider(app, router)
    app.component('confetti' , confetti)
    app.provide('DEV', process.env.NODE_ENV === 'development')
    vitepressMusic(playlist)
    app.component('MNavLinks', MNavLinks)
    app.component('ArticleMetadata' , ArticleMetadata)
    installAnnouncementPlugin(app)

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () =>
          updateHomePageStyle(
            location.pathname === '/' || location.pathname === '/vitepress-nav-template/',
          ),
        { immediate: true },
      )
    }
    if (typeof window !== 'undefined') {
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onAfterRouteChanged = () => {
        NProgress.done()
      }
    }
  },
}

if (typeof window !== 'undefined') {
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome')
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox')
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari')
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

const playlist = [
  {
    name: '天天天国地獄国',
    author: 'ななひら & P丸様。',
    file: '/music/天天天国地獄国.mp3',
  },
  {
    name: 'Otherside',
    author: 'Mojang',
    file: '/music/otherside.mp3',
  },
  {
    name: 'maimai DX CiRCLE',
    author: 'SEGA',
    file: '/music/maimai_dx_circle.mp3',
  }
]
