import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });
      console.log(Auth.loggedIn())
      Auth.login(data.addProfile.token);
      console.log(Auth.loggedIn())
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-col flex items-center mb-4 col-lg-10 mx-auto">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 text-center font-poppins font-bold">Sign Up:</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/home">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="max-w-xl rounded-xl overflow-hidden shadow-lg shadow-black">
                  <div className="px-12 py-4 bg-slate-400">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700 text-center mb-2">Name:</span>
                      <input
                        className="form-input mr-4 text-center mb-2mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        placeholder="Profile name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700 text-center mt-2 mb-2">Email:</span>
                      <input
                        className="form-input mr-4 text-center mb-2mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700 text-center mb-2 mt-2">Password:</span>
                      <input
                        className="form-input mr-4 text-center mb-2mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                      />
                    </label>
                    <button
                      className="mb-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 mt-4 border-none rounded-md ml-14 hover:animate-pulse"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
