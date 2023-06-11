import LobbyForm from '../components/LobbyForm';
import LobbyList from '../components/LobbyList';
import Auth from '../utils/auth';
import logo from '../images/PM-logo.png';
import { Link } from 'react-router-dom';


const Landing = () => {


  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <main className='flex justify-center items-center w-full h-full border-2 border-black'>
      <div className="w-full h-full text-dark py-3 flex flex-col bg-gradient-to-br from-gray-200 to-slate-700 items-center">
        <img className='shadow-xl shadow-indigo-300' src={logo} alt="logo" width={800} />
        <div className='absolute bottom-16'>
          {Auth.loggedIn() ? (
            <>
              <Link className="m-6 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/me">
                Profile
              </Link>
              <Link className="m-6 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/home">
                Home
              </Link>
              <button className="m-6 bg-gradient-to-r from-cyan-300 text- to-zinc-600 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="m-6 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/login">
                Login
              </Link>
              <Link className="m-6 bg-gradient-to-br from-cyan-300 text- to-zinc-600 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
        
      </div>
    </main>
  );
};

export default Landing;