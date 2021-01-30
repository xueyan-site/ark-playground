import React, { Fragment, useState } from 'react'
import { MarkdownSegment } from 'xueyan-react-markdown'
import Switch from 'xueyan-react-playground'

const code1 = `
\`\`\`typescript
import React, { useState } from 'react'
import Switch from 'xueyan-react-playground'

export default function UseSwitch() {
  const [state, setState] = useState<boolean>(false)
  return <Switch value={state} onChange={setState} block={true}/>
}
\`\`\`
`

export default function UseTwo() {
  const [state, setState] = useState<boolean>(false)
  return (
    <Fragment>
      <MarkdownSegment>{code1}</MarkdownSegment>
      <p>结果：</p>
    </Fragment>
  )
}
