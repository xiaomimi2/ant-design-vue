import PropTypes from '../_util/vue-types'
import { initDefaultProps, getOptionProps } from '../_util/props-util'

const widthUnit = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
])

export const SkeletonParagraphProps = {
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([
    widthUnit,
    PropTypes.arrayOf(widthUnit),
  ]),
  rows: PropTypes.number,
}

const Paragraph = {
  props: initDefaultProps(SkeletonParagraphProps, {
    prefixCls: 'ant-skeleton-paragraph',
  }),
  methods: {
    getWidth (index) {
      const { width, rows = 2 } = this
      if (Array.isArray(width)) {
        return width[index]
      }
      // last paragraph
      if (rows - 1 === index) {
        return width
      }
      return undefined
    },
  },
  render () {
    const { prefixCls, rows } = getOptionProps(this)
    const rowList = [...Array(rows)].map((_, index) => {
      const width = this.getWidth(index)
      return <li key={index} style={{ width: typeof width === 'number' ? `${width}px` : width }} />
    })
    return (
      <ul
        class={prefixCls}
      >
        {rowList}
      </ul>
    )
  },
}

export default Paragraph
