import React, { Fragment, useState } from 'react'
import cn from 'classnames'
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import { Segment, useMarkdownConfig, styles as mdStyles } from 'xueyan-react-markdown'
import { transformCode, copyText } from './tools'
import { PlaygroundProps } from './types'
import EditBoxModal from './editor'
import styles from './index.scss'

export default function Playground(props: PlaygroundProps) {
  const [showCode, setShowCode] = useState<boolean>(props.showCode !== false)
  const [showLive, setShowLive] = useState<boolean>(props.showLive !== false)
  const [showEditor, setShowEditor] = useState<boolean>(false)
  const [codeFirst, setCodeFirst] = useState<boolean>(props.codeFirst === true)
  const config = useMarkdownConfig(props)
  const { scope, className, style } = props
  const code = props.children.trim()

  const liveBoxNode = showLive && (
    <div className={styles.liveBox}>
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

  const spaceNode = showCode && showLive && (
    <div className={styles.space}/>
  )

  const codeBoxNode = showCode && (
    <Segment className={mdStyles.markdown} {...config}>
      {'```typescript\n' + code + '\n```'}
    </Segment>
  )

  return (
    <div 
      className={cn(styles.playground, config.dark && styles.dark, className)} 
      style={style}
    >
      {codeFirst ? (
        <Fragment>
          {codeBoxNode}
          {spaceNode}
          {liveBoxNode}
        </Fragment>
      ) : (
        <Fragment>
          {liveBoxNode}
          {spaceNode}
          {codeBoxNode}
        </Fragment>
      )}
      <EditBoxModal
        code={code}
        scope={scope}
        visible={showEditor}
        setVisible={setShowEditor}
      />
      <div className={styles.tools}>
        <div
          className={styles.tool}
          onClick={() => copyText(code)}
          title="copy code to clipboard"
        >⌘c</div>
        <div
          className={cn(styles.tool, !showLive && styles.disabled)}
          onClick={() => setShowLive(!showLive)}
          title={`${showLive ? 'hidden' : 'show'} live`}
        >⍵</div>
        <div
          className={cn(styles.tool, !showCode && styles.disabled)}
          onClick={() => setShowCode(!showCode)}
          title={`${showCode ? 'hidden' : 'show'} code`}
        >⍺</div>
        <div
          className={styles.tool}
          onClick={() => setCodeFirst(!codeFirst)}
          title={`${codeFirst ? 'live' : 'code'} first`}
        >{codeFirst ? '↑' : '↓'}</div>
        <div
          className={styles.tool}
          onClick={() => setShowEditor(true)}
          title="edit code and view effect"
        >⌥</div>
      </div>
    </div>
  )
}
