/// <reference types="@volar/typescript" />

const ts = require('typescript/lib/tsserverlibrary');

/**
 * @returns {import('@volar/language-core').LanguagePlugin<string>}
 */
exports.createPngLanguagePlugin = function createPngLanguagePlugin() {
  return {
    getLanguageId(scriptId) {
      if (scriptId.endsWith('.png')) return 'png';
      return undefined;
    },
    createVirtualCode(scriptId, languageId) {
      if (languageId !== 'png') return undefined;
      const dtsContent = `
declare const I_PNG: { src: string, width: number, height: number };
export default I_PNG;
      `.trim();
      return {
        id: 'main',
        languageId: 'png',
        snapshot: {
          getText: (start, end) => dtsContent.slice(start, end),
          getLength: () => dtsContent.length,
          getChangeRange: () => undefined,
        },
        mappings: [],
      };
    },
    typescript: {
      extraFileExtensions: [
        {
          extension: 'png',
          isMixedContent: true,
          scriptKind: ts.ScriptKind.TS,
        },
      ],
      getServiceScript(root) {
        return {
          code: root,
          extension: ts.Extension.Ts,
          scriptKind: ts.ScriptKind.TS,
        };
      },
    },
  };
}
