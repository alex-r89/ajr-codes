import Image from 'next/image'
import { BlogPosts } from 'src/app/components/posts'

export default function Page() {
  return (
    <section>
      <header className='mb-[4.375rem] flex'>
        <div className='mr-3.5 mb-0 inline-block relative overflow-hidden w-[50px] h-[50px] min-w-[50px] rounded-full'>
          <Image
            src='/images/profile-pic.jpg'
            alt='Alex - Blog Author'
            width='50'
            height='50'
            className='absolute top-0 left-0 w-full h-full object-cover object-center rounded-full'
          />
        </div>
        <div>
          <h1 className='m-0 text-base font-normal'>
            A blog by{' '}
            <a
              href='https://twitter.com/ajr_codes'
              className='hover:underline'
              rel='noopener noreferrer'
              target='_blank'>
              Alex
            </a>
            .
          </h1>
          <p className='m-0'>Random thoughts and things I learn.</p>
        </div>
      </header>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  )
}
