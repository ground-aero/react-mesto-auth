import React from 'react';
import {useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth';

function EntryForm ({ name, title, textButton, handleSubmit }) {//props из Login, & Register
    const navigate = useNavigate();

    // const [formValue, setFormValue] = React.useState({
    //     email: '',
    //     password: '',
    // })
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //
    //     setFormValue({
    //         ...formValue,
    //         [name]: value
    //     });
    // }
    const handleChangeEmail = (e) => {
        console.log(email)
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        console.log(password)
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // здесь обработчик регистрации
        // if (!password || !email) {
        //     return;
        // }
        console.log(password, email)
        handleSubmit(password, email)
        // auth.register(password, email)
        //     .then((res) => {
        //         navigate('./sign-in', {replace: true})
        //     })
        //     .then((res) => {
        //         console.log(res) //При успешной регистрации второй обработчик then вернёт токен JWT
        //     })
    }


    return (
        <form className="entry_form" name={ name } onSubmit={onSubmit}>
            {/*<p className="footer__autho">&copy; {new Date().getFullYear()} Mesto Russia</p>*/}
            <div className="entry__wrap-form">
                <h2 className="entry__title">{ title }</h2>
                <input className="entry__input" onChange={handleChangeEmail} value={email} type="email" placeholder="Email" minLength="2"/>
                <input className="entry__input" onChange={handleChangePassword} value={password} type="password" placeholder="password" minLength="2"/>
            </div>
            <button className="entry__btn-submit" onSubmit={onSubmit} type="submit">{ textButton }</button>
        </form>
    )
}

export default EntryForm