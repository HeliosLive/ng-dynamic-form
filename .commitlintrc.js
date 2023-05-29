module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0, 'always', 120],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'button',
      ],
    ],
  },
};
