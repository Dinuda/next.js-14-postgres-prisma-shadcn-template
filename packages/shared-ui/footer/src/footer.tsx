import React, { FC, forwardRef } from 'react'
import { FooterProps } from './types'

const ID = 'Footer'


export const Footer: FC<FooterProps> = forwardRef<
  HTMLDivElement,
  FooterProps
>(({ 'data-selector': dataSelector = ID, className, 'aria-label': ariaLabel }, ref) => {
  return (
    <div
      className={className}
      aria-label={ariaLabel}
      data-selector={dataSelector}
      ref={ref}
    >
    Footer Content
    </div>
  )
})

Footer.displayName = 'Footer'

export default Object.assign(Footer, {
  ID,
}) as typeof Footer & {
  ID: string
}