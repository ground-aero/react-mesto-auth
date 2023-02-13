import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import EntryForm from "./EntryForm";
import * as auth from '../utils/auth';

function Register ({handleRegister}) {//@props из App.js

    return (
        <section className="entry">
            <EntryForm name={'signup'} title={'Регистрация'} textButton={'Зарегистрироваться'} handleSubmit={handleRegister} />
            <p className="entry__quest">Уже зарегистрированы? <Link className="entry__link">Войти</Link></p>
        </section>
    )
}

export default Register