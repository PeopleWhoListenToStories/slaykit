module.exports = {
  extends: ['cz'], // 使用 commitlint-config-cz 配置
  rules: {
    'header-max-length': [2, 'always', 72], // 限制标题长度
    'body-max-line-length': [2, 'always', 100], // 限制正文长度
    'type-enum': [ // 允许的提交类型
      2,
      'always',
      [
        '✨ feat', // 新功能
        '🐛 fix', // 修复 Bug
        '📝 docs', // 文档更新
        '🎨 style', // 样式更新
        '♻️ refactor', // 重构
        '✅ test', // 添加测试
        '🔧 chore', // 配置修改
        '🚀 perf', // 性能优化
        '🔥 remove', // 删除代码
        '🔒 security', // 安全更新
        '💚 ci', // CI 相关
      ],
    ],
  },
};
