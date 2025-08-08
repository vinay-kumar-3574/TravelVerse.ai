import { AuthProvider as Provider } from '../../context/AuthContext'

const AuthProvider = ({ children }) => <Provider>{children}</Provider>

export default AuthProvider