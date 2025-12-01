import React, { useId } from 'react'

function SelectComponent({
  options,
  label,
  className = "", 
  ...props
}, ref) {
  const Id = useId();

  return (
    <div
      className='w-full'
    >
      {label && 
        <label htmlFor={Id} className=''></label>
      }
      <select
        id={Id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}> {option} </option>
        ))}
      </select>

    </div>
  )
}

export default React.forwardRef(SelectComponent);