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
            throw new Error('Something went wrong');
        }

        const responseData = await response.json();
        console.log(responseData);
        dispatch({ type: SIGN_UP });
    }
}

export const signIn = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=signUp?key=AIzaSyBMih4DOJGO6uFzD0VPyQzpgC1d-p3cRy0',{
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
            throw new Error('Something went wrong');
        }

        const responseData = await response.json();
        console.log(responseData);
        dispatch({ type: SIGN_IN });
    }
}