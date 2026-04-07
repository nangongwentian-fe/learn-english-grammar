<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  question: string
  options: string
  answer: string
  hint?: string
}>()

type Status = 'idle' | 'correct' | 'wrong'

const selected = ref<number | null>(null)
const status = ref<Status>('idle')

const optionList = computed(() => props.options.split('|'))
const answerIndex = computed(() => props.answer.toUpperCase().charCodeAt(0) - 65)

function choose(index: number) {
  if (status.value !== 'idle') return
  selected.value = index
  status.value = index === answerIndex.value ? 'correct' : 'wrong'
}

function getLabel(index: number) {
  return String.fromCharCode(65 + index)
}

function getButtonClass(index: number) {
  if (status.value === 'idle') return 'mc-option'
  if (index === answerIndex.value) return 'mc-option mc-option--correct'
  if (index === selected.value) return 'mc-option mc-option--wrong'
  return 'mc-option mc-option--disabled'
}
</script>

<template>
  <div class="mc-card">
    <p class="mc-question">{{ question }}</p>

    <div class="mc-options">
      <button
        v-for="(opt, i) in optionList"
        :key="i"
        :class="getButtonClass(i)"
        :disabled="status !== 'idle'"
        @click="choose(i)"
      >
        <span class="mc-label">{{ getLabel(i) }}</span>
        {{ opt }}
      </button>
    </div>

    <div v-if="status === 'correct'" class="mc-feedback mc-feedback--correct">
      ✅ 正确！
      <p v-if="hint" class="mc-hint">💡 {{ hint }}</p>
    </div>

    <div v-if="status === 'wrong'" class="mc-feedback mc-feedback--wrong">
      ❌ 答案是 <strong>{{ answer }}</strong>：{{ optionList[answerIndex] }}
      <p v-if="hint" class="mc-hint">💡 {{ hint }}</p>
    </div>
  </div>
</template>

<style scoped>
.mc-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}

.mc-question {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.mc-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mc-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.mc-option:hover:not(:disabled) {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

.mc-option:disabled {
  cursor: default;
}

.mc-option--correct {
  background: rgba(52, 199, 89, 0.12);
  border-color: rgba(52, 199, 89, 0.5);
  color: var(--vp-c-text-1);
}

.mc-option--wrong {
  background: rgba(255, 80, 80, 0.1);
  border-color: rgba(255, 80, 80, 0.4);
  color: var(--vp-c-text-1);
}

.mc-option--disabled {
  opacity: 0.45;
}

.mc-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.mc-feedback {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.mc-feedback--correct {
  background: rgba(52, 199, 89, 0.1);
  color: #1a7a3a;
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.mc-feedback--wrong {
  background: rgba(255, 80, 80, 0.08);
  color: #c0392b;
  border: 1px solid rgba(255, 80, 80, 0.25);
}

.mc-hint {
  margin: 0.4rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: normal;
}
</style>
