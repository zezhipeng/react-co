import React from 'react'

async function runGen(gen, updateView, props) {
  const iteratable = gen(props)
  const iterator = iteratable[Symbol.asyncIterator]()

  while (true) {
    const res = await iterator.next()
    if (res.done) break
  
    if (res.value.then) {
      res.value.then(iterator.next)
    } else {
      updateView(res.value)
    }
  }
}

function co(asyncGen) {
  return function(props) {
    const [view, updateView] = React.useState(null)

    async function coroutine() {
      runGen(asyncGen, updateView, props)
    }

    React.useEffect(() => {
      coroutine()
    }, [props])

    return view
  } 
}

export default co

