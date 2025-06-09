import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeStringify)

  
export default async function fetchMarkdown(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to load markdown file')
  }
  const md = await response.text()
  return processor.process(md)
}