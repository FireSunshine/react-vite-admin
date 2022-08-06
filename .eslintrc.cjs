module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended', 'eslint-config-prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-console': 1, // 不禁用console
    'no-debugger': 2, // 禁用debugger
    'no-var': 1, // 禁止出现var用let和const代替
    'react/react-in-jsx-scope': 0, // 使用JSX时防止丢失React
    'no-irregular-whitespace': 0, // 不规则的空白不允许
    'no-trailing-spaces': 1, // 一行结束后面有空格就发出警告
    'no-unused-vars': 1, // 不能有声明后未被使用的变量或参数
    'no-use-before-define': 2, // 未定义前不能使用
    'arrow-body-style': 0, // 强制或禁止在箭头函数体周围使用大括号
    'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
    'react/prop-types': 0, // 防止在React组件定义中丢失props验证
    'react/jsx-indent-props': [1, 2], // 验证JSX中的props缩进
    'react/jsx-boolean-value': 2, // 在JSX中强制布尔属性符号
    'react/jsx-closing-bracket-location': 1, // 在JSX中验证右括号位置
    'react/jsx-curly-spacing': [2, { when: 'never', children: true }], // 在JSX属性和表达式中加强或禁止大括号内的空格
    'react/jsx-sort-props': 0, // 强化props按字母排序
    'react/jsx-no-duplicate-props': 2, // 防止在JSX中重复的props
    'react/jsx-no-undef': 2, // 在JSX中禁止未声明的变量
    'react/jsx-uses-react': 1, // 防止反应被错误地标记为未使用
    'react/jsx-uses-vars': 2, // 防止在JSX中使用的变量被错误地标记为未使用
    'react/no-multi-comp': 2, // 防止每个文件有多个组件定义
    'react/no-unknown-property': 2, // 防止使用未知的DOM属性
    'react/self-closing-comp': 2, // 防止没有children的组件的额外结束标签
    'react/sort-comp': 2, // 强制组件方法顺序
    'react/no-deprecated': 1, // 不使用弃用的方法
    'react/jsx-equals-spacing': 2 // 在JSX属性中强制或禁止等号周围的空格
  }
};
