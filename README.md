# sun and bass lineup 2024 challenge

[v0](https://v0.dev/)
[pnpm](https://pnpm.io/)
[sunandbass lineup](https://sunandbass.net/site/line-up-2024/)

 <img src="./guide/lineup.png" width="300" />

```
pnpm i
pnpm dev
```

[post](https://twitter.com/headwinds/status/1832081717135299043)

[react-world-flags](https://github.com/smucode/react-world-flags)

[phosphor](https://www.npmjs.com/package/@phosphor-icons/react)

### Pain Points

Problem

why is it so challenging to find Artist photos? And why should I have to configure Next Image for a every url?

Solution

There should be public press kit site for every artist which easy image urls for promoters

#### Google Analytics

I dusted off my GA accounted and at first struggled to find the add new property bottom.

Ideally, it should have have been placed at the top where you view the properties but instead it's hidden with in the admin gear at that the bottom on the screen.

1. click the Admin gear.
   <img src="./guide/sun_create_property.png" width="300" />

2. add the custom property (if you're new, you'll have to setup your account first)
   <img src="./guide/sun_property.png" width="300" />

Since this is nextjs, see my app > layout.tsx for the implementation which relies on [@next/third-parties/google](https://nextjs.org/docs/messages/next-script-for-ga#use-nextthird-parties-to-add-google-analyticsa)
