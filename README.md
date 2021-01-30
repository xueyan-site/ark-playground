# xueyan-react-playground

xueyan-react-playground 是一个react包。  
xueyan-react-playground is a react package.  

本包创建自 xueyan <yang@xueyan.site>。  
The project created by xueyan <yang@xueyan.site>.  

## 下载 Install

```bash
# 如果你使用的是NPM：
# if you use NPM: 
npm i xueyan-react-playground

# 如果你使用的是Yarn：
# if you use Yarn: 
yarn add xueyan-react-playground
```

## 示例 Example

```ts
import React, { useState } from 'react'
import Playground from 'xueyan-react-playground'

const code = `
import React, { useState } from 'react'
import Switch from 'xueyan-react-playground'

export default function UseSwitch() {
  const [state, setState] = useState<boolean>(true)
  return (
    <div onClick={() => setState(!state)}>
      {state ? 'opening' : 'closed'}
    </div>
  )
}
`

const scope = { React, useState }

<Playground code={code} scope={scope} />
```
