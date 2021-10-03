import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import Playground from 'xueyan-react-playground'

const MARK1 = `
## 下载

\`\`\`bash
npm i xueyan-react-playground
\`\`\`

\`\`\`bash
yarn add xueyan-react-playground
\`\`\`

## 常规用法
`

function Switch({
  value,
  onChange
}: {
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div onClick={() => onChange(!value)}>
      switch: {value ? 'ON' : 'OFF'}
    </div>
  )
}

const code1 = `
import React from 'react'
import Switch from 'Switch'

export default function UseSwitch() {
  const [state, setState] = React.useState<boolean>(false)
  return <Switch value={state} onChange={setState}/>
}
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground scope={{ React, Switch }}>
        {code1}
      </Playground>
    </Article>
  )
}
