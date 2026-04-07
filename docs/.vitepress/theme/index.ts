import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Quiz from './components/Quiz.vue'
import MultipleChoice from './components/MultipleChoice.vue'
import ErrorSpotter from './components/ErrorSpotter.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('MultipleChoice', MultipleChoice)
    app.component('ErrorSpotter', ErrorSpotter)
  },
} satisfies Theme
