import React from 'react';
import EntryForm from "./EntryForm";

function Login () {
    return (
        <section className="entry">
            <EntryForm name={'login'} title={'Вход'} textButton={'Войти'}/>
        </section>
    )
}

export default Login