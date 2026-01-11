import { getBlogPosts } from 'src/app/[slug]/utils'

export const baseUrl = 'https://ajr.codes'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.metadata.publishedAt
  }))

  let routes = ['', '/'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...blogs]
}
