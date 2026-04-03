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
  <div class="quiz-card" :class="{ 'quiz-card--correct': status === 'correct', 'quiz-card--wrong': status === 'wrong' }">
    <div class="quiz-badge">✏️ 练一练</div>
    <p class="quiz-question">{{ question }}</p>

    <div class="quiz-input-row">
      <input
        v-model="userInput"
        class="quiz-input"
        :disabled="status === 'correct' || status === 'revealed'"
        placeholder="在此输入答案..."
        @keydown.enter="submit"
      />
      <button
        class="quiz-btn quiz-btn--primary"
        :disabled="status === 'correct' || status === 'revealed'"
        @click="submit"
      >
        提交
      </button>
      <button class="quiz-btn quiz-btn--ghost" @click="reveal">
        查看答案
      </button>
    </div>

    <Transition name="feedback">
      <div v-if="status === 'correct'" class="quiz-feedback quiz-feedback--correct">
        <span class="feedback-icon">🎉</span>
        <div>
          <strong>正确！</strong>
          <p v-if="hint" class="quiz-hint">💡 {{ hint }}</p>
        </div>
      </div>
    </Transition>

    <Transition name="feedback">
      <div v-if="status === 'wrong'" class="quiz-feedback quiz-feedback--wrong">
        <span class="feedback-icon">🤔</span>
        <div>
          <strong>还差一点，再试试？</strong>
        </div>
        <button class="quiz-retry-btn" @click="reset">重试</button>
      </div>
    </Transition>

    <Transition name="feedback">
      <div v-if="status === 'revealed'" class="quiz-answer">
        <span class="answer-label">答案</span>
        <span class="answer-value">{{ answer }}</span>
        <p v-if="hint" class="quiz-hint">💡 {{ hint }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.quiz-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.25rem 1.5rem 1.1rem;
  margin: 1.25rem 0;
  background: var(--vp-c-bg-elv);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: border-color 0.4s, box-shadow 0.4s;
  overflow: hidden;
}

.quiz-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  opacity: 0.6;
  transition: opacity 0.3s;
}

.quiz-card:hover::before {
  opacity: 1;
}

.quiz-card--correct {
  border-color: rgba(39, 174, 96, 0.3);
  box-shadow: 0 4px 20px rgba(39, 174, 96, 0.1);
}

.quiz-card--correct::before {
  background: linear-gradient(90deg, #27ae60 0%, #2ecc71 100%);
  opacity: 1;
}

.quiz-card--wrong {
  border-color: rgba(231, 76, 60, 0.2);
}

.quiz-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.6rem;
  border-radius: 6px;
  margin-bottom: 0.65rem;
}

.quiz-question {
  margin: 0 0 0.85rem;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.6;
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
  padding: 0.5rem 0.85rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.quiz-input:focus {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.quiz-input:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.quiz-btn {
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.quiz-btn--primary {
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(13, 115, 119, 0.2);
}

.quiz-btn--primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(13, 115, 119, 0.3);
}

.quiz-btn--primary:active:not(:disabled) {
  transform: translateY(0);
}

.quiz-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.quiz-btn--ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.quiz-btn--ghost:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-light);
}

/* Feedback sections */
.quiz-feedback {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.85rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
}

.feedback-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  line-height: 1;
}

.quiz-feedback--correct {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%);
  border: 1px solid rgba(39, 174, 96, 0.2);
  color: #1a7a3a;
}

.dark .quiz-feedback--correct {
  color: #6bdfaa;
}

.quiz-feedback--wrong {
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.08) 0%, rgba(231, 76, 60, 0.03) 100%);
  border: 1px solid rgba(231, 76, 60, 0.18);
  color: #c0392b;
}

.dark .quiz-feedback--wrong {
  color: #f1948a;
}

.quiz-retry-btn {
  margin-left: auto;
  background: none;
  border: 1px solid currentColor;
  border-radius: 8px;
  padding: 0.2rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
  transition: background 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  align-self: center;
}

.quiz-retry-btn:hover {
  background: rgba(231, 76, 60, 0.08);
}

.quiz-answer {
  margin-top: 0.85rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  border: 1px solid rgba(13, 115, 119, 0.15);
}

.answer-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  letter-spacing: 0.03em;
  margin-right: 0.5rem;
}

.answer-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-brand-dark);
}

.dark .answer-value {
  color: var(--vp-c-brand-light);
}

.quiz-hint {
  margin: 0.4rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  font-weight: normal;
  line-height: 1.5;
}

/* Transition animation */
.feedback-enter-active {
  animation: feedbackIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes feedbackIn {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
