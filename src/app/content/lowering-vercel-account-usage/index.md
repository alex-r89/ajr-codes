---
title: Lowering Vercel Account Usage
publishedAt: '2026-01-14'
description: 'Lowering Vercel Account Usage'
---

I recently ran into an issue where, for some reason, my Vercel account usage was way, way higher than I would have expected. One of my side project websites was using up all of my edge requests (over a million in 30 days), all of my function invocations and a huge amount of my Fast Origin Transfer. The site wasn't getting more than 2,000-3,000 actual views a month, so something wasn't right.

I fixed this by putting Cloudflare in front of the site...something I don't think Vercel likes. But it fixed it nonetheless.

### Why my site usage was so high and why I couldn't do much about it on Vercel

For some reason, someone (unknown to me) had set up an uptime check on a non-existent API route on my site, and was pinging this route hundreds of times a minute. This was serving the 404 page thousands of times a day and naturally, this was counting towards the usages listed above.

I started off by using Vercel's WAF to block all requests to the API route in question. I set up a custom rule to deny a request path and block it. This worked, and people could not make a request to `mywebsite.com/api/test` anymore.

The problem is, Vercel still counted these blocks as edge requests.

I have no idea why this would be, as my thought is that this firewall rule would/should block these requests from making it to my server. The fact that they do seem to block them yet these blocks still count as edge requests, sort of makes the whole thing a bit pointless. Following on from that, it seems a little crazy to me that all you need to do to drain someone's entire monthly edge request limit is set up Uptimerobot to ping a Vercel site at `/random/path/here` every second. But that's why I wrote this blog post.

For whatever reason, only "Persistent Actions" don't count as edge requests, but persistent actions are only available on Pro and Enterprise plans - I am on the free tier.

### How I put my site behind Cloudflare

This was fairly straightforward. The first step was to use Cloudflare's DNS. Step 2 was to then enable "Full (Strict)" in the "Custom SSL/TLS" settings, inside the SSL/TLS settings for my site.

I then set up a custom security rule to block the request to the route entirely.

The only consideration to note here is that with the site being behind Cloudflare, all the IPs hitting Vercel's infrastructure are the same IP. This is where Vercel flagged to me that having my site behind Cloudflare would "cause problems". But I'm yet to see any of those problems.

A thing to note here is that I could still get the client's IP using a different header, `CF-Connecting-IP`, which worked for rate limiting I had inside my API routes themselves.

Here is a screen shot of my account usage before and after putting the site behind cloudflare:

#### Edge Requests

![Edge Requests](/images/edgeRequests.png 'Edge Requests')

#### Function Invocations

![Function Invocations](/images/functionInvocations.png 'Function Invocations')

#### Fast Origin Transfer

![Fast Origin Transfer](/images/fastOriginTransfer.png 'Fast Origin Transfer')

### The End

Maybe Vercel have changed this and you can now block these types of requests and limit your usage. But it's too late for me. I've been a bit disenfranchised by Vercel as a whole recently. Next.js has become harder and harder to work with, more and more of the features of Next.js seem to be locked to Vercel and things seem to be added to Next.js and then changed in the next major version so frequently, I lose track of what's happening if I'm not constantly looking at the Vercel socials.

I've since moved the entire site off of Vercel onto Cloudflare Workers.
