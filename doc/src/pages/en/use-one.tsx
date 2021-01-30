import React, { Fragment, useState } from 'react'
import { MarkdownSegment } from 'xueyan-react-markdown'
import Switch from 'xueyan-react-playground'

const code1 = `
\`\`\`ts
import React, { useState } from 'react'
import Switch from 'xueyan-react-playground'

export default function UseSwitch() {
  const [state, setState] = useState<boolean>(false)
  return <Switch value={state} onChange={setState}/>
}
\`\`\`
`

export default function UseOne() {
  const [state, setState] = useState<boolean>(false)
  return (
    <Fragment>
      <MarkdownSegment>{code1}</MarkdownSegment>
      <p>result: </p>
    </Fragment>
  )
}
