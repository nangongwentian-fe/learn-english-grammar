# Quiz 组件输入模式 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Quiz 组件中新增输入框，用户可输入答案并获得即时对错反馈，同时保留原有"查看答案"按钮。

**Architecture:** 纯组件内部状态修改，新增 `userInput`（输入值）和 `status`（`idle | correct | wrong | revealed`）两个 ref，通过计算答案匹配逻辑驱动 UI 状态切换。Props 接口不变，所有 .md 文件无需修改。

**Tech Stack:** Vue 3 Composition API, VitePress CSS 变量

---

## 文件结构

```
docs/.vitepress/theme/components/Quiz.vue   ← 唯一改动文件
```

---

## Task 1: 重写 Quiz.vue 支持输入模式

**Files:**
- Modify: `docs/.vitepress/theme/components/Quiz.vue`

- [ ] **Step 1: 用以下完整内容替换 Quiz.vue**

完整文件内容：

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  question: string
  answer: string
  hint?: string
}>()

type Status = 'idle' | 'correct' | 'wrong' | 'revealed'

const userInput = ref('')
const status = ref<Status>('idle')

const normalize = (s: string) => s.trim().toLowerCase()

function submit() {
  if (!userInput.value.trim()) return
  status.value = normalize(userInput.value) === normalize(props.answer)
    ? 'correct'
    : 'wrong'
}

function reveal() {
  status.value = 'revealed'
}

function reset() {
  userInput.value = ''
  status.value = 'idle'
}
</script>

<template>
  <div class="quiz-card">
    <p class="quiz-question">{{ question }}</p>

    <!-- 输入区域：答对或查看答案后禁用 -->
    <div class="quiz-input-row">
      <input
        v-model="userInput"
        class="quiz-input"
        :disabled="status === 'correct' || status === 'revealed'"
        placeholder="在此输入答案..."
        @keydown.enter="submit"
      />
      <button
        class="quiz-btn"
        :disabled="status === 'correct' || status === 'revealed'"
        @click="submit"
      >
        提交
      </button>
      <button class="quiz-btn quiz-btn--secondary" @click="reveal">
        查看答案
      </button>
    </div>

    <!-- 答对 -->
    <div v-if="status === 'correct'" class="quiz-feedback quiz-feedback--correct">
      ✅ 正确！
      <p v-if="hint" class="quiz-hint">💡 {{ hint }}</p>
    </div>

    <!-- 答错 -->
    <div v-if="status === 'wrong'" class="quiz-feedback quiz-feedback--wrong">
      ❌ 还差一点，再试试？
      <button class="quiz-retry-btn" @click="reset">重置</button>
    </div>

    <!-- 查看答案 -->
    <div v-if="status === 'revealed'" class="quiz-answer">
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

.quiz-input-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.quiz-input {
  flex: 1;
  min-width: 160px;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.quiz-input:focus {
  border-color: var(--vp-c-brand);
}

.quiz-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  white-space: nowrap;
}

.quiz-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.quiz-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quiz-btn--secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.quiz-btn--secondary:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}

.quiz-feedback {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.quiz-feedback--correct {
  background: rgba(52, 199, 89, 0.1);
  color: #1a7a3a;
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.quiz-feedback--wrong {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 80, 80, 0.08);
  color: #c0392b;
  border: 1px solid rgba(255, 80, 80, 0.25);
}

.quiz-retry-btn {
  background: none;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0.15rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: inherit;
}

.quiz-retry-btn:hover {
  background: rgba(255, 80, 80, 0.1);
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
  font-weight: normal;
}
</style>
```

- [ ] **Step 2: 验证构建无报错**

```bash
cd /Users/zhengwenjie/Documents/People/learn-english-gramma
bun run docs:build
```

Expected: 构建成功，无 error。

- [ ] **Step 3: 启动开发服务器手动验证**

```bash
bun run docs:dev
```

打开 `http://localhost:5173/01-tenses/01-present`，验证：
1. 输入正确答案 + 回车 → 显示 ✅ 正确！
2. 输入错误答案 + 点提交 → 显示 ❌ 还差一点，点"重置"可重新输入
3. 直接点"查看答案" → 显示答案和 hint
4. 答对后输入框禁用，"提交"按钮禁用
5. 大小写不影响判断（输入 "STUDIES" 也算正确）

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/theme/components/Quiz.vue
git commit -m "feat: add input mode to Quiz component with correct/wrong feedback"
```

---

## 自检

**Spec 覆盖：**
- ✅ 输入框 + 提交按钮 — Step 1
- ✅ 保留"查看答案"按钮 — Step 1
- ✅ 答对显示 ✅ + hint — Step 1 (status === 'correct')
- ✅ 答错显示 ❌ + 重置 — Step 1 (status === 'wrong')
- ✅ 不区分大小写 + trim — Step 1 (normalize 函数)
- ✅ Enter 提交 — Step 1 (@keydown.enter)
- ✅ Props 不变，.md 文件无需修改 — Step 1

**占位符检查：** 无
**类型一致性：** `Status` 类型在 script 定义，模板中 `status === 'correct'` 等使用一致
