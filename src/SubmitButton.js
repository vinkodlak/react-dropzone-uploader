import React from 'react'
import PropTypes from 'prop-types'

const SubmitButton = (props) => {
  const {
    className,
    buttonClassName,
    style,
    buttonStyle,
    content,
    onSubmit,
    files,
  } = props

  const disabled =
    files.some(f => f.meta.status === 'uploading' || f.meta.status === 'preparing') ||
    !files.some(f => ['headers_received', 'done'].includes(f.meta.status))

  const handleSubmit = () => {
    onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }

  return (
    <div className={className} style={style}>
      <button
        className={buttonClassName}
        style={buttonStyle}
        onClick={handleSubmit}
        disabled={disabled}
      >
        {content}
      </button>
    </div>
  )
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  style: PropTypes.object,
  buttonStyle: PropTypes.object,
  content: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  extra: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    accept: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    minSizeBytes: PropTypes.number.isRequired,
    maxSizeBytes: PropTypes.number.isRequired,
    maxFiles: PropTypes.number.isRequired,
  }).isRequired,
}

export default SubmitButton