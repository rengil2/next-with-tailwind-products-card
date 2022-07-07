## Run Dev
```
 npm i
 npm run dev
```

## Run Production
```
 npm i
 npm run start
```

## Run Tests
```
 npm test
```

## Run Playwright
```
 npm run e2e
```

## Assumptions made 
1. All products will have the same currency. This way it make the scope a bit smaller.
2. The cart approach to fetch all the data is not ideal. I could either fetch all the pages or fetch one by one. 
3. If the product in the cart no longer exist, we just ignore it. It will be in the cart, but it won't be showing to the user.
This can be removed when the user checks out the cart or can be done as well in the backend.

## Folder structure
```
  components
    reusable or domain specific components
  features
    hooks, queries and helpers associated to the product.
  helpers
    General helpers that are not related to any feature in particular. Like money and images.
```
## Next steps
1. Replace all strings with i18n
2. Test components using react-test-library and divide them better using atomic design
3. The cart do too many requests now, I would love to have an api that I can pass a bunch of ids and get all the product
4. Better empty and loading state
5. Double check if everything accessibility wise is good enough. Now you can do all the remove, increment and decrement just with the keyboard and all the actions are made via button
6. For the components, add a storybook
