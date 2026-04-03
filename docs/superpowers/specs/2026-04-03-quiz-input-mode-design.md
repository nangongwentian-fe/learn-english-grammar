# Quiz 组件输入模式 — 设计文档

**日期：** 2026-04-03

## 目标

在现有 Quiz 组件中新增输入框，让用户可以直接输入答案并获得即时对错反馈，同时保留原有"查看答案"按钮。

## 交互设计

**状态机：**
- `idle`：初始状态，显示输入框 + 提交按钮 + 查看答案按钮
- `correct`：答对，显示 ✅ 正确！+ hint（输入框禁用）
- `wrong`：答错，显示 ❌ 还差一点 + 输入框可重试
- `revealed`：查看答案，显示答案 + hint（与原行为一致）

**答案匹配规则：**
- 不区分大小写（`.toLowerCase()`）
- 去除首尾空格（`.trim()`）

**触发提交：** 点击"提交"按钮 或 按 Enter 键

## 组件接口

Props 不变：`question: string`，`answer: string`，`hint?: string`

所有已有 `.md` 文件中的 `<Quiz />` 用法无需任何修改。

## 文件

- **修改：** `docs/.vitepress/theme/components/Quiz.vue`（唯一改动文件）
