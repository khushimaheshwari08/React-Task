import { actionTypes } from '../actionTypes';

export default function authReducer(state = {
    isUserLoggedIn: undefined,
}, action) {
    switch (action.type) {

        case actionTypes.LOGIN_USER_METHOD:
            return { ...state, isUserLoggedIn: true };
            break;
        case actionTypes.LOGOUT_USER_METHOD:
            return { ...state, isUserLoggedIn: false };
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}