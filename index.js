import {
  mkdir,
  writeFile,
  rm,
} from 'node:fs/promises';
import { join, dirname } from 'node:path'
import markdownit from 'markdown-it'

const outputDir = 'dist';

const md = markdownit();

const pageTemplate = (title, content) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>801Labs.org: ${title}</title>
  </head>
<body>
<header>
<h2>801Labs.org!!!!!!</h2>
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/contact/">Contact</a></li>
    <li><a href="/donate/">Donate</a></li>
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
  const output = pageTemplate(
    config.title,
    md.render(config.content),
  );
  writeFile(prefixedPath, output);
};

await rm(outputDir, { force: true, recursive: true });

[
  {
    title: 'Home',
    content: '# 801Labs.org Home\n\nThis is where the cool goats go',
    path: 'index.html'
  },
  {
    title: 'Contact',
    content: '# Contact Us!\n\nCome hang out with us on Discord, or at our physical hackerspace!',
    path: 'contact/index.html'
  },
  {
    title: 'Contact GoataClause',
    content: '# Contact GoataClause!\n\nCome get licked by your favorite yule-goat!',
    path: 'contact/goataclause/index.html'
  },
  {
    title: 'Donate',
    content: '# Please pay our rent!\n\nYou can even donate in GoatCoin! _Goats do have coins, right?_',
    path: 'donate/index.html'
  },
].forEach(createPage)
