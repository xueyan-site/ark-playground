import React from 'react'
import { Article, Segment } from 'ark-markdown'

const MARK1 = `
React Typescript 代码演示组件

\`\`\`
type Playground = React.ForwardRefExoticComponent<
  PlaygroundProps & React.RefAttributes<PlaygroundRef>
>
\`\`\`

## 简单示例

\`\`\`
const CODE1 = \`
import React from 'react'
export default function demo() {
  return <div>xxxx</div>
}
\`

function Example() {
  return (
    <Playground scope={{ React, ...其他运行时数据 }}>
      {CODE1}
    </Playground>
  )
}
\`\`\`

## PlaygroundRef

\`\`\`
interface PlaygroundRef {
  /** 根节点 */
  rootNode: HTMLDivElement | null
}
\`\`\`

## PlaygroundProps

继承 [SegmentProps](/ark-markdown?doc=0004#segmentprops) 所有属性

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| style | 样式 | \`? React.CSSProperties\` |  |
| className | 类名 | \`? string\` |  |
| children | 代码段 | \`string\` | 必传 |
| scope | 代码中使用的外部变量 | \`Record<string, any>\` | 必传（代码段依赖于外部变量） |
| showLive | 显示运行界面 | \`? boolean\` | 默认为 true |
| showCode | 显示代码 | \`? boolean\` | 默认为 false  |
| codeFirst | 代码排在前面 | \`? boolean\` | 默认为 false |
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
