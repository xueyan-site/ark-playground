import React, { Fragment, useState } from 'react'
// import { MarkdownSegment } from 'xueyan-react-markdown'
import Playground from 'xueyan-react-playground'

const code1 = `
import React, { useState } from 'react'
import Switch from 'xueyan-react-playground'

export default function UseSwitch() {
  const [state, setState] = useState<boolean>(true)
  return (
    <div onClick={() => setState(!state)}>
      {state ? 'opening' : 'closed'}
    </div>
  )
}
`

const scope = {
  React,
  useState
}

export default function UseOne() {
  return (
    <Fragment>
      <Playground code={code1} scope={scope} />
    </Fragment>
  )
}
