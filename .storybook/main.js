module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["../preset", "@storybook/addon-webpack5-compiler-babel"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  }
};
