import s from './Login.module.css'
import React, {useState} from "react";
import UserService from "../../../services/user.service";
import toast, {Toaster} from "react-hot-toast";
const Login = ({setUser}) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const [attempts, setAttempts] = useState(5)

    const checkUser = () => {
        UserService.checkUser({
            username,
            password
        }).then(res => {
            if(attempts === 0) {
                return toast.error(`No more attempts to log in. \n Refresh the browser`)
            }
            if(res.role) {
                setUser(res.role)
                localStorage.setItem('username', res.username)
                localStorage.setItem('password', res.password)
                localStorage.setItem('role', res.role)
            } else {
                setAttempts((prevState => prevState - 1))
                toast.error(`User not found \n ${attempts} attempts remaining`)
            }
        })
    }

    const role = localStorage.getItem('role')
    if(role) {
        setUser(role)
    } else {
        return (
            <div className={s.background}>
                <div><Toaster/></div>
                <div className={s.container}>
                    <div className={s.title}>Log In</div>
                    <div className={s.message}>Only for Arcadia crew</div>
                    <form className={s.form}>
                        <input type="text" placeholder='Username'
                               onChange={e => setUsername(e.target.value)}
                               value={username}/>
                        <input type="password" placeholder='Password'
                               onChange={e => setPassword(e.target.value)}
                               value={password}/>
                    </form>
                    <button onClick={checkUser} disabled={!username || !password} className={s.button}>SignIn</button>
                </div>
            </div>
        )
    }
}

export default Login