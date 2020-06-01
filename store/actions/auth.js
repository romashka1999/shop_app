export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMih4DOJGO6uFzD0VPyQzpgC1d-p3cRy0',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorResponseData = await response.json();
            throw new Error(errorResponseData.error.message);
        }

        const responseData = await response.json();
        dispatch({ type: SIGN_UP });
    }
}

export const signIn = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMih4DOJGO6uFzD0VPyQzpgC1d-p3cRy0',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });



        if(!response.ok) {
            const errorResponseData = await response.json();
            throw new Error(errorResponseData.error.message);
        }

        const responseData = await response.json();

        const token = responseData.idToken;
        const userId = responseData.localId;
        const refreshToken = responseData.refreshToken;

        dispatch({ type: SIGN_IN, token: token, userId: userId });
    }
}