module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    extend: {
      boxShadow: {
        login_boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
