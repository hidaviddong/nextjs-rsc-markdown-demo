import fetchMarkdown from './fetch' 
export default async function Home() {
    const file = await fetchMarkdown('https://raw.githubusercontent.com/facebook/react/main/README.md')
    return (
        <div className="flex justify-center items-center p-8">
            <article className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{__html: String(file)}} />
        </div>
    );
}
  