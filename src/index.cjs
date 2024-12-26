const { createLanguageServicePlugin } = require('@volar/typescript/lib/quickstart/createLanguageServicePlugin.js');
const { createPngLanguagePlugin } = require('./language-plugin.cjs');

module.exports = createLanguageServicePlugin((ts, info) => {
  if (info.project.projectKind !== ts.server.ProjectKind.Configured) {
    return { languagePlugins: [] };
  }

  return {
    languagePlugins: [createPngLanguagePlugin()],
  };
});
