import React from 'react';

function InfoTooltip ({ name, isOpen, onClose, message }) {


    return (

        <div className={`popup popup_type_${ name } ${ isOpen && 'popup_opened'} `}>

            <span className="popup__container">
                 <button
                     className="popup__close-img popup__btn-close opacity-transition"
                     onClick={ onClose } type="button"></button>

               <h3 className="popup__subtitle">{ message }</h3>

            </span>

        </div>


    )

}

export default InfoTooltip