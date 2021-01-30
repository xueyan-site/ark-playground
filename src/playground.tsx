import React, { Fragment, useRef, useState } from 'react'
import classNames from 'classnames'
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import { MarkdownSegment, useMarkdownConfig, markdownStyles } from 'xueyan-react-markdown'
import { transformCode, copyText } from './tools'
import { PlaygroundProps } from './types'
import EditBoxModal from './editor'
import styles from './index.module.scss'

export default function Playground(props: PlaygroundProps) {
  const code = props.code.trim()
  const { scope, className, style } = props
  const [showCode, setShowCode] = useState<boolean>(props.showCode !== false)
  const [showLive, setShowLive] = useState<boolean>(props.showLive !== false)
  const [showEditor, setShowEditor] = useState<boolean>(false)
  const [codeFirst, setCodeFirst] = useState<boolean>(props.codeFirst === true)
  const config = useMarkdownConfig(props)

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
    <MarkdownSegment className={markdownStyles.markdown} {...config}>
      {'```typescript\n' + code + '\n```'}
    </MarkdownSegment>
  )

  return (
    <div className={classNames(styles.playground, config.dark && styles.dark, className)} style={style}>
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
          className={classNames(styles.tool, !showLive && styles.disabled)}
          onClick={() => setShowLive(!showLive)}
          title={`${showLive ? 'hidden' : 'show'} live`}
        >⍵</div>
        <div
          className={classNames(styles.tool, !showCode && styles.disabled)}
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
