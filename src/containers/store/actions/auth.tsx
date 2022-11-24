import * as actionTypes from './actionTypes'

export const authStart = () => {
    alert("sdfdf")
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email: string, password: string) => {
    return dispatch => {
        //.... athenticate the user
        dispatch(authStart());

    }
}