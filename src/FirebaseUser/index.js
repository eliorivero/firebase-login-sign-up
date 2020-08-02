import React, { useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';

const useField = () => {
	const [ value, setValue ] = useState( '' );
	return { value, onChange: x => setValue( 'string' === typeof x ? x : x.target.value ) };
};

function FirebaseUser ( { action = 'signin' }) {
    const email = useField();
    const password = useField();
    const [ auth, setAuth ] = useState( null );
    const [ error, setError ] = useState( '' );
    const firebase = useFirebaseApp();
    const setReceivedData = data => setAuth( data );
    const setReceivedError = error => setError( error.message );

    const signIn = e => {
        e.preventDefault();
        setError( '' );
        firebase.auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then( setReceivedData )
            .catch( setReceivedError );
    };
    
    const signUp = e => {
        e.preventDefault();
        setError( '' );
        firebase.auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then( setReceivedData )
            .catch( setReceivedError );
    };

    const manage = 'signin' === action 
        ? {
            success: `Logged in as ${ auth?.user.email ?? '' }`,
            method: signIn,
            label: 'Sign In'
        }
        : {
            success: `Signed up as ${ auth?.user.email ?? '' }`,
            method: signUp,
            label: 'Sign Up'
        };

    return (
        <div>
            {
                auth ? (
                    <p>{ manage.success }</p>
                ) : (
                    <>
                        <form onSubmit={ manage.method }>
                            <input { ...email } placeholder="email" />
                            <input { ...password } type="password" placeholder="password" />
                            <button type="submit">{ manage.label }</button>
                            {
                                error && <p>{ error }</p>
                            }
                        </form>
                    </>
                )
            }
        </div>
    );
}

export default FirebaseUser;
