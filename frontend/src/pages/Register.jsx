import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      const res = await axios.post("http://localhost:5001/api/users/register",{name,email,password});
      if(res.status === 201){
        navigate("/login");
      }
      else{
        setError("Failed to create account");
      }
    }catch(error){
      setError(error.message);
    }finally{
      setLoading(false);
    }
  }

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
          <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Create Account</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex items-center gap-4'>
              <label htmlFor="name" className='w-1/3 text-gray-700 font-medium'>Name</label>
              <input 
                type="text" 
                id="name" 
                className='w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
              />
            </div>
            <div className='flex items-center gap-4'>
              <label htmlFor="email" className='w-1/3 text-gray-700 font-medium'>Email</label>
              <input 
                type="email" 
                id="email" 
                className='w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
              />
            </div>
            <div className='flex items-center gap-4'>
              <label htmlFor="password" className='w-1/3 text-gray-700 font-medium'>Password</label>
              <input 
                type="password" 
                id="password" 
                className='w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
              />
            </div>
            <div className='flex items-center gap-4'>
              <label htmlFor="confirmPassword" className='w-1/3 text-gray-700 font-medium'>Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className='w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all' 
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)} 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className='w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register