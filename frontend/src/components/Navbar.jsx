import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/UserApiSlice";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApicall] = useLogoutMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try{
      await logoutApicall().unwrap();
      dispatch(logout())
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              ...
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              {
                userInfo 
                ?
                  <>

                    <li  className="cursor-pointer" onClick ={logoutHandler} >
                      Logout
                    </li>
                  </> 
                :
                  <>
                    <a href="/login"><li className="authButton mb-3">LogIn</li></a>
                    <a href="/register"><li className="authButton">Register</li></a>
                  </>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
