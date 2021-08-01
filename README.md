# `react-co`

coroutine + fiber + asyncIterator

协程 + 纤程的一种尝试，利用异步迭代器，生成一个自执行的 React 工作单位

## Usage


App.jsx
```js
import React from 'react'
import co from 'react-co'

const f = (url) => fetch(url).then(res => res.json())

async function* App(props) {
  yield <div>loading</div>

  const data = await f(props.url)

  yield <div>{JSON.stringify(data)}</div>
}

export default co(App)

```

index.jsx
```js
ReactDOM.render(
  <React.StrictMode>
    <App url='https://gw.alipayobjects.com/os/bmw-prod/c335e0c4-caa5-4c76-a321-20df96b6e5c8.json' />
  </React.StrictMode>,
  document.getElementById('root')
);
```
