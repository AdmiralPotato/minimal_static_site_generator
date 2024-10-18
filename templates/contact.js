import basic from './basic.js';

export default function (config) {
  return basic({
    ...config,
    content: /* html */`
<div>
    <h2>This is the Discord part</h2>
</div>
<div>
    <h2>This is the Groogle Maps part</h2>
</div>
<div>${config.content}</div>
`
  });
};
