module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    // Отключаем предупреждения об использовании console и debugger, чтобы они не мешали при разработке
    'no-console': 'off',
    'no-debugger': 'off',
    // Устанавливаем только критичные правила
    'no-undef': 'error', // Ошибка, если используются неинициализированные переменные
    'no-unused-vars': 'error', // Ошибка, если есть неиспользуемые переменные (чтобы не засорять код)
    'no-redeclare': 'error', // Ошибка при повторном объявлении переменной
    'no-empty': 'error', // Ошибка, если есть пустые блоки кода (чаще всего это ошибка)
    'no-unreachable': 'error', // Ошибка, если есть недостижимый код
    'comma-dangle': ['error', 'never'], // Запрещаем висячие запятые (в конце объектов/массивов)
    'semi': ['error', 'never'], // Запрещаем использование точек с запятой
    'space-before-function-paren': 'off'
  },

  extends: [
    'plugin:vue/vue3-essential', // Оставляем только основные правила для Vue
    '@vue/typescript/recommended', // Ограничиваемся рекомендациями для TypeScript
  ],
};
