import { AnyAction } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../containers/shared/utility';



interface State {
    token: string | null;
    userId: string | null;
    error: string | null;
    loading: boolean;
    authRedirectPath: string;
}


interface authTypeAction {
    path: string;
    userId: string;
    type: string;
    error: null | string;
    loading: boolean;
    idToken: string
}



// interface authSuccess {
//     type: string;

//     error: null | string,
//     loading: boolean;
//     idToken: string
//     userId: string

// }

// interface authFail {
//     type: string;
//     error: string;
//     laoding: boolean;

//     idToken: string
//     userId: string
// }

// interface authLogout {
//     type: string
//     token: string;
//     userId: string;
// }

// interface setAuthRedirectPath {
//     path: string;
//     type: string;
//     error: string;
// }



// export type Action = authStart | authSuccess | authFail | setAuthRedirectPath

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state: State, action: authTypeAction) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: State, action: authTypeAction) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state: State, action: authTypeAction) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state: State, actio: authTypeAction) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state: State, action: authTypeAction) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state: State = initialState, action: authTypeAction) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;