---
title: Proxying requests in NextJS
publishedAt: '2020-08-05'
description: 'Cool stuff related to Static Site Generation, API Routes and Proxying requests in NextJS'
---

## The Task

I was tasked with creating a proof of concept within a small team at work (I currently work at one of the largest ecommerce sites in the UK). This concept project was to use SSG (Static Site Generation) to populate a product card, which would greatly improve the performance of the component/page because just static HTML/CSS files can be sent to the client.

## The Problem

SSG means that the page is rendered at build time. Although this is fantastic for performance, a caveat is that data fetched at build time is what is sent to the client. If this data changes after the build, for example if the price changed, the page or component wont reflect that change (unless another build is kicked off). With that in mind, I needed to work out how to fetch the more dynamic data on request/on the client.

## The Solution

The first solution was to build a [custom server](https://nextjs.org/docs/advanced-features/custom-server) using express. This worked instantly and solved the problem - the client side fetch worked, however this seems to be a pattern NextJS is moving away from. After reading the documentation some more, I found out that API Routes ("_a straightforward solution to building an API with Next.js_") coupled with some rerwrites via a `next.config.js` file could also solve this problem with a lot less code.

### API Route

The first step was to create an `api` folder inside of the `pages` folder. This folder must **explicitly** be called `api`.

Within this api folder structure, all we need to do is to create a file for our API. The naming convention for this on the vercel docs is usually a file name inside square brackets. I went for `[...args].js`. Any files placed inside this folder are essentially API's, which could carry out any usual tasks a conventional API (like an express server) may do.
The code for proxying the requests is fairly straight forward using the `http-proxy-middleware` package, found [here](https://github.com/chimurai/http-proxy-middleware):

```
const apiProxy = createProxyMiddleware({
  target: "https://www.big-uk-ecommerce-site.co.uk",
  changeOrigin: true,
  pathRewrite: {
    [`api/product-api/pdp-service/partNumber/`]: "product-api/pdp-service/partNumber/",
  },
  secure: false,
});
```

Vercel's API Route gives us access to a `req` and `res` object (much like we would get using an express server) which we then pass into the `apiProxy` created above:

```
export default function (req, res) {
  apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }

    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
}
```

The full code for this can be found [here](https://github.com/alex-rhodes/nextjs-poc/blob/master/pages/api/%5B...args%5D.js).

### NextJS config Redirect

The final piece of the puzzle is to use a Next config. A NextJS config is a regular Node.js module, not a JSON file. It gets used by the Next.js server and build phases, and it's not included in the browser build. This file (named `next.config.js`) is placed into the root of our project.

This file can do a number of things, however the code I needed to use is fairly straight forward; it simply rewrites the request path of the source request to the companies actual product API:

```
module.exports = {
  rewrites: () => [
    {
      source: "api/product-api/pdp-service/partNumber/*",
      destination:
        "https://www.big-uk-ecommerce-site.co.uk/product-api/pdp-service/partNumber/*",
    },
  ],
};
```

And thats it! Coupled with the API route, this next config is all we need to proxy requests using Next.

Bonus: The performance of this app was also fantastic, the LightHouse and Web Page Test results are shown below

## Lighthouse:

![Lighthouse Score](/images/lighthouse.png 'Lighthouse Score')

## WebPageTest (Moto 4G, 3G connection):

![Webpage Test Score](/images/wpt.png 'Webpage Test Score')

As always, thanks for reading!
