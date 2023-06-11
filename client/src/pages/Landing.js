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
    <main className='flex justify-center items-center w-full '>
      <div className="w-full text-dark py-3 flex flex-col bg-gradient-to-br from-gray-200 to-slate-700 items-center min-h-screen">
        <img className='shadow-xl shadow-indigo-300' src={logo} alt="logo" width={800} />
        <div className='mt-8'>
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
          <div class="max-w-xl rounded-xl overflow-hidden mt-32 shadow-lg shadow-black">
            <div class="px-12 py-4 bg-slate-300">
              <div class="font-bold text-4xl mb-2 text-center font-poppins">Persuade Me</div>
              <p class="text-gray-700 text-base text-center font-semibold italic">
                A live chat debate platform. 
              </p>
              <p className='text-center pt-8 font-semibold font-lora'>Make a profile to create and join a debate lobby. Invite other users and have a friendly dabate! Make sure to keep the debates clean and orderly. Use the above signup button to create an account.</p>
              <p className='text-center pt-8 font-semibold font-lora'> Users who create a debate lobby are set as admin by default.</p>
            </div>
          </div>
          <h4 className='mt-2 text-center font-poppins absolute bottom-10'>&copy; {new Date().getFullYear()} - Persuade Me</h4>
        </div>
    </main>
  );
};

export default Landing;
