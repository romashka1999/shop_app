import { SIGN_UP, SIGN_IN } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return state;
        case SIGN_IN:
            console.log('SIGN_IN', action)
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state;
    }
}