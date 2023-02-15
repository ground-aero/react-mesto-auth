import React from 'react';
import {Navigate} from 'react-router-dom';

/** этот компонент принимает другой компонент в качестве пропса. он может взять неограниченное число пропсов и передать их новому компоненту*/
function ProtectedRoute({ children, loggedIn }) {//получаем компонент(ы), которые переданы через пропс element
    console.log(loggedIn)

    return loggedIn ? children : <Navigate to='/sign-in' />
 }

export default ProtectedRoute;
