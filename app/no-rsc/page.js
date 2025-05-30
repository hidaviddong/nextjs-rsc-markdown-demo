'use client'
import { useEffect, useState } from 'react';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify);

export default function Home() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://raw.githubusercontent.com/facebook/react/main/README.md');
        if (!response.ok) {
          throw new Error('Failed to load markdown file');
        }
        const text = await response.text();
        const file = await processor.process(text);
        setContent(String(file));
      } catch (err) {
        setError('Failed to load markdown file');
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, []);

  if (loading) {
    return (
      <div className="flex p-8 justify-center items-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex p-8 justify-center items-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex p-8 justify-center items-center">
      <article 
        className="prose prose-slate max-w-none" 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
}
  