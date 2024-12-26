const ts = require('typescript');

/**
 * @param {import('typescript/lib/tsserverlibrary').LanguageService} languageService 
 * @returns {import('typescript/lib/tsserverlibrary').LanguageService}
 */
exports.proxyLanguageService = function proxyLanguageService(
  languageService,
) {
  /** @type {import('typescript/lib/tsserverlibrary').LanguageService} */
  const proxy = Object.create(null);
  for (const k of Object.keys(languageService)) {
    // @ts-ignore
    const x = (languageService)[k];
    // @ts-ignore
    proxy[k] = (...args) => x.apply(languageService, args);
  }

  proxy.getCompletionsAtPosition = (fileName, position, options) => {
    const prior = languageService.getCompletionsAtPosition(fileName, position, options) ?? {
      isGlobalCompletion: false,
      isMemberCompletion: false,
      isNewIdentifierLocation: false,
      entries: [],
    };
    prior.entries.push({
      name: 'Hello',
      kind: ts.ScriptElementKind.keyword,
      sortText: '0',
    });
    return prior;
  };
  return proxy;
}
