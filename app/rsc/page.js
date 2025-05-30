import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeStringify)

export default async function Home() {
    const response = await fetch('https://raw.githubusercontent.com/facebook/react/main/README.md');
    if (!response.ok) {
        throw new Error('Failed to load markdown file');
    }
    const md = await response.text();
    const file = await processor.process(md)
    return (
        <div className="flex justify-center items-center p-8">
            <article className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{__html: String(file)}} />
        </div>
    );
}
  