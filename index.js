import {
  mkdir,
  writeFile,
  rm,
} from 'node:fs/promises';
import markdownit from 'markdown-it'

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

const createPage = (config) => {
  const output = pageTemplate(
    config.title,
    md.render(config.content),
  );
  writeFile(config.path, output);
};

await rm('dist', { force: true, recursive: true });

await Promise.all([
  'dist/contact',
  'dist/donate',
].map(async (path) => {
  await mkdir(
    path,
    {
      recursive: true,
    },
  )
}));

[
  {
    title: 'Home',
    content: '# 801Labs.org Home\n\nThis is where the cool goats go',
    path: 'dist/index.html'
  },
  {
    title: 'Contact',
    content: '# Contact Us!\n\nCome hang out with us on Discord, or at our physical hackerspace!',
    path: 'dist/contact/index.html'
  },
  {
    title: 'Donate',
    content: '# Please pay our rent!\n\nYou can even donate in GoatCoin! _Goats do have coins, right?_',
    path: 'dist/donate/index.html'
  },
].forEach(createPage)
