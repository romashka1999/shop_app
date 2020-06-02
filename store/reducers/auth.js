import { SIGN_UP, AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return state;
        case AUTHENTICATE:
            console.log('SIGN_IN', action)
            return {
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            console.log('asssaaa')
            return {
                ...state,
                token: null,
                userId: null
            };
        default:
            return state;
    }
}