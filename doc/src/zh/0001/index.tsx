import React from 'react'
import { Article, Segment } from 'ark-markdown'
import { Playground } from 'ark-playground'

const MARK1 = `
React Typescript 代码演示组件库，用于实现在线修改代码，实时显示结果。

## 使用示例

\`\`\`
import React from 'react'
import Switch from 'Switch'

function Switch({
  value,
  onChange
}: {
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div onClick={() => onChange(!value)}>
      Switch: {value ? 'ON' : 'OFF'}
    </div>
  )
}

const code1 = \`
import React from 'react'

export default function UseSwitch() {
  const [state, setState] = React.useState<boolean>(false)
  return <Switch value={state} onChange={setState}/>
}
\`

export default function Main() {
  return (
    <Playground scope={{ React, Switch }}>
      {code1}
    </Playground>
  )
}
\`\`\`

## 运行效果
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
      Switch: {value ? 'ON' : 'OFF'}
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
