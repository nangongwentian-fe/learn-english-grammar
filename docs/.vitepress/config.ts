import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: '英语语法手册',
  description: '中英双语英语语法书，专为雅思备考设计',

  themeConfig: {
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
          { text: '能力与许可', link: '/02-modals/01-ability-permission' },
          { text: '义务与建议', link: '/02-modals/02-obligation-advice' },
          { text: '可能性与推测', link: '/02-modals/03-possibility' },
          { text: '过去习惯', link: '/02-modals/04-would-used-to' },
        ],
      },
      {
        text: '三、条件句 Conditionals',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/03-conditionals/' },
          { text: '零条件句与第一条件句', link: '/03-conditionals/01-zero-first' },
          { text: '第二条件句', link: '/03-conditionals/02-second' },
          { text: '第三条件句与混合条件句', link: '/03-conditionals/03-third-mixed' },
        ],
      },
      {
        text: '四、被动语态 Passive Voice',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/04-passive/' },
          { text: '基本被动语态', link: '/04-passive/01-basic-passive' },
          { text: '进阶被动语态', link: '/04-passive/02-advanced-passive' },
        ],
      },
      {
        text: '五、非谓语动词 Non-finite Verbs',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/05-non-finite/' },
          { text: '不定式 Infinitive', link: '/05-non-finite/01-infinitive' },
          { text: '动名词 Gerund', link: '/05-non-finite/02-gerund' },
          { text: '分词 Participles', link: '/05-non-finite/03-participle' },
        ],
      },
      {
        text: '六、从句 Clauses',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/06-clauses/' },
          { text: '名词性从句', link: '/06-clauses/01-noun-clauses' },
          { text: '定语从句', link: '/06-clauses/02-relative-clauses' },
          { text: '状语从句', link: '/06-clauses/03-adverbial-clauses' },
        ],
      },
      {
        text: '七、冠词与名词 Articles & Nouns',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/07-articles/' },
          { text: '冠词 Articles', link: '/07-articles/01-articles' },
          { text: '可数与不可数名词', link: '/07-articles/02-countable-uncountable' },
          { text: '数量词 Quantifiers', link: '/07-articles/03-quantifiers' },
        ],
      },
      {
        text: '八、介词与搭配 Prepositions',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/08-prepositions/' },
          { text: '时间与地点介词', link: '/08-prepositions/01-time-place' },
          { text: '常见介词搭配', link: '/08-prepositions/02-common-collocations' },
        ],
      },
      {
        text: '九、句子结构 Sentence Structure',
        collapsed: true,
        items: [
          { text: '模块简介', link: '/09-sentence-structure/' },
          { text: '五大基本句型', link: '/09-sentence-structure/01-basic-patterns' },
          { text: '并列句与复合句', link: '/09-sentence-structure/02-compound-complex' },
          { text: '常见句式错误', link: '/09-sentence-structure/03-common-errors' },
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
}))
