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
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} className={className} {...props} />
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export function CustomMDX({ source }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: CustomLink,
        img: CustomImage,
        code: Code
      }}>
      {source}
    </ReactMarkdown>
  )
}
