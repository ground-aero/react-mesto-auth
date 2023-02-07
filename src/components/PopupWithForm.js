import React from 'react';

function PopupWithForm({ name, title, textButton, isOpen, onClose, children, onSubmit }) {
    // console.log(children)

    function onSubimBtn() {

    }

    return (

        <div className={`popup popup_type_${ name } ${ isOpen ? 'popup_opened' : '' }`}>
            <div className="popup__container">
                <button className="popup__btn-close opacity-transition" onClick={ onClose } type="button"
                        aria-label="close"></button>
                <form onSubmit={onSubmit} action="src/components/App" className="popup__form" name={ name } >
                    <h2 className="popup__title">{ title }</h2>
                    { children }
                    <button onClick={onSubimBtn} type="submit"
                            className="btn btn_submit opacity-transition">{ textButton }
                    </button>
                </form>
            </div>
        </div>

    )
}

export default PopupWithForm