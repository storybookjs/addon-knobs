function managerEntries(entry = [], options) {
  return [...entry, require.resolve("./dist/register")];
}

function config(entry = [], { addDecorator = true } = {}) {
  const knobsConfig = [];
  if (addDecorator) {
    knobsConfig.push(require.resolve("./dist/preset/addDecorator"));
  }
  return [...entry, ...knobsConfig];
}

module.exports = { managerEntries, config };
