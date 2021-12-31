const fs = require("fs");
const path = require("path");

const vscodeSettingsString = fs.readFileSync(path.join(__dirname, ".vscode", "settings.json"), "utf-8");
const vscodeSettingsLines = (
  vscodeSettingsString
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
);
const vscodeSettings = JSON.parse(vscodeSettingsLines.join("\n"));


module.exports = {

  // -> allows 3 vertical windows
  printWidth: vscodeSettings["editor.rulers"][0],

  // -> use less screen width
  tabWidth: 2,

  // -> simpler line pattern matching in scripts
  useTabs: false,

  // foo(); -> prevent errors
  semi: true,

  // "foo" -> consistent with JS
  singleQuote: false,

  // { foo: ... } -> better property autocompletion
  quoteProps: "as-needed",

  // "foo" -> consistent with JS
  jsxSingleQuote: false,

  // -> better Git line diff
  trailingComma: "all",

  // { foo: bar } -> cleaner code
  bracketSpacing: true,

  // -> cleaner code
  jsxBracketSameLine: false,

  // (foo) => {} -> cleaner code
  arrowParens: "always",

  // Format files with & without pragma
  requirePragma: false,
  insertPragma: false,

  // -> format does not break visible HTML
  htmlWhitespaceSensitivity: "css",

  // Only "\n" -> simpler line-splitting in scripts
  endOfLine: "lf",
};
