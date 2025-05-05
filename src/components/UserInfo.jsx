import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      navigate('/instruction');
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-purple-50 py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold font-mono text-slate-900 mb-6 text-center">Start Your Test</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label htmlFor="name" className="block text-slate-700 text-sm font-medium font-mono mb-2">
              Enter Your Name
            </label> */}
            <div className="relative">
              <input
                type="text"
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="peer font-mono py-2.5 sm:py-3 px-4 ps-11 block w-full bg-slate-50 border-1 border-slate-300 rounded-lg sm:text-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-300 focus:outline-none" placeholder="Enter your name" />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            {/* <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            /> */}
          </div>
          {/* <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button> */}
          <button
            type="submit"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium font-mono rounded-lg border border-gray-200 bg-slate-900 text-gray-100 shadow-2xs hover:bg-slate-800 focus:outline-hidden focus:bg-slate-500 disabled:opacity-50"
          >
            Continue
          </button>
        </form>
      </div>

    </div>
  );
};

export default UserInfo; 