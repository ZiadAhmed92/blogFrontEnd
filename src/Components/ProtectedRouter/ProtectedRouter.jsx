
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRouter = ({children}) => {

 if(localStorage.getItem("userToken")){
   return children
 }else{
  return <Navigate to="/" />
 }
}

export default ProtectedRouter