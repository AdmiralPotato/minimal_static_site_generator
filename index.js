import {
  mkdir,
  writeFile,
  readFile,
  readdir,
  rm,
} from 'node:fs/promises';
import { join, sep, dirname } from 'node:path'
import markdownit from 'markdown-it'

const outputDir = 'dist';
const inputDir = 'content';

const md = markdownit();

const pageTemplate = (title, content, basePath) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>801Labs.org: ${title}</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/styles.css" />
  </head>
<body>
<header>
<h2>801Labs.org!!!!!!</h2>
<ul>
    <li><a href="${basePath}/">Home</a></li>
    <li><a href="${basePath}/contact/">Contact</a></li>
    <li><a href="${basePath}/donate/">Donate</a></li>
</ul>
</header>
${content}
</body>
</html>
`;

const createPage = async (config) => {
  const prefixedPath = join(outputDir, config.path);
  const folderPath = dirname(prefixedPath);
  await mkdir(
    folderPath,
    {
      recursive: true,
    },
  )
  const depth = config.path.split(sep).length - 1;
  const basePath = depth === 0 ? '.' : new Array(depth).fill('..').join('/');
  // TODO: Specify which page template to render this markdown with
  const output = pageTemplate(
    config.title,
    md.render(config.content),
    basePath
  );
  writeFile(prefixedPath, output);
};

await rm(outputDir, { force: true, recursive: true });
// TODO: Copy the content folder over to the dist folder
// TODO: Remove all the markdown files from the new dist folder

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
  })
  return result;
}

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
    };
  }));
};

const pages = await discoverPages(inputDir)
pages.forEach(createPage)
