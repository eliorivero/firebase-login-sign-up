import React, { useState } from 'react';
import FirebaseUser from './FirebaseUser';

function App() {
  const [ signInOrUp, setSignInOrUp ] = useState( '' );
  return (
    <div className="App">
      <h1>Firebase login</h1>
      {
        signInOrUp ? (
          <FirebaseUser action={ signInOrUp } />
        ) : (
          <>
            <button type="button" onClick={ () => setSignInOrUp( 'signin' ) } >Log in with existing user</button>
            <button type="button" onClick={ () => setSignInOrUp( 'signup' ) } >Create a new user</button>
          </>
        )
      }
    </div>
  );
}

export default App;
