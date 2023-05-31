import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Validation from './loginvalidation';

function login() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (Object.keys(errors).length === 0) {
            fetch('http://127.0.0.1:5000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })
              .then(response => {
                if (response.ok) {
                  console.log('Login successful');
                  // Handle the successful login
                } else {
                  console.log('Login failed');
                  // Handle the failed login
                }
              })
              .catch(error => {
                console.log('An error occurred during login:', error);
                // Handle the error
              });
          }
        };
     
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Login</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder = "Enter email" name = "email" onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span> }
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' name = "password" onChange={handleInput} className='form-control rounded-0' />
                    {errors.password && <span className='text-danger'>{errors.password}</span> }
                </div>
                <button type = 'submit'className='btn btn-success w-100'><strong>Login</strong></button>
                <Link to = "/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default login