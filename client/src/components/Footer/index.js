import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (

    <footer id="foot" className="w-100 mt-auto text-dark p-4 flex flex-col items-center">

      <div className="flex flex-col items-center mb-5 mr-8">
        {location.pathname !== '/home' && (
          <button
            className="bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-8 hover:animate-pulse"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className='mt-3 text-center ml-10 font-poppins'>&copy; {new Date().getFullYear()} - Persuade Me</h4>
      </div>
    </footer>
  );
};

export default Footer;
