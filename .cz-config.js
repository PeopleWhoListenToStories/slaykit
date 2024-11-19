module.exports = {
  types: [
    { value: 'feat', name: '✨ feat:     新功能' },
    { value: 'fix', name: '🐛 fix:      修复Bug' },
    { value: 'docs', name: '📝 docs:     文档更新' },
    { value: 'style', name: '🎨 style:    代码样式更改' },
    { value: 'refactor', name: '♻️ refactor: 代码重构' },
    { value: 'test', name: '✅ test:     添加测试' },
    { value: 'chore', name: '🔧 chore:    配置修改' },
  ],
  scopes: [],
  messages: {
    type: '请选择提交的类型:',
    scope: '选择一个范围 (可选):',
    customScope: '请输入自定义的范围:',
    subject: '写一个简短的描述:\n',
    body: '提供更详细的变更描述 (可选):\n',
    breaking: '列出任何 BREAKING CHANGES (可选):\n',
    footer: '列出关联的任务 ID (可选):\n',
    confirmCommit: '确认提交信息?',
  },
};
