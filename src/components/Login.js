import React from 'react';
import EntryForm from "./EntryForm";
import * as auth from '../utils/auth';

function Login () {
    return (
        <section className="entry">
            <EntryForm name={'login'} title={'Вход'} textButton={'Войти'} handleSubmit={''} />
        </section>
    )
}

export default Login