import React from 'react';
import {Link} from 'react-router-dom';
import EntryForm from "./EntryForm";

function Signup () {
    return (
        <section className="entry">
            <EntryForm name={'signup'} title={'Регистрация'} textButton={'Зарегистрироваться'}/>
            <p className="entry__quest">Уже зарегистрированы? <Link className="entry__link">Войти</Link></p>
        </section>
    )
}

export default Signup