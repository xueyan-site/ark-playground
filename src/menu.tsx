import React from 'react'
import cn from 'classnames'
import styles from './menu.scss'

export interface MenuOption {
  icon: React.ReactNode
  title?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Menu({
  className,
  options
}: {
  className?: string
  options: MenuOption[]
}) {
  return (
    <div className={cn(styles.xrplaygroundmenu, className)}>
      {options.map((option, index) => (
        <div
          key={index}
          className={cn(styles.menuitem, option.disabled && styles.disabled)}
          title={option.title}
          onClick={option.onClick}
        >
          {option.icon}
        </div>
      ))}
    </div>
  )
}
