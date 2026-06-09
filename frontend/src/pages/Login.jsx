import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[75vh] flex items-center justify-center px-4'>
      <div className='flex flex-col gap-4 m-auto items-stretch p-8 w-full max-w-md bg-white border border-slate-100 rounded-3xl text-slate-600 text-sm shadow-md'>
        
        {/* Logo / Badge */}
        <div className="flex flex-col items-center gap-1.5 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="text-2xl font-bold">+</span>
          </div>
          <p className="text-slate-800 font-extrabold text-lg mt-1">
            {state === 'Sign Up' ? 'Join CureLink Network' : 'Access CureLink Network'}
          </p>
          <p className="text-xs text-slate-400 font-medium">Please {state === 'Sign Up' ? 'register' : 'sign in'} to consult verified doctors.</p>
        </div>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='bg-slate-50 border border-slate-200/80 rounded-xl w-full p-2.5 mt-1 focus:outline-none focus:border-primary text-slate-700 font-medium text-sm' 
              type="text" 
              placeholder="e.g. Rahul Sharma"
              required 
            />
          </div>
        )}

        <div className='w-full'>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='bg-slate-50 border border-slate-200/80 rounded-xl w-full p-2.5 mt-1 focus:outline-none focus:border-primary text-slate-700 font-medium text-sm' 
            type="email" 
            placeholder="name@example.com"
            required 
          />
        </div>

        <div className='w-full'>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='bg-slate-50 border border-slate-200/80 rounded-xl w-full p-2.5 mt-1 focus:outline-none focus:border-primary text-slate-700 font-medium text-sm' 
            type="password" 
            placeholder="••••••••"
            required 
          />
        </div>

        <button className='bg-primary text-white w-full py-3 rounded-xl text-sm font-bold shadow-md shadow-primary/10 hover:bg-teal-800 transition-all mt-4'>
          {state === 'Sign Up' ? 'Create Free Account' : 'Sign In'}
        </button>

        <div className="h-px bg-slate-100 my-2"></div>

        {state === 'Sign Up' ? (
          <p className="text-center text-xs text-slate-400 font-semibold">
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer hover:text-teal-800 font-bold'>
              Sign in here
            </span>
          </p>
        ) : (
          <p className="text-center text-xs text-slate-400 font-semibold">
            New to CureLink?{' '}
            <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer hover:text-teal-800 font-bold'>
              Register here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login