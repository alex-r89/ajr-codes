import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  description: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => {
    const fullPath = path.join(dir, file)
    return fs.statSync(fullPath).isDirectory()
  })
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFolders = getMDXFiles(dir)
  return mdxFolders.map((folder) => {
    const { metadata, content } = readMDXFile(path.join(dir, folder, 'index.md'))
    const slug = folder

    return {
      metadata,
      slug,
      content
    }
  })
}

// Generate the posts JSON file
const contentDir = path.join(process.cwd(), 'src', 'app', 'content')
const posts = getMDXData(contentDir)

const outputDir = path.join(process.cwd(), 'src', 'data')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(path.join(outputDir, 'posts.json'), JSON.stringify(posts, null, 2))

console.log(`✅ Generated ${posts.length} blog posts`)
