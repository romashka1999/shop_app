import { SIGN_UP, AUTHENTICATE } from "../actions/auth";

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
        default:
            return state;
    }
}