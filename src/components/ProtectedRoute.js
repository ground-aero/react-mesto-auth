import React from 'react';
import {Navigate} from 'react-router-dom';

/** этот компонент принимает другой компонент в качестве пропса. он может взять неограниченное число пропсов и передать их новому компоненту*/
const ProtectedRoute = ({ component: Component, ...props }) => {//получаем компонент(ы), которые переданы через пропс element
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' replace/>
    )}

export default ProtectedRoute
