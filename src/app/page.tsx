import { BlogPosts } from 'src/app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>A blog by Alex</h1>
      <p className='mb-4'>{'Todo'}</p>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  )
}
