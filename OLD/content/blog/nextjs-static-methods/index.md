---
title: Static Site Generation (SSG) with NextJS
date: '2020-11-07'
description: 'Statically generating paths using NextJS'
---

While working on a side project, I decided to use SSR (via `getServerSideProps`) to build out paginated paths. The reason for this decision was that data on these pages is fairly dynamic, so I thought SSG was out of the question. Plus I wasn't sure how I would generate all of the pages at build time. The issue I ran into however was fairly slow metrics. The start render and First Contentful Paint were very poor at around 4.5 seconds:

###Webpage Test SSR Vitals

![SSR Webpage Test Score](SSR.png 'SSR Webpage Test Score')

After reading up on the NextJS documentation, looking and some of the NextJS examples ([found here](https://github.com/vercel/next.js/tree/canary/examples)) and asking in the Github discussions section, I found out that I could use NextJS to statically generate the paths (i.e. `/page/2`) as well as statically generate pages, while not needing to worry about stale data on the page.

###Generating static pages with `getStaticProps`

The first problem to solve was to work out how to generate a page statically to improve the metrics above. Thankfully, this is fairly straight forward using `getStaticProps`. The `getStaticProps` method replaces `getServerSideProps` and is exported at the bottom of pages in the same way. This allows you to carry out usual data fetches to populate a page at build time. For my personal project, I make calls to my _GraphQL_ resolvers here to fetch information required in the page:

```
export async function getStaticProps({ params }) {
  const apolloClient = await initApolloClient({})

  const { data: allServers } = await apolloClient.query({
    query: getServersQuery,
    variables: { input: { page: parseInt(params.index), getSponsoredOnly: false } }
  })

  const apolloStaticCache = apolloClient.cache.extract()
  return {
    props: {
      servers: allServers?.getServers,
      page: params?.index,
      apolloStaticCache
    },
    // update every 30 mins
    revalidate: 1800 // Remove if using SSR
  }
}
```

This allows me to call my `getServersQuery` resolver, fetch the data I need at build time and have this route statically rendered. This data is then returned from this method, which is simply passed into my page component as props:

```
const PaginatedPage = ({ servers, page }) => {
...
// more code here and stuff
...
```

There are two other things to explain in the code snippet above, `params` and `revalidate`.

###Using `revalidate` to update statically generated page data

The optional `revalidate` parameter allows for [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration), which essentially solves the issue of data going stale. With this paramaeter added to `getStaticProps`, the page will be re-generated after a set number of seconds as traffic comes in. In my case above, every 1800 seconds (or 30 minutes) this page will be re-built once traffic hits the route, meaning I dont need to rebuild my entire application to get new data from the `getServersQuery` resolver.

###Building routes statically using `getStaticPaths`

This is where `params` comes in. The second issue I faced was needing to generate multiple paginatable pages at build time. How would I know how many pages I needed to build? For example, if a company had 400 products, with 20 products per page, how would they know to build 20 pages, allowing a user to go to `/page/15` and see a statically generated (fast) page of products. This is solved by `getStaticPaths`.

`getStaticPaths` allows you to generate the paths you need statically. In my case, I needed to work out how many pages I have, based on a calculation of the total amount of `servers` divided by the amount of `servers` per page. I would then generate an array of this total, and iterate over it using a `map` to generate page index's:

```
export async function getStaticPaths() {
  const SERVERS_PER_PAGE = 20
  ...
  ...
  // removed code here that gets totalServerCount
  ...
  ...

  const numberOfPages = Math.ceil(totalServerCount / SERVERS_PER_PAGE)

  // - 1 here because the array counts from 0
  const paths = Array(numberOfPages - 1)
    .fill('')
    .map((_, index) => ({
      // We + 2 here because pages start at  page/2
      // Need to use toString() because getStaticProps needs string
      params: { index: (index + 2).toString() }
    }))
  // fallback: false means pages that don’t have the
  // correct id will 404.
  return { paths, fallback: true }
}
```

The return from `getStaticPaths` is the paths that can be generated. This is passed into `getStaticProps` as the `param` prop, which then generates this path. AMAZING! But what is `fallback`?

###Building future routes using `fallback`

There is an issue with the explanation above. What happens if a company was to add 400 new products, and needed 20 new page routes for these (i.e. allowing a user to go to `/page/55`). This is solved with `fallback`.

If the above scenario was to happen, and a user was to visit `/page/21` which wasnt generated in our first example, this page would cause the `fallback` to occour. This will cause this route to be generated on the fly, and from then on be a static route. The initial user would see a loading screen, and this would need to be accounted for in the front end, but subsiquent users would see a statically generated page. I solve this using the following code in my page:

```
const PaginatedPage = ({ servers, page }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <span>Loading...</span>
  }
```

`next/router` allows us to access an `isFallback` parameter, which is passed from `getStaticPaths` `fallback`. As you can see, this first render will see a `span` with Loading... in it, but subsiquent users will see the statically generated path, if it exists, and a `404` if it does not.

NICE!

The result from the above was that page load speeds halved:

###Webpage Test SSG Vitals

![SSG Webpage Test Score](SSG.png 'SSG Webpage Test Score')
