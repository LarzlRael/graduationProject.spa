import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'
interface Props {
  children: any
  content: string
  interactive?: boolean
  /* trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  theme?: 'light' | 'dark'
}
const ToolTip = ({
  children,
  content,
  interactive = false,
  /* trigger, */
  theme = 'light',
  placement,
}: Props) => {
  return (
    <Tippy
      animation="scale"
      /* trigger={trigger ? trigger : 'mouseenter focus'} */
      placement={placement ? placement : 'top'}
      interactive={interactive ? true : false}
      content={
        <span
          style={{
            fontSize: '0.9rem',
            /* fontWeight: '500', */
            color: 'var(--primary-color)',
          }}
        >
          {content}
        </span>
      }
      theme={theme}
    >
      {children}
    </Tippy>
  )
}

export default ToolTip
