import { MarkdownConfig } from 'xueyan-react-markdown'

export interface AnyObject {
  [prop: string]: any
}

export interface PlaygroundProps extends MarkdownConfig {
  style?: React.CSSProperties
  className?: string
  /** typescript code string */
  children: string
  /** import package in code */
  scope: AnyObject
  /** show code block */
  showCode?: boolean
  /** show live block */
  showLive?: boolean
  /** code first when both show */
  codeFirst?: boolean
}
