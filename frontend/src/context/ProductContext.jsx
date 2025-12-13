import {createContext,useEffect,useState} from 'react'
import {toast} from 'react-hot-toast'
import user from '../../store/userSlice.js'
import {useSelector} from 'react-redux'
export const Context = createContext(null);

let backendUrl = import.meta.env.VITE_BACKEND_URL
const ProductContext = ({children}) => {

    const user = useSelector(state=>state?.user?.user)

    const [userDetails,setUserDetails]=useState(null)
    const [updateUser,setUpdateUser] = useState({
        _id: "",      
        name: "",
        email: "",
        role: ""
             
    })

    const [allUsers,setAllUsers] = useState([])

    const getAllUsers = async()=> {
        try {
            
            const responseData = await fetch(`${backendUrl}/user/all-users`,{
                method: "GET",
                credentials: "include",
            })
            const response = await responseData.json()
            if(responseData.ok){
                setAllUsers(response.data)
                toast.success('Users fetched Successfully')
            }else{
                toast.error(toast.message || "Failed to fetch")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // update user
    const updateUserData = async (id, role) => {
  if (!id) {
    toast.error("No user selected to update");
    return;
  }

  try {
    const responseData = await fetch(`${backendUrl}/user/update-user`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        role, // only send the role if that's all you want to update
      }),
    });

    const response = await responseData.json();

    if (responseData.ok) {
      toast.success(response.message);
      getAllUsers(); // refresh the list after update
    } else {
      toast.error(response.message || "Failed to update");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

    

    const value ={
        userDetails,
        setUserDetails,
        allUsers,
        setAllUsers,
        getAllUsers,
        setUpdateUser,
        updateUserData
    }

    return(
        <Context.Provider value={value}>
        {children}
        </Context.Provider>
    )
}

export default ProductContext