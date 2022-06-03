import { transpile } from 'typescript'

const TS_OPTIONS = {
  noImplicitUseStrict: true,
  target: 3,
  jsx: 2
}

export function transformCode(code: string): string {
  let funcName = ''
  code = code.replace(/\s*import(.|\n)*from\s+(.|\\n)*?\s+/g, '')
  code = code.replace(/export\s+default\s+function\s+(\w*)/g, (_match, arg1) => {
    funcName = arg1
    return 'function ' + arg1
  })
  if (funcName) {
    return transpile(code + `\n render(<${funcName}/>)`, TS_OPTIONS)
  } else {
    return `render(<div>Please write code likes “export default function Xxx”</div>)`
  }
}

export function copyText(text: string): boolean {
  if (document.execCommand) {
    const textDom = document.createElement('textarea')
    textDom.innerHTML = text
    textDom.style.opacity = '0'
    textDom.style.position = 'fixed'
    textDom.style.left = '-100%'
    textDom.style.top = '-100%'
    document.body.appendChild(textDom)
    textDom.select()
    document.execCommand('Copy')
    document.body.removeChild(textDom)
    return true
  } else {
    window.alert('The browser is not support copy to clipboard！')
    return false
  }
}
