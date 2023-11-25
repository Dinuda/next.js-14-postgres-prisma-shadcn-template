import React, { FC, forwardRef } from 'react'
import { HeaderProps } from './types'

const ID = 'Header'


export const Header: FC<HeaderProps> = forwardRef<
  HTMLDivElement,
  HeaderProps
>(({ 'data-selector': dataSelector = ID, className, 'aria-label': ariaLabel }, ref) => {
  return (
    <div
      className={className}
      aria-label={ariaLabel}
      data-selector={dataSelector}
      ref={ref}
    >
    Header Content
    </div>
  )
})

Header.displayName = 'Header'

export default Object.assign(Header, {
  ID,
}) as typeof Header & {
  ID: string
}