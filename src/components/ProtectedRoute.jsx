import { Navigate } from 'react-router-dom'
import Preloader from './Preloader/Preloader';

export default function ProtectedRoute({ isLoggedIn, children }) {
    return (
        isLoggedIn ? children : <Navigate to="/signin" />
    )
}