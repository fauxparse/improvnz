export default (strings: TemplateStringsArray): string =>
  strings
    .join(' ')
    .trim()
    .split('\n')
    .map((s) => s.trim())
    .map((s) => s || '\n')
    .join(' ')
    .replace(/\s*\n\s*/g, '\n');
