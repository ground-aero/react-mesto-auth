import React from 'react';

function EntryForm (props) {
    const { name, title, textButton } = props; //props из Login & Register

    return (
        <form className="entry_form" name={ name }>
            {/*<p className="footer__autho">&copy; {new Date().getFullYear()} Mesto Russia</p>*/}
            <div className="entry__wrap-form">
                <h2 className="entry__title">{ title }</h2>
                <input className="entry__input" type="email" placeholder="Email" minLength="2"/>
                <input className="entry__input" type="password" placeholder="password" minLength="2"/>
            </div>
            <button className="entry__btn-submit" type="submit">{ textButton }</button>
        </form>
    )
}

export default EntryForm