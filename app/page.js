import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

      <Button asChild>  
          <Link href="/no-rsc">render markdown in client</Link>
      </Button>
            
      <Button asChild>
          <Link href="/rsc">render markdown in server (React Server Components)</Link>
      </Button>

  
      </main>
    </div>
  );
}
