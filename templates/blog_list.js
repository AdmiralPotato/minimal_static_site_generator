import { normalize, dirname } from 'node:path';
import { readdir, writeFile } from 'node:fs/promises'
import { readMarkdownWithFrontMatter, unwrapString } from '../shared.js'
import basic from './basic.js'
import { createCanvas, loadImage } from '@napi-rs/canvas'

export default async function (config) {
  const { basePath } = config;
  const pathRoot = dirname(config.path) + '/'
  const inputPrefix = `content/`
  const inputPath = `${inputPrefix}${pathRoot}`
  const outputPrefix = `temp/`
  const thumbnailSize = 512
  const width = thumbnailSize
  const height = thumbnailSize
  const indexRegex = /([/\\])index.md$/
  const scanResult = (await readdir(inputPath, {
    recursive: true
  })).filter(s => indexRegex.test(s))
  const galleryItems = (
    await Promise.all(scanResult.map(async item => {
      const {frontMatter} = await readMarkdownWithFrontMatter(inputPath, item)

      const link = normalize(`${item.replace(/index\.md$/, '')}`).replace(/\\/g, '/')
      const sourcePath = normalize(`${inputPrefix}${pathRoot}${link}${unwrapString(frontMatter.cover)}`)
      const canvas = createCanvas(width, height)
      const ctx = canvas.getContext('2d')
      console.log('Generating thumbnail for:', sourcePath);
      const image = await loadImage(sourcePath)
      const longerAxis = Math.max(image.width, image.height)
      if (longerAxis === image.width) {
        const ratio = image.width / image.height
        const offset = (ratio * width - width) / 2
        ctx.drawImage(image, -offset, 0, ratio * width, height)
      } else {
        const ratio = image.height / image.width
        const offset = (ratio * height - height) / 2
        ctx.drawImage(image, 0, -offset, width, ratio * height)
      }
      const thumbnailData = await canvas.encode('jpeg', 80)
      const thumbnail = `${link}thumbnail.jpg`
      await writeFile(`${outputPrefix}${pathRoot}${thumbnail}`, thumbnailData)
      return {thumbnail, link, frontMatter}
    }))
  )
    .sort((a, b) => b.frontMatter.date_published
      .localeCompare(a.frontMatter.date_published)
    )
    .map(({thumbnail, link, frontMatter}) => /*html*/`<article class="blog-item window">
        <div class="image">
          <a href="${link}">
            <img src="${thumbnail}" alt="${frontMatter.title}" width="256" />
          </a>
        </div>
        <div class="card-body">
          <h3><a href="${link}">${frontMatter.title}</a></h3>
          <p class="description"><a href="${link}">description: ${frontMatter.description || 'unknown medum'}</a></p>
          <p class="tags">tags: ${frontMatter.tags}</p>
          <p class="date">date: ${frontMatter.date_published}</p>
          <p class="author">
            <img class="author-avatar" src="${basePath}/images/${unwrapString(frontMatter.author_avatar)}" alt="" />
            <span class="author-name">${frontMatter.author_name}</span>
          </p>
        </div>
      </article>`)
  return basic({
    ...config,
    content: /* html */`
      <div class="intro window">${config.content}</div>
      <div class="blog-list">
        ${galleryItems.join('\n')}
      </div>
  `
  })
}
