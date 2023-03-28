import { AxiosInstance } from 'axios';
import React, { Component, MouseEvent, useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from "../../hooks/http-error-handler"

// const withErrorHandler = <T extends Function, P>(WrappedComponent: T, axios: AxiosInstance) => {
//     return (props: P) => {

//         const [error, clearError] = useHttpErrorHandler(axios)

//         return (
//             <Aux>
//                 <Modal
//                     show={error ? true : false}
//                     modalClosed={clearError as () => void}
//                 >
//                     {error && error.toString()}
//                 </Modal>
//                 <WrappedComponent {...props} />
//             </Aux>
//         );
//     }
// };


// export default withErrorHandler;








// function useHttpErrorHandler(axios: AxiosInstance): [any, any] {
//     throw new Error('Function not implemented.');
// }
// import { AxiosInstance } from 'axios';
// import React, { Component } from 'react';

// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../Aux/Aux';


const withErrorHandler = <T extends Function, P>(WrappedComponent: T, axios: AxiosInstance) => {
    interface Props {
        show: ""
    }
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios)
        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;