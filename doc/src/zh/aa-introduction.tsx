import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
## xueyan-react-playground

它是一个 Markdown 渲染组件，用于在 React 项目中渲染 markdown 文本的场景。  

其内部封装了 \`react-markdown\`，\`react-syntax-highlighter\`，\`remark-gfm\` 库。  

若对 Markdown 不了解，可看 <https://commonmark.org/help>。
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
