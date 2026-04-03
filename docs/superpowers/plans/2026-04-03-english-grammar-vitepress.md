# 中文友好雅思英语语法电子书 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用 VitePress 搭建一本中英双语英语语法电子书，9大语法模块，含交互式练习题，部署到 Vercel。

**Architecture:** VitePress 默认主题 + 自定义 CSS + 全局注册的 `Quiz.vue` Vue 组件。内容按9大模块组织为 Markdown 文件，每个模块有独立目录。侧边栏在 `config.ts` 中静态配置。

**Tech Stack:** VitePress 1.x, Vue 3（内置）, Bun 1.x, Vercel

---

## 文件结构

```
learn-english-gramma/
├── .vitepress/
│   ├── config.ts                          # 站点配置：侧边栏、导航、搜索、中文i18n
│   └── theme/
│       ├── index.ts                       # 主题入口：注册 Quiz 组件
│       ├── style.css                      # 自定义样式
│       └── components/
│           └── Quiz.vue                   # 练习题组件
├── docs/
│   ├── index.md                           # 首页
│   ├── 01-tenses/
│   │   ├── index.md                       # 时态模块简介
│   │   ├── 01-present.md                  # 现在时（示例内容页）
│   │   ├── 02-past.md                     # 过去时（示例内容页）
│   │   └── 03-future.md                   # 将来时（示例内容页）
│   ├── 02-modals/index.md                 # 情态动词（占位）
│   ├── 03-conditionals/index.md           # 条件句（占位）
│   ├── 04-passive/index.md                # 被动语态（占位）
│   ├── 05-non-finite/index.md             # 非谓语动词（占位）
│   ├── 06-clauses/index.md                # 从句（占位）
│   ├── 07-articles/index.md               # 冠词与名词（占位）
│   ├── 08-prepositions/index.md           # 介词与搭配（占位）
│   └── 09-sentence-structure/index.md    # 句子结构（占位）
├── package.json
└── vercel.json
```

---

## Task 1: 初始化项目

**Files:**
- Create: `package.json`
- Create: `vercel.json`
- Create: `.gitignore`

- [ ] **Step 1: 初始化 bun 项目并安装 VitePress**

```bash
cd /Users/zhengwenjie/Documents/People/learn-english-gramma
bun init -y
bun add -d vitepress
```

- [ ] **Step 2: 验证 VitePress 已安装**

```bash
bunx vitepress --version
```

Expected output: `1.x.x`（版本号，只要不报错即可）

- [ ] **Step 3: 更新 package.json 添加 scripts**

将 `package.json` 改为：

```json
{
  "name": "learn-english-gramma",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.6.3"
  }
}
```

> 注意：`devDependencies` 中的版本号以实际安装版本为准，不要手动修改。

- [ ] **Step 4: 创建 vercel.json**

```json
{
  "buildCommand": "bun run docs:build",
  "outputDirectory": "docs/.vitepress/dist",
  "framework": null
}
```

- [ ] **Step 5: 创建 .gitignore**

```
node_modules
docs/.vitepress/dist
docs/.vitepress/cache
.DS_Store
bun.lock
```

- [ ] **Step 6: 验证目录结构**

```bash
ls -la
```

Expected: 看到 `package.json`, `vercel.json`, `.gitignore`, `node_modules/`, `docs/`（docs 是之前已有的）

- [ ] **Step 7: Commit**

```bash
git add package.json vercel.json .gitignore bun.lockb
git commit -m "feat: initialize VitePress project with Bun"
```

---

## Task 2: 配置 VitePress（config.ts）

**Files:**
- Create: `.vitepress/config.ts`

- [ ] **Step 1: 创建 `.vitepress/config.ts`**

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '英语语法手册',
  description: '中英双语英语语法书，专为雅思备考设计',
  srcDir: 'docs',

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
```

- [ ] **Step 2: Commit**

```bash
git add .vitepress/config.ts
git commit -m "feat: add VitePress config with sidebar and Chinese i18n"
```

---

## Task 3: 创建自定义主题和 Quiz 组件

**Files:**
- Create: `.vitepress/theme/index.ts`
- Create: `.vitepress/theme/style.css`
- Create: `.vitepress/theme/components/Quiz.vue`

- [ ] **Step 1: 创建主题入口 `.vitepress/theme/index.ts`**

```typescript
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Quiz from './components/Quiz.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
  },
} satisfies Theme
```

- [ ] **Step 2: 创建 `.vitepress/theme/style.css`**

```css
/* 中英双语排版：英文规则用 blockquote 样式区分 */
.vp-doc .en-rule {
  font-style: italic;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
  padding-left: 1rem;
  margin: 0.5rem 0;
}

/* 错误示例红色，正确示例绿色 */
.vp-doc .example-wrong {
  background-color: rgba(255, 80, 80, 0.08);
  border-left: 3px solid #f56c6c;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin: 0.25rem 0;
}

.vp-doc .example-right {
  background-color: rgba(52, 199, 89, 0.08);
  border-left: 3px solid #34c759;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin: 0.25rem 0;
}

/* 雅思应用模块背景 */
.vp-doc .ielts-tip {
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-light);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
}

.vp-doc .ielts-tip::before {
  content: '🎯 雅思应用';
  display: block;
  font-weight: 600;
  color: var(--vp-c-brand-dark);
  margin-bottom: 0.5rem;
}
```

- [ ] **Step 3: 创建 `.vitepress/theme/components/Quiz.vue`**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  question: string
  answer: string
  hint?: string
}>()

const revealed = ref(false)
</script>

<template>
  <div class="quiz-card">
    <p class="quiz-question">{{ question }}</p>
    <button class="quiz-btn" @click="revealed = !revealed">
      {{ revealed ? '隐藏答案' : '查看答案' }}
    </button>
    <div v-if="revealed" class="quiz-answer">
      <span class="answer-label">答案：</span>
      <strong>{{ answer }}</strong>
      <p v-if="hint" class="quiz-hint">💡 {{ hint }}</p>
    </div>
  </div>
</template>

<style scoped>
.quiz-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}

.quiz-question {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.quiz-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.quiz-btn:hover {
  background: var(--vp-c-brand-dark);
}

.quiz-answer {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.answer-label {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.quiz-hint {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}
</style>
```

- [ ] **Step 4: Commit**

```bash
git add .vitepress/theme/
git commit -m "feat: add custom theme with Quiz component and bilingual styles"
```

---

## Task 4: 创建首页和文档骨架

**Files:**
- Create: `docs/index.md`
- Create: `docs/01-tenses/index.md`
- Create: `docs/01-tenses/01-present.md`
- Create: `docs/01-tenses/02-past.md`
- Create: `docs/01-tenses/03-future.md`
- Create: `docs/02-modals/index.md` 到 `docs/09-sentence-structure/index.md`（8个占位文件）

- [ ] **Step 1: 创建 `docs/index.md`（首页）**

```markdown
---
layout: home

hero:
  name: "英语语法手册"
  text: "中英双语，专为雅思备考"
  tagline: 系统学习英语语法，提升雅思写作和口语得分
  actions:
    - theme: brand
      text: 开始学习
      link: /01-tenses/
    - theme: alt
      text: 查看目录
      link: /01-tenses/01-present

features:
  - icon: 📖
    title: 中英双语讲解
    details: 每个语法点提供英文规则和中文解释，降低理解难度
  - icon: 🎯
    title: 雅思导向
    details: 每章节含"雅思应用"模块，直接对应考试评分标准
  - icon: ✏️
    title: 交互式练习
    details: 点击查看答案的练习题，帮助巩固记忆
  - icon: 🔍
    title: 全文搜索
    details: 快速找到任意语法点，随查随用
---
```

- [ ] **Step 2: 创建 `docs/01-tenses/index.md`（时态模块简介）**

```markdown
# 一、时态 Tenses

时态（Tense）是英语语法的核心，表示动作发生的时间。英语有多种时态，雅思考试特别关注以下几类：

## 本模块包含

| 章节 | 内容 |
|------|------|
| [现在时](./01-present) | 一般现在时 / 现在进行时 / 现在完成时 / 现在完成进行时 |
| [过去时](./02-past) | 一般过去时 / 过去进行时 / 过去完成时 |
| [将来时](./03-future) | will / going to / 现在进行时表将来 / 将来完成时 |

## 雅思考试中的时态

- **写作 Task 1**（图表题）：大量使用过去时（描述历史数据）和将来时（预测趋势）
- **写作 Task 2**（议论文）：以一般现在时为主，举例时用过去时
- **口语 Part 2**（个人陈述）：混合使用各种时态，体现语法灵活性
```

- [ ] **Step 3: 创建 `docs/01-tenses/01-present.md`（现在时 — 完整示例内容页）**

```markdown
# 现在时 Present Tenses

## 1. 一般现在时 Simple Present

**规则（Rule）**

> Use the simple present for habits, facts, and general truths.
> 用一般现在时表示习惯性动作、客观事实和普遍真理。

**构成：** 主语 + 动词原形（第三人称单数加 -s/-es）

**例句对比**

<div class="example-wrong">❌ She go to school every day.</div>
<div class="example-right">✅ She <strong>goes</strong> to school every day.（第三人称单数须加 -s）</div>

<div class="example-wrong">❌ Water freeze at 0°C.</div>
<div class="example-right">✅ Water <strong>freezes</strong> at 0°C.（客观事实）</div>

<div class="ielts-tip">

在雅思写作 Task 2 中，表达普遍观点时使用一般现在时：
*"Many people **believe** that technology **has** changed the way we communicate."*

</div>

### 练习题

<Quiz
  question="He ___ (study) English every morning."
  answer="studies"
  hint="第三人称单数，study → studies（辅音 + y，变 ies）"
/>

<Quiz
  question="The sun ___ (rise) in the east."
  answer="rises"
  hint="客观事实，用一般现在时；rise + s = rises"
/>

---

## 2. 现在进行时 Present Continuous

**规则（Rule）**

> Use the present continuous for actions happening right now or around this time.
> 用现在进行时表示正在发生的动作，或当前阶段持续的动作。

**构成：** am/is/are + 动词 -ing

**例句对比**

<div class="example-wrong">❌ She is study for her IELTS exam this week.</div>
<div class="example-right">✅ She <strong>is studying</strong> for her IELTS exam this week.</div>

<div class="ielts-tip">

现在进行时可用于口语 Part 1 描述当前生活状态：
*"I **am preparing** for the IELTS exam at the moment."*

</div>

### 练习题

<Quiz
  question="Listen! The birds ___ (sing)."
  answer="are singing"
  hint="Listen 提示此刻正在发生，用现在进行时：are + singing"
/>

---

## 3. 现在完成时 Present Perfect

**规则（Rule）**

> Use the present perfect for actions that happened at an unspecified time before now, or that started in the past and continue to the present.
> 用现在完成时表示过去某时发生且与现在有关联的动作，或从过去延续至今的动作。

**构成：** have/has + 过去分词

**关键词：** already, yet, just, ever, never, since, for, recently

**例句对比**

<div class="example-wrong">❌ I already finished my homework.</div>
<div class="example-right">✅ I <strong>have already finished</strong> my homework.</div>

<div class="example-wrong">❌ She lives here since 2020.</div>
<div class="example-right">✅ She <strong>has lived</strong> here since 2020.（since 引导时间点，用现在完成时）</div>

<div class="ielts-tip">

雅思写作 Task 2 引言段常用现在完成时描述背景：
*"In recent years, the internet **has transformed** the way people access information."*

</div>

### 练习题

<Quiz
  question="I ___ (never / try) sushi before."
  answer="have never tried"
  hint="never 与现在完成时搭配：have + never + 过去分词"
/>

<Quiz
  question="She ___ (live) in Beijing for ten years."
  answer="has lived"
  hint="for + 时间段，表示延续至今，用现在完成时"
/>
```

- [ ] **Step 4: 创建 `docs/01-tenses/02-past.md`（过去时 — 简版）**

```markdown
# 过去时 Past Tenses

## 1. 一般过去时 Simple Past

**规则（Rule）**

> Use the simple past for completed actions at a specific time in the past.
> 用一般过去时表示过去某一特定时间完成的动作。

**构成：** 动词过去式（规则动词加 -ed，不规则动词须记忆）

**关键词：** yesterday, last week, in 2020, ago, when...

**例句对比**

<div class="example-wrong">❌ She go to London last year.</div>
<div class="example-right">✅ She <strong>went</strong> to London last year.</div>

<div class="ielts-tip">

雅思写作 Task 1 描述过去数据时大量使用一般过去时：
*"The number of students **increased** significantly in 2015."*

</div>

### 练习题

<Quiz
  question="They ___ (finish) the project last Monday."
  answer="finished"
  hint="last Monday 是过去具体时间，用一般过去时：finish + ed"
/>

---

## 2. 过去进行时 Past Continuous

**规则（Rule）**

> Use the past continuous for an action that was in progress at a specific moment in the past, often interrupted by another action.
> 用过去进行时表示过去某一时刻正在进行的动作，常被另一动作打断。

**构成：** was/were + 动词 -ing

**例句对比**

<div class="example-wrong">❌ I studied when she called.</div>
<div class="example-right">✅ I <strong>was studying</strong> when she called.（when 引导的打断动作）</div>

### 练习题

<Quiz
  question="We ___ (have) dinner when the phone rang."
  answer="were having"
  hint="过去某时刻正在进行：were + having；rang 是打断动作用过去式"
/>

---

## 3. 过去完成时 Past Perfect

**规则（Rule）**

> Use the past perfect for an action completed before another past action.
> 用过去完成时表示在另一过去动作之前已完成的动作（"过去的过去"）。

**构成：** had + 过去分词

**例句对比**

<div class="example-wrong">❌ She told me that she finished the report.</div>
<div class="example-right">✅ She told me that she <strong>had finished</strong> the report.（报告在"告诉"之前完成）</div>

<div class="ielts-tip">

雅思写作 Task 1 描述先后顺序时用过去完成时：
*"By 2010, the population **had already reached** 5 million."*

</div>

### 练习题

<Quiz
  question="By the time I arrived, the movie ___ (already / start)."
  answer="had already started"
  hint="by the time 引导，电影开始在我到达之前：had + already + started"
/>
```

- [ ] **Step 5: 创建 `docs/01-tenses/03-future.md`（将来时 — 简版）**

```markdown
# 将来时 Future Tenses

## 1. will

**规则（Rule）**

> Use "will" for predictions, spontaneous decisions, and promises.
> will 用于预测、临时决定和承诺。

**构成：** will + 动词原形

**例句对比**

<div class="example-wrong">❌ I will to call you later.</div>
<div class="example-right">✅ I <strong>will call</strong> you later.（will 后接动词原形，不加 to）</div>

<div class="ielts-tip">

雅思写作 Task 2 预测未来趋势：
*"It is likely that renewable energy **will replace** fossil fuels in the coming decades."*

</div>

### 练习题

<Quiz
  question="Don't worry, I ___ (help) you with that."
  answer="will help"
  hint="临时决定用 will：will + 动词原形"
/>

---

## 2. be going to

**规则（Rule）**

> Use "be going to" for plans and intentions, or for predictions based on present evidence.
> be going to 用于计划好的意图，或基于现有证据的预测。

**构成：** am/is/are going to + 动词原形

**例句对比**

<div class="example-wrong">❌ She will going to study abroad next year.</div>
<div class="example-right">✅ She <strong>is going to study</strong> abroad next year.（已有计划）</div>

### 练习题

<Quiz
  question="Look at those clouds. It ___ (rain)."
  answer="is going to rain"
  hint="基于现有证据（乌云）的预测，用 be going to：is going to + rain"
/>

---

## 3. 将来完成时 Future Perfect

**规则（Rule）**

> Use the future perfect for actions that will be completed before a specific future time.
> 将来完成时表示在将来某时间点之前已经完成的动作。

**构成：** will have + 过去分词

**例句对比**

<div class="example-right">✅ By next June, I <strong>will have finished</strong> all my IELTS preparation.</div>

<div class="ielts-tip">

雅思写作 Task 1 预测数据时：
*"By 2050, the global temperature **will have risen** by 2 degrees."*

</div>

### 练习题

<Quiz
  question="By the time you arrive, I ___ (finish) cooking."
  answer="will have finished"
  hint="by the time 引导将来时间点，动作在其前完成：will have + finished"
/>
```

- [ ] **Step 6: 创建剩余8个模块的占位 index.md**

`docs/02-modals/index.md`:
```markdown
# 二、情态动词 Modal Verbs

> 本章节内容正在建设中...

情态动词用于表达可能性、能力、义务和建议，是雅思写作中展示语法多样性的重要工具。

## 本模块将包含

- 可能性：can / could / may / might
- 义务与建议：must / have to / should / ought to
- 虚拟与假设：would / used to
```

`docs/03-conditionals/index.md`:
```markdown
# 三、条件句 Conditionals

> 本章节内容正在建设中...

条件句是雅思写作 Task 2 的高分语法，能有效展示假设推理能力。

## 本模块将包含

- 零条件句 / 第一条件句
- 第二条件句 / 第三条件句
- 混合条件句 / 倒装条件句（雅思高分句型）
```

`docs/04-passive/index.md`:
```markdown
# 四、被动语态 Passive Voice

> 本章节内容正在建设中...

被动语态在雅思学术写作中极为常见，尤其是 Task 1 描述流程图时。

## 本模块将包含

- 各时态的被动形式
- 被动 vs 主动的选择
- 雅思学术写作中的被动语态
```

`docs/05-non-finite/index.md`:
```markdown
# 五、非谓语动词 Non-finite Verbs

> 本章节内容正在建设中...

## 本模块将包含

- 不定式 to do
- 动名词 doing
- 分词短语 done / doing（雅思写作中的用法）
```

`docs/06-clauses/index.md`:
```markdown
# 六、从句 Clauses

> 本章节内容正在建设中...

从句是体现句子复杂度的核心，雅思写作评分标准中的"语法多样性"主要靠从句实现。

## 本模块将包含

- 定语从句（限制性 / 非限制性）
- 名词性从句
- 状语从句（时间 / 原因 / 结果 / 让步 / 目的）
```

`docs/07-articles/index.md`:
```markdown
# 七、冠词与名词 Articles & Nouns

> 本章节内容正在建设中...

冠词是中国学习者最容易出错的语法点之一。

## 本模块将包含

- a / an / the 的用法
- 可数与不可数名词
- 零冠词
```

`docs/08-prepositions/index.md`:
```markdown
# 八、介词与搭配 Prepositions & Collocations

> 本章节内容正在建设中...

## 本模块将包含

- 时间介词 at / on / in
- 地点介词
- 常见动词/形容词 + 介词搭配
```

`docs/09-sentence-structure/index.md`:
```markdown
# 九、句子结构 Sentence Structure

> 本章节内容正在建设中...

高级句型是雅思写作 7 分以上的必备技能。

## 本模块将包含

- 简单句 / 并列句 / 复合句
- 倒装句（雅思写作加分）
- 强调句 It is... that...
```

- [ ] **Step 7: 验证本地开发服务器可以启动**

```bash
bun run docs:dev
```

Expected: 终端显示 `VitePress dev server running at http://localhost:5173/`，浏览器打开确认首页和侧边栏正常显示，Quiz 组件在 `/01-tenses/01-present` 页面可点击。

- [ ] **Step 8: Commit**

```bash
git add docs/
git commit -m "feat: add homepage, tenses module with full content, and placeholder modules"
```

---

## Task 5: 构建验证 & Vercel 部署准备

**Files:**
- 无新文件，验证已有配置

- [ ] **Step 1: 本地构建验证**

```bash
bun run docs:build
```

Expected: 构建成功，输出类似：
```
build complete in X.XXs
```
无报错即可。如有报错，检查 Markdown 语法和组件引用。

- [ ] **Step 2: 本地预览构建结果**

```bash
bun run docs:preview
```

Expected: 浏览器打开预览，功能与开发服务器一致。

- [ ] **Step 3: 推送到 GitHub（用户手动操作）**

在 GitHub 上创建新仓库 `learn-english-gramma`，然后：

```bash
git remote add origin https://github.com/<你的用户名>/learn-english-gramma.git
git push -u origin main
```

- [ ] **Step 4: Vercel 部署（用户手动操作）**

1. 登录 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 导入 GitHub 仓库 `learn-english-gramma`
4. Vercel 自动读取 `vercel.json` 配置，直接点击 "Deploy"
5. 部署完成后获得 `https://learn-english-gramma-xxxx.vercel.app` 链接

- [ ] **Step 5: 最终 Commit**

```bash
git add .
git commit -m "feat: complete initial VitePress grammar book setup"
```

---

## 自检（Self-Review）

**Spec 覆盖检查：**
- ✅ VitePress + Bun — Task 1
- ✅ 中英双语样式 — Task 3 (style.css)
- ✅ 9大模块章节结构 — Task 4
- ✅ Quiz 组件（点击展开答案）— Task 3
- ✅ 规则讲解 + 例句对比 + 雅思应用 + 练习题 — Task 4 (01-present.md)
- ✅ Vercel 部署 — Task 1 (vercel.json) + Task 5
- ✅ 侧边栏搜索 — Task 2 (config.ts)

**占位符检查：** 无 TBD / TODO（占位模块明确标注"建设中"，是内容策略而非计划缺失）

**类型一致性：** Quiz 组件 props（`question`, `answer`, `hint`）在 Task 3 定义，在 Task 4 所有 .md 文件中使用一致。
