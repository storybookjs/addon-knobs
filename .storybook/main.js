module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["../preset"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  }
};
