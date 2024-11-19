module.exports = {
  extends: ['cz'], // 使用 commitlint-config-cz 的扩展
  rules: {
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 72],
  },
};
