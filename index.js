import {
  mkdir,
  writeFile,
  readFile,
  readdir,
  rm,
  cp,
} from 'node:fs/promises';
import { join, sep, dirname } from 'node:path';
import markdownit from 'markdown-it';

const outputDir = 'dist';
const inputDir = 'content';
const templateDir = 'templates';

const md = markdownit();

const templateFilenames = await readdir(templateDir, { recursive: true });
const templateFunctions = await Promise.all(
  templateFilenames
    .filter((item) => item.endsWith('.js'))
    .map(async (item) => {
      // today I learned that ESM flavored imports only like url flavored paths,
      // not paths that would include the windows \ path join
      const modulePath = ['.', templateDir, item].join('/');
      const module = await import(modulePath);
      const templateFunction = (module).default;
      return [item.replace('.js', ''), templateFunction];
    })
);
const templateMap = templateFunctions.reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});

const createPage = async (config) => {
  const templateName = config.template || 'basic';
  const pageTemplate = templateMap[templateName];
  if (!pageTemplate) {
    throw new Error(`No template found named: "${templateName}"`);
  }
  const prefixedPath = join(outputDir, config.path);
  const folderPath = dirname(prefixedPath);
  await mkdir(
    folderPath,
    {
      recursive: true,
    },
  );
  const depth = config.path.split(sep).length - 1;
  const basePath = depth === 0 ? '.' : new Array(depth).fill('..').join('/');
  const templateConfig = {
    ...config,
    content: md.render(config.content),
    basePath,
  };
  const output = pageTemplate(templateConfig, templateMap);
  writeFile(prefixedPath, output);
};

await rm(outputDir, { force: true, recursive: true });
await cp(inputDir, outputDir, {
  recursive: true,
  filter (source, _destination) {
    return !source.endsWith('.md');
  }
});

const parseFrontMatter = (frontMatterString) => {
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

const discoverPages = async (scanPath) => {
  // get list files in current folder
  // if filename ends in .md, add it to the pages array
  const scanResult = await readdir(scanPath, {
    recursive: true,
  });
  const markdownPaths = scanResult.filter(
    (item) => item.endsWith('.md')
  );
  // console.log('What is markdownPaths?', markdownPaths);
  return Promise.all(markdownPaths.map(async (path) => {
    const inputPath = join(scanPath, path);
    const content = await readFile(inputPath, {encoding: 'utf8'});
    // console.log('What is content?', content);
    const frontMatterRegex = /^---\n(.*?)\n---\n/s;
    const regexResult = frontMatterRegex.exec(content);
    // console.log('What is regexResult?', regexResult);
    if (!regexResult) {
      throw new Error(`Your markdown needs frontMatter!\nFile: "${inputPath}"`);
    }
    const [remove, frontMatterString] = regexResult;
    const contentWithoutFrontMatter = content.replace(remove, '');
    const frontMatter = parseFrontMatter(frontMatterString);
    // console.log('What is frontMatter?', frontMatter);
    return {
      path: path.replace(/.md$/, '.html'),
      title: frontMatter.title,
      content: contentWithoutFrontMatter,
      ...frontMatter,
    };
  }));
};

const pages = await discoverPages(inputDir);
pages.forEach(createPage);
