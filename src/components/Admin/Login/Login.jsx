import s from './Login.module.css'
import {useState} from "react";
const Login = ({setUser}) => {

    const [username, setUsername] = useState('admin')

    return (
        <div className={s.background}>
            <div className={s.container}>
                <div className={s.title}>LogIn</div>
                <form className={s.form}>
                    <input type="text" placeholder='Enter your name'
                           onChange={e => setUsername(e.target.value)}
                           value={username}/>
                </form>
                <button onClick={() => setUser(username)} className={s.button}>SignIn</button>
            </div>
        </div>
    )
}

export default Login