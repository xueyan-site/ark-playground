import React, { forwardRef, Fragment, useImperativeHandle, useRef, useState } from 'react'
import cn from 'classnames'
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import { Segment } from 'xueyan-react-markdown'
import { styles as themeStyles } from 'xueyan-react-style'
import { ArrowIcon, CodeIcon, EditIcon, FileIcon, VisibleIcon, InvisibleIcon } from 'xueyan-react-icon'
import { transformCode, copyText } from './tools'
import { EditBoxModal } from './editor'
import { Menu } from './menu'
import styles from './playground.scss'
import type { SegmentProps } from 'xueyan-react-markdown'

export type PlaygroundProps = SegmentProps & {
  /** 样式 */
  style?: React.CSSProperties
  /** 类名 */
  className?: string
  /** 代码段 */
  children: string
  /** 代码中使用的外部变量 */
  scope: Record<string, any>
  /** 显示代码 */
  showCode?: boolean
  /** 显示运行界面 */
  showLive?: boolean
  /** 代码排在前面 */
  codeFirst?: boolean
}

export interface PlaygroundRef {
  /** 根节点 */
  rootNode: HTMLDivElement | null
}

export const Playground = forwardRef<PlaygroundRef, PlaygroundProps>(({
  style,
  className,
  children,
  scope,
  darkCode,
  ...props
}, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [showCode, setShowCode] = useState<boolean>(props.showCode !== false)
  const [showLive, setShowLive] = useState<boolean>(props.showLive !== false)
  const [codeFirst, setCodeFirst] = useState<boolean>(props.codeFirst === true)
  const [showEditor, setShowEditor] = useState<boolean>(false)
  const code = children.trim()

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  const liveBoxNode = showLive && (
    <div className={cn(styles.box, styles.live)}>
      <LiveProvider
        language="tsx"
        noInline={true}
        code={code}
        scope={scope}
        transformCode={transformCode}
      >
        <LivePreview/>
        <LiveError />
      </LiveProvider>
    </div>
  )

  const codeBoxNode = showCode && (
    <Segment 
      className={cn(styles.box, styles.code)} 
      darkCode={darkCode} 
      {...props}
    >
      {'```typescript\n' + code + '\n```'}
    </Segment>
  )

  return (
    <div 
      ref={rootRef}
      style={style}
      className={cn(
        className, 
        styles.xrplayground,
        darkCode && themeStyles.xrstyledark
      )}
    >
      <Menu 
        className={styles.header}
        options={[
          {
            icon: <CodeIcon />,
            disabled: !showCode,
            title: `${showCode ? 'hidden' : 'show'} code`,
            onClick: () => setShowCode(!showCode)
          },
          {
            icon: showLive ? <VisibleIcon /> : <InvisibleIcon />,
            disabled: !showLive,
            title: `${showLive ? 'hidden' : 'show'} live`,
            onClick: () => setShowLive(!showLive)
          },
          {
            icon: <ArrowIcon direction={codeFirst ? 'top' : 'bottom'}/>,
            title: `${codeFirst ? 'live' : 'code'} first`,
            onClick: () => setCodeFirst(!codeFirst)
          },
          {
            icon: <FileIcon />,
            title: 'copy code to clipboard',
            onClick: () => copyText(code)
          },
          {
            icon: <EditIcon />,
            title: 'edit code and view effect',
            onClick: () => setShowEditor(true)
          }
        ]}
      />
      <div className={styles.boxes}>
        {codeFirst ? (
          <Fragment>
            {codeBoxNode}
            {liveBoxNode}
          </Fragment>
        ) : (
          <Fragment>
            {liveBoxNode}
            {codeBoxNode}
          </Fragment>
        )}
      </div>
      <EditBoxModal
        code={code}
        scope={scope}
        value={showEditor}
        onChange={setShowEditor}
      />
    </div>
  )
})
