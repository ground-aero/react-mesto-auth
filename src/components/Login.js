import React from 'react';
import EntryForm from "./EntryForm";
import * as auth from '../auth'

function Login () {
    return (
        <section className="entry">
            <EntryForm name={'login'} title={'Вход'} textButton={'Войти'}/>
        </section>
    )
}

export default Login