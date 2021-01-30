import { MarkdownConfig } from 'xueyan-react-markdown'

/**
 * 代指一切对象  
 * means any object  
 */
export interface AnyObject {
  [prop: string]: any
}

export interface PlaygroundProps extends MarkdownConfig {
  code: string
  scope: AnyObject
  showCode?: boolean
  showLive?: boolean
  codeFirst?: boolean
  style?: React.CSSProperties
  className?: string
}
