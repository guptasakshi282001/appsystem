import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Validation from './signupvalidation'
import axios from 'axios'

function Signup() {
    // eslint-disable-next-line no-undef
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    // eslint-disable-next-line react-hooks/rules-of-hooks, no-undef
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        axios.post('http://127.0.0.1:5000/register', values)
        .then(response => {
        console.log(response);
        // Handle the response from the API as needed
        })
        .catch(error => {
        console.log(error);
        // Handle the error from the API as needed
        });


    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Signup</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder = "Enter name" name = "name" onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span> }
                </div>
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
                <button type='submit' className='btn btn-success w-100'><strong>Signup</strong></button>
                <Link to = "/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup