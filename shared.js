import { readFile } from 'fs/promises';
import { join, basename, normalize } from 'path/posix';

export const parseFrontMatter = (frontMatterString) => {
  const result = {};
  const lines = frontMatterString.split('\n');
  lines.forEach((line) => {
    const keyValueRegex = /^(.*?): (.*)/mg;
    const regexResult = keyValueRegex.exec(line.trim());
    // console.log('What is regexResult?', regexResult);
    if (!regexResult) {
      return;
    }
    const [_wholeMatch, key, value] = regexResult;
    result[key.trim()] = value.trim();
  });
  return result;
};

export const readMarkdownWithFrontMatter = async (scanPath, path) => {
  const inputPath = normalize(join(scanPath, path));
  const content = await readFile(inputPath, { encoding: 'utf8' });
  // console.log('What is content?', content);
  const frontMatterRegex = /^---\n(.*?)\n---\n/s;
  const regexResult = frontMatterRegex.exec(content);
  // console.log('What is regexResult?', regexResult);
  if (!regexResult) {
    throw new Error(`Your markdown needs frontMatter!\nFile: "${inputPath}"`);
  }
  const [remove, frontMatterString] = regexResult;
  const markdown = content.replace(remove, '').trim();
  const frontMatter = parseFrontMatter(frontMatterString);
  return {
    frontMatter,
    markdown,
    contentPath: normalize(inputPath.replace(basename(inputPath), '')),
  };
}

const unwrapRegex = /^['"](.*)['"]$/;

export const unwrapString = (string) => {
    return unwrapRegex.exec(string)[1];
}

export const stringToSlug = (s) => s
  .toLocaleLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');
