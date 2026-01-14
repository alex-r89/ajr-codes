import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { highlight } from 'sugar-high'
import Link from 'next/link'
import Image from 'next/image'

function CustomLink(props) {
  const href = props.href
  if (href.startsWith('/')) {
    return <Link href={href}>{props.children}</Link>
  }
  if (href.startsWith('#')) {
    return <a {...props} />
  }
  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

function CustomImage(props) {
  return <Image alt={props.alt || ''} className='rounded-lg' width={800} height={400} {...props} />
}

function Code({ children, className, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  const codeString = String(children).replace(/\n$/, '')

  if (match) {
    const codeHTML = highlight(codeString)
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
  }

  // Inline code styling
  return (
    <code
      className='px-1.5 py-0.5 mx-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.9em] font-mono border border-neutral-200 dark:border-neutral-700 text-pink-600 dark:text-pink-400'
      {...props}>
      {children}
    </code>
  )
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children)
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return (
      <Tag id={slug}>
        <a href={`#${slug}`} className='anchor' />
        {children}
      </Tag>
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}

export function CustomMDX({ source }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: createHeading(1),
        h2: createHeading(2),
        h3: createHeading(3),
        h4: createHeading(4),
        h5: createHeading(5),
        h6: createHeading(6),
        a: CustomLink,
        img: CustomImage,
        code: Code
      }}>
      {source}
    </ReactMarkdown>
  )
}
