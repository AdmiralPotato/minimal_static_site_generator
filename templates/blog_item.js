import basic from './basic.js';
import { stringToSlug, unwrapString } from '../shared.js'

export default function (config) {
  const { basePath } = config;
  const postTags = config.tags?.split(', ') || [];
  const tagToLink = (t) => `<a href="${basePath}/blog/tag/${stringToSlug(t)}/">${t}</a>`;
  const tagLinks = postTags.map(tagToLink);
  const content = /* html */ `
<article class="blog-item">
  <div class="window">
    <div class="card-body">
      <h3>Blog: ${config.title}</h3>
      ${
        config.description
          ? '<p class="description"><span>description:</span> ' + config.description + '</p>'
          : ''
      }
      ${
        config.tags
          ? '<p class="tags"><span>tags:</span> ' + tagLinks.join(', ') + '</p>'
          : ''
      }
      <p class="date">
        <span style="display: inline-block;">date published: ${config.date_published.split('T')[0]}</span>
        ${
          config.date_updated
            ? ' | <span style="display: inline-block;">date updated: ' + config.date_updated.split('T')[0] + '</span>'
            : ''
        }
      </p>
      <p class="author">
        <span class="author-name">author:</span>
        <img class="author-avatar" src="${basePath}/images/${unwrapString(config.author_avatar)}" alt="" />
        <span class="author-name">${config.author_name}</span>
      </p>
      <p class="cover">
        <img src="${unwrapString(config.cover)}" alt="${config.title}" />
      </p>
    </div>
    ${config.content}
  </div>
</article>
`;
  return basic({
    ...config,
    content,
  });
};
