import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '英语语法手册',
  description: '中英双语英语语法书，专为雅思备考设计',

  themeConfig: {
    logo: null,
    siteTitle: '英语语法手册',

    nav: [
      { text: '首页', link: '/' },
      { text: '开始学习', link: '/01-tenses/' },
    ],

    sidebar: [
      {
        text: '一、时态 Tenses',
        collapsed: false,
        items: [
          { text: '模块简介', link: '/01-tenses/' },
          { text: '现在时', link: '/01-tenses/01-present' },
          { text: '过去时', link: '/01-tenses/02-past' },
          { text: '将来时', link: '/01-tenses/03-future' },
        ],
      },
      {
        text: '二、情态动词 Modal Verbs',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/02-modals/' },
        ],
      },
      {
        text: '三、条件句 Conditionals',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/03-conditionals/' },
        ],
      },
      {
        text: '四、被动语态 Passive Voice',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/04-passive/' },
        ],
      },
      {
        text: '五、非谓语动词 Non-finite Verbs',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/05-non-finite/' },
        ],
      },
      {
        text: '六、从句 Clauses',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/06-clauses/' },
        ],
      },
      {
        text: '七、冠词与名词 Articles & Nouns',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/07-articles/' },
        ],
      },
      {
        text: '八、介词与搭配 Prepositions',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/08-prepositions/' },
        ],
      },
      {
        text: '九、句子结构 Sentence Structure',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/09-sentence-structure/' },
        ],
      },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    lastUpdated: {
      text: '最后更新',
    },
  },
})
