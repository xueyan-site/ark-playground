import React, { useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { styles as xrss } from 'xueyan-react-style'
import { Drawer } from 'xueyan-react-drawer'
import theme from 'prism-react-renderer/themes/vsDark'
import { CloseIcon, FileIcon, PendingIcon } from 'xueyan-react-icon'
import { transformCode, copyText } from './tools'
import { Menu } from './menu'
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
  const [rotating, setRotating] = useState<number>(0)
  return (
    <Drawer
      size="92vh"
      direction="bottom"
      value={value}
      onChange={onChange}
      className={xrss.xrstyledark}
    >
      <LiveProvider
        language="tsx"
        noInline={true}
        code={currCode}
        scope={scope}
        transformCode={transformCode}
      >
        <div className={styles.xrplaygroundeditor}>
          <Menu
            className={styles.header}
            options={[
              {
                icon: <FileIcon />,
                title: 'copy code to clipboard',
                onClick: () => copyText(currCode)
              },
              {
                icon: <PendingIcon rotating={rotating} />,
                title: 'reset code',
                onClick: () => {
                  setRotating(300)
                  setCurrCode(code)
                  setTimeout(() => {
                    setRotating(0)
                  }, 300)
                }
              },
              {
                icon: <CloseIcon />,
                title: 'close edit box modal',
                onClick: () => onChange(false)
              }
            ]}
          />
          <div className={styles.live}>
            <LivePreview />
            <LiveError className={styles.errormask}/>
          </div>
          <div className={styles.code}>
            <LiveEditor 
              onChange={setCurrCode}
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
