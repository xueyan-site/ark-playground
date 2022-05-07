import React from 'react'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'xueyan-react'
import type { DocumentInfo } from 'xueyan-react-doc'

const DOCUMENTS: DocumentInfo<string,string>[] = [
  {
    value: 'a',
    label: '集一',
    contents: [
      {
        value: 'aa',
        label: '章一 介绍',
        content: () => import('./aa-introduction')
      },
      {
        value: 'ab',
        label: '章二 快速开始',
        content: () => import('./ab-start')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="zh"
      version={pkg.version}
      documents={DOCUMENTS}
      name={pkg.name}
      description="中文介绍"
    />
  )
}
