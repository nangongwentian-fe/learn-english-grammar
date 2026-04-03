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
