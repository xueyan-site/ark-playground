import React, { useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { styles as themeStyles } from 'xueyan-react-style'
import { Drawer } from 'xueyan-react-drawer'
import theme from 'prism-react-renderer/themes/vsDark'
import { CloseIcon, FileIcon, PendingIcon } from 'xueyan-react-icon'
import { transformCode, copyText } from './tools'
import styles from './editor.scss'

export function EditBoxModal({
  code,
  scope,
  value,
  onChange
}: {
  code: string
  scope: Record<string, any>
  value: boolean
  onChange: (value: boolean) => void
}) {
  const [currCode, setCurrCode] = useState<string>(code)
  return (
    <Drawer
      size="90vh"
      direction="bottom"
      value={value}
      onChange={onChange}
      className={themeStyles.xrstyledark}
    >
      <LiveProvider
        language="tsx"
        noInline={true}
        code={currCode}
        scope={scope}
        transformCode={transformCode}
      >
        <div className={styles.xrplaygroundeditor}>
          <div className={styles.header}>
            <div
              className={styles.icon}
              title="copy code to clipboard"
              onClick={() => copyText(currCode)}
            >
              <FileIcon size="14px" />
            </div>
            <div
              className={styles.icon}
              title="reset code"
              onClick={() => setCurrCode(code)}
            >
              <PendingIcon size="14px" rotating={0} />
            </div>
            <div
              className={styles.icon}
              title="close edit box modal"
              onClick={() => onChange(false)}
            >
              <CloseIcon size="14px"/>
            </div>
          </div>
          <div className={styles.display}>
            <LivePreview />
            <LiveError className={styles.errormask}/>
          </div>
          <div className={styles.editor}>
            <LiveEditor 
              onChange={code => setCurrCode(code)}
              theme={theme}
              style={{ 
                minWidth: '100%',
                minHeight: '100%',
                width: 'max-content',
                backgroundColor: 'transparent'
              }}
            />
          </div>
        </div>
      </LiveProvider>
    </Drawer>
  )
}
