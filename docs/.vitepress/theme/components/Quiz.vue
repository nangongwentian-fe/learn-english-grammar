<script setup lang="ts">
import { ref } from 'vue'

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
