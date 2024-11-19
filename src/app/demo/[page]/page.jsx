import HomeLayout from '@/app/layout/homeLayout'
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import { Button } from "@/ui/button"
import Link from 'next/link';
import { OpenInNewWindowIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/getProjectCount')
  const count = await res.json()
  const page = Math.max(1, count / 10)
  return Array.from(Array(page)).map((undef, index) => ({ 'page': `${index + 1}` }))
}

export default async function DemoView ({ params }) {
  const { page } = await params

  const res = await fetch('http://localhost:3000/getProjectList/' + page)
  const projectlist = await res.json()

  return (
    <HomeLayout>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 p-10">
        {
          projectlist.map((project, index) => (
            <Card className="hover:border-black" key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {project.created_at}
              </CardContent>
              <CardFooter className="flex">
                <Link href={`/project/${project.id}`} className="flex flex-1 focus:shadow-none" target="_blank">
                  <Button variant="ghost" size="icon" className="flex-1">
                    <OpenInNewWindowIcon />
                  </Button>
                </Link>
                <Link href={`/editor/${project.id}`} className="flex flex-1 focus:shadow-none" target="_blank">
                  <Button variant="ghost" size="icon" className="flex-1">
                    <Pencil2Icon />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </HomeLayout>
  )
}