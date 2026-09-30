import { getCvData } from '@/shared/api/getCvData'
import { getAllPosts } from '@/shared/lib/posts'
import { headlineStack } from '@/shared/lib/headlineStack'
import { TypewriterObserver } from '@/shared/ui'
import { About } from '@/widgets/about'
import { Experience } from '@/widgets/experience'
import { Skills } from '@/widgets/skills'
import { Projects } from '@/widgets/projects'
import { Education } from '@/widgets/education'
import { Contact } from '@/widgets/contact'
import { LatestPosts } from '@/widgets/blog'
import { BootSequence, InteractiveShell, Motd, StatusBar, type ShellData } from '@/widgets/terminal'

export const revalidate = 3600

export default async function HomePage() {
  const cv = await getCvData()
  const posts = getAllPosts()

  const shellData: ShellData = {
    name: cv.personal.name,
    title: cv.personal.title,
    location: cv.personal.location,
    years: cv.personal.yearsOfExperience,
    email: cv.personal.email,
    githubUrl: cv.personal.githubUrl,
    linkedinUrl: cv.personal.linkedinUrl,
    cvPath: cv.personal.cvPath,
    cvFileName: cv.personal.cvFileName,
    stack: headlineStack(cv, 5),
    jobs: cv.jobs.map(({ title, company, period }) => ({ title, company, period })),
    projects: cv.personalProjects.map(({ name, tagline, url }) => ({ name, tagline, url })),
    posts: posts.map(({ slug, title }) => ({ slug, title })),
  }

  return (
    <>
      <BootSequence />
      <TypewriterObserver />
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <Motd cv={cv} />
        <InteractiveShell data={shellData} />
        <About cv={cv} />
        <Experience cv={cv} />
        <Skills cv={cv} />
        <Projects cv={cv} />
        <Education cv={cv} />
        <LatestPosts posts={posts.slice(0, 3)} />
        <Contact cv={cv} />
      </div>
      <StatusBar years={cv.personal.yearsOfExperience} />
    </>
  )
}
