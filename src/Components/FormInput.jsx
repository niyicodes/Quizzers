import React from 'react'

const FormInput = ({type, name, placeholder,label, value, handleChange}) => {
  return (
    <div className='flex flex-col gap-2 mb-2'>
     <label htmlFor={name} className="font-bold text-contessa-600 text-lg">{label}</label>
     <input type={type} name={name} id={name} value={value} placeholder={placeholder} onChange={handleChange} className="py-2 outline-none border-4 border-waikawa-gray-900 px-3 text-waikawa-gray-700 font-bold rounded-lg"/>
    </div>
  )
}

export default FormInput