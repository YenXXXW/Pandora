import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useLoginMutation } from "../features/UserApiSlice";
import { setCredentials } from "../features/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [invaldCredentials, setInvaldCredential] = useState(false)


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/posts")
    } catch (error) {
      console.log(error.status)
      if(error.status === 401) {
        setInvaldCredential(true)
        console.log(invaldCredentials)
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[80vh]">
      <form
        className="w-[300px] sm:w-[400px] flex flex-col gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="authButton flex items-center justify-center gap-2">LOG IN {isLoading ? <span className="loading loading-spinner loading-sm"></span>: <></>}</button>
        
      </form>
      <div className="w-[300px] sm:w-[400px]">
        <a href="/register" className="authButton w-full"><button className="w-full">Register</button></a>
        {
        invaldCredentials && (
          <p className="bg-red-400 py-3 text-white rounded-md mt-3 ">Invalid Username or Password</p>
          )
        }
      </div>
      
    </div>
  );
}
