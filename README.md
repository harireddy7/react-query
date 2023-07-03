# react-query

- react-query is used to manage server state effeciently
- this will reduce the code needed to make api calls in react components


## Installation and setup

```sh
yarn add react-query
```

## Get started

-import QueryClientProvider and wrap the app inside it similar to redux provider
- import QueryClient and create an object out of it and pass it as `client` prop to QueryClientProvider

```jsx
import { QueryClientProvider, QueryClient } from 'react-query'
const queryClient = new QueryClient();

return (
    <QueryClientProvider client={queryClient}>
        ...entire app goes here...
    </QueryClientProvider>
)
```

## Make api calls with useQuery

- useQuery is a hook that is used to make api calls.
- It takes a queryKey and callback function that makes the api call and return a promise

```js
const { isLoading, data, isError, error } = useQuery('superheroes', () => {
    <!-- returns a promise -->
    return axios.get('...server url...')
})
```

using `isLoading`, `isError, error` and `data`, we can manage jsx without ever using useEffect to update the local state

## ReactQueryDevtools

Use react quert dev tools component to load a toolbar where all the queries can be viewd similar to redux dev tools

```jsx
import { ReactQueryDevtools } from 'react-query/devtools'

// at bottom of jsx
<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
```
### Query OOtions:
#### 1. cacheTime

- pass in options object as 3rd argument to useQuery like `{ cacheTime: 5000 }` to set cache to `5seconds`
- After cache time, cache gets garbage collected and will have to refetch on next visit
- Default value of cacheTime is `5minutes`

#### 2. staleTime
- pass in staleTime in options object to let cache stay for some time to avoid making network calls
- default staleTime is `0seconds`. so on each revisit, network call will be made

#### 3. refetchOnMount
- used to fetch latest data on each time the component is mounted to dom, if cache is stale
- true by default, false will not refetch
- `always` will refetch irrespective of cache

#### 4. refetchOnWindowFocus
- used to fetch latest data even app window comes into focus, if cache is stale
- true by default, false will not refetch
- `always` will refetch irrespective of cache

#### 5. refetchInterval

- used to refetch fresh data after certain given time

## refetch

- useQuery provides a `refetch` function that refectches the data again
- we can pass this to click handler to refetch on click action

## success and error callbacks

- onSuccess and onError props take callback functions to reports success/failure state of api

## transformation

- Transform data received from api using `select` key which is a function
- perform whatever transform and return the data to be used by components