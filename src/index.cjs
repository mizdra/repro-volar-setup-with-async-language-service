const { proxyLanguageService } = require('./language-service.cjs');
const { createAsyncLanguageServicePlugin } = require('@volar/typescript/lib/quickstart/createAsyncLanguageServicePlugin.js');
const ts = require('typescript');

module.exports = createAsyncLanguageServicePlugin([], ts.ScriptKind.TS, async (ts, info) => {
  if (info.project.projectKind !== ts.server.ProjectKind.Configured) {
    return { languagePlugins: [] };
  }

  return {
    languagePlugins: [],
    setup: (language) => {
      info.languageService = proxyLanguageService(info.languageService);
    },
  };
});
