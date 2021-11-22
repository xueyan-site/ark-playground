import React, { useRef, useEffect, useState } from 'react'
import cn from 'classnames'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { transformCode, copyText } from './tools'
import { AnyObject } from './types'
import styles from './index.scss'

enum VISIBLE_STATE {
  NONE = 0,
  HIDDEN = 1,
  VISIBLE = 2
}

const VISIBLE_CHANGED_TIME = 200

function useVisibleState(visible: boolean) {
  const [state, setState] = useState<VISIBLE_STATE>(VISIBLE_STATE.NONE)
  const timerRef = useRef<number|undefined>()
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
    if (visible) {
      setState(VISIBLE_STATE.HIDDEN)
      timerRef.current = setTimeout(() => {
        setState(VISIBLE_STATE.VISIBLE)
      }, VISIBLE_CHANGED_TIME)
    } else {
      setState(VISIBLE_STATE.HIDDEN)
      timerRef.current = setTimeout(() => {
        setState(VISIBLE_STATE.NONE)
      }, VISIBLE_CHANGED_TIME)
    }
  }, [visible])
  return state
}

export default function EditBoxModal({
  code,
  scope,
  visible,
  setVisible
}: {
  code: string
  scope: AnyObject
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const state = useVisibleState(visible)
  const [currCode, setCurrCode] = useState<string>(code)
  return state === VISIBLE_STATE.NONE ? null : (
    <div className={cn(styles.modal, state === VISIBLE_STATE.HIDDEN && styles.hidden)}>
      <LiveProvider
        language="tsx"
        noInline={true}
        code={currCode}
        scope={scope}
        transformCode={transformCode}
      >
        <div className={styles.editBox}>
          <div className={styles.editWindow}>
            <div className={styles.editInner}>
              <div className={styles.runCode}>
                <LivePreview />
                <LiveError className={styles.runCodeErr} />
              </div>
              <LiveEditor 
                className={styles.editCode}
                onChange={code => setCurrCode(code)}
              />
            </div>
          </div>
          <div className={styles.editTools}>
            <div
              className={styles.tool}
              onClick={() => copyText(currCode)}
              title="copy code to clipboard"
            >⌘c</div>
            <div
              className={styles.tool}
              onClick={() => setCurrCode(code)}
              title="reset code"
            >⏎</div>
            <div
              className={styles.tool}
              onClick={() => setVisible(false)}
              title="close edit box modal"
            >✕</div>
          </div>
        </div>
      </LiveProvider>
    </div>
  )
}
