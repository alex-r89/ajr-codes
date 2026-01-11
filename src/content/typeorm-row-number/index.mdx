---
title: Ranking ordered Postgres queries using TypeOrm
publishedAt: '2020-07-10'
description: 'How to implement Postgres ROW_NUMBER to "rank" ordered queries using TypeOrm'
---

## The Task

TL;DR - Scroll down to the code below for the solution (Solution 2).

In one of my personal projects, I fire a GraphQL query to a Postgres table of `Server` entities when a user visits a page. With the option to pass in an offset for pagination, this query returns an array of up to 20 `Servers`, ordered by a column in the table (`vote_count`).

## The Problem

The issue I was facing is that on the front-end I needed to "rank"/numerically order these results - essentially getting their position as an integer in the returned query. For example, the first 20 results will be `rank` 1-20, page 2 will be `rank` 21-40 and so on. However, I was unsure how to best do this.

It seemed like storing this rank in the database was a mistake. If a vote for a server came in, I would also need to calculate the rank of the server there and then, which would be based on working out if this vote changed the position of this server in the table, e.g. add 1 to that servers `vote_count` and then also work out if that changes the `Server` from rank 10 to rank 9 - if it does, change the ranks some how. Very messy.

With that being said, my first thought was to calculate this on the fly (either in my `getServers` `Resolver` after the query or on the front end), by working out the rank based on a calculation of the offset and the position of the `Server` in the returned array of 20. However this seemed like a slow, janky and potentially error prone way of working it out.

After Googling for a few hours, I found out that Postgres provides a method of working this out via its [ROW_NUMBER](https://www.postgresqltutorial.com/postgresql-row_number/) function. This function returns exactly what I was after - a unique integer value to each row in a result set.
The next problem was working out how to do this with Typeorm!

## The Solution

Typeorm is great...once you work out how to do something. However, I find the documentation lacks a little and seems to be written by someone who expects the reader to have implied knowledge of Typeorm. I don't have a clue what I'm doing, so was poking in the dark

I assumed that Typeorm's `find` method would have some way of using the `ROW_NUMBER` function. However after searching and trial and erroring, I found out that for some reason it doesn't - so needed to use Typeorm's Query Builder.

## Solution 1 (❌)

After googling for a while, I worked out that I could return the row number/rank via the `addSelect` method, like so:

`.addSelect('ROW_NUMBER () OVER (ORDER BY "vote_count" DESC) as "rank"')`

However, the problem I was seeing next was that the row number wasn't returned. After pulling my hair out for hours, I found out that `getMany()` doesnt return `row_number` - it only returns the values of the defined entity.

For reference, this is the full **incorrect** solution:

```
const response =  await  getConnection()
.createQueryBuilder()
.select('server')
.addSelect('ROW_NUMBER () OVER (ORDER BY "vote_count" DESC) as "rank"')
.from(Server,  'server')
.where('is_sponsored = true')
.offset(0)
.limit(20)
.getMany()
```

All I needed to do from here was to use `getRawMany()` instead of `getMany()`:

## Solution 2 (✅)

```
const response =  await getConnection()
.createQueryBuilder()
.select('server')
.addSelect('ROW_NUMBER () OVER (ORDER BY "vote_count" DESC) as "rank"')
.from(Server,  'server')
.where('is_sponsored = true')
.offset(0)
.limit(20)
.getRawMany() // <- getRawMany DOES return the row number
```

Last but not least, I needed to change the return object from my resolver to match the "raw" result.

And that's it! The above code adds a rank/order value to a query result in Postgres using Typeorm!

Thanks for reading!
