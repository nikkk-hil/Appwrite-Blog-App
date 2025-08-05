import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useDispatch } from "react-redux"


function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        authService.logoutAccount()   //always promise
            .then(() => {
                dispatch(logout())
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    }

  return (
    <button 
    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded full"
    onClick={handleLogout}>
        Logout
    </button>
  )
}

export default LogoutBtn