<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  sentence: string
  answer: string
  hint?: string
}>()

type TokenStatus = 'idle' | 'correct' | 'wrong'

interface Token {
  text: string
  clickable: boolean
  status: TokenStatus
}

const tokens = ref<Token[]>(parseTokens())
const solved = ref(false)
const shakeTarget = ref<number | null>(null)

function parseTokens(): Token[] {
  const result: Token[] = []
  const regex = /\[([^\]]+)\]/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(props.sentence)) !== null) {
    if (match.index > lastIndex) {
      result.push({ text: props.sentence.slice(lastIndex, match.index), clickable: false, status: 'idle' })
    }
    result.push({ text: match[1], clickable: true, status: 'idle' })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < props.sentence.length) {
    result.push({ text: props.sentence.slice(lastIndex), clickable: false, status: 'idle' })
  }

  return result
}

function click(index: number) {
  if (solved.value) return
  const token = tokens.value[index]
  if (!token.clickable) return

  if (token.text === props.answer) {
    token.status = 'correct'
    solved.value = true
  } else {
    token.status = 'wrong'
    shakeTarget.value = index
    setTimeout(() => {
      token.status = 'idle'
      shakeTarget.value = null
    }, 600)
  }
}

function getSpanClass(token: Token, index: number) {
  const classes = ['es-word']
  if (token.status === 'correct') classes.push('es-word--correct')
  if (token.status === 'wrong') classes.push('es-word--wrong')
  if (shakeTarget.value === index) classes.push('es-word--shake')
  return classes.join(' ')
}
</script>

<template>
  <div class="es-card">
    <p class="es-label">找出句子中的语法错误，点击它：</p>
    <p class="es-sentence">
      <template v-for="(token, i) in tokens" :key="i">
        <span
          v-if="token.clickable"
          :class="getSpanClass(token, i)"
          @click="click(i)"
        >{{ token.text }}</span>
        <span v-else>{{ token.text }}</span>
      </template>
    </p>

    <div v-if="solved" class="es-feedback es-feedback--correct">
      ✅ 找到了！<strong>{{ answer }}</strong> 是错误的用法。
      <p v-if="hint" class="es-hint">💡 {{ hint }}</p>
    </div>
    <p v-else class="es-tip">（点击你认为有语法错误的词）</p>
  </div>
</template>

<style scoped>
.es-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}

.es-label {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.es-sentence {
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.es-word {
  display: inline;
  border-bottom: 2px dashed var(--vp-c-brand);
  cursor: pointer;
  padding: 0 2px;
  border-radius: 2px;
  transition: background 0.15s;
}

.es-word:hover {
  background: var(--vp-c-brand-soft);
}

.es-word--correct {
  background: rgba(255, 80, 80, 0.12);
  border-bottom-color: #e74c3c;
  color: #c0392b;
  cursor: default;
}

.es-word--wrong {
  background: rgba(255, 160, 40, 0.18);
  border-bottom-color: #f39c12;
}

.es-word--shake {
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-4px); }
  40%       { transform: translateX(4px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(3px); }
}

.es-tip {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.es-feedback {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.es-feedback--correct {
  background: rgba(52, 199, 89, 0.1);
  color: #1a7a3a;
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.es-hint {
  margin: 0.4rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: normal;
}
</style>
