import LobbyForm from '../components/LobbyForm';
import LobbyList from '../components/LobbyList';
import Auth from '../utils/auth';
import logo from '../images/PM-logo.png';
import { Link } from 'react-router-dom';


const Home = () => {


  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <main >
      <div className=" text-dark py-3 flex flex-col bg-gradient-to-br from-gray-200 to-slate-700 items-center">
        <div className="flex-column justify-space-between-lg justify-center text-center">
          <h1 className="m-0 mb-10 text-black text-7xl">
            Debate Room
          </h1>
        </div>
        <div className="flex flex-col items-center col-12 col-md-10 my-3 w-4/5">
          <LobbyForm />
          <LobbyList />
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
            </>
          ) : (
            <>
              <Link className="bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse m-2" to="/login">
                Login
              </Link>
              <Link className="m-2 bg-gradient-to-br from-cyan-300 text- to-zinc-600 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
