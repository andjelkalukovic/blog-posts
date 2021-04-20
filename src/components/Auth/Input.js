import React from 'react'

const Input = ({name, handleChange, placeholder, type, handleShowPassword }) => {
    return (
        <div>
            <input 
            name={name} 
            onChange={handleChange} 
            required 
            placeholder={placeholder} 
            type={type}
            className='login-input'
            
            //  = {name === 'password' ? (
            //      <span onClick={handleShowPassword}>
            //          {type === 'password' ? 'Otvoreno' : 'Zatvoreno'}
            //      </span>
            //  ) : null }
            />
        </div>

    )
}

export default Input;