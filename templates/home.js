import basic from './basic.js';

export default function (config) {
  const content = config.content
    .split('<hr>')
    .map(line => /* html */`<div class="window">\n${line.trim()}\n</div>`)
    .join('\n');
  return basic({
    ...config,
    content,
  });
};
