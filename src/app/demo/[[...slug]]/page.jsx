import HomeLayout from '@/app/layout/homeLayout'
// import supabasePromise from "@/utils/supabaseClient";
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
  return [{ 'slug': undefined }, { 'slug': ['1'] }]
  const supabase = await supabasePromise
  const { count, error } = await supabase.from('Project').select('*', { count: 'exact', head: true })
  const page = Math.max(count / 10, 1)
  return [{ 'slug': undefined }].concat(Array.from(Array(page)).map((nullContent, pageIndex) => ({ 'slug': [`${pageIndex + 1}`] })))
}

export default async function DemoView ({ params }) {
  const { slug } = await params
  if (!slug) {
    redirect('/demo/1')
  }

  const [pageIndex] = slug
  // const supabase = await supabasePromise
  // const { data: projectlist, error } = await supabase.from('Project').select('name, id, created_at').range((pageIndex - 1) * 10, pageIndex * 10)
  const projectlist = []
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