import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

function Loginforced({ signOut, user, onClose }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={() => { signOut(); onClose(); }}>Sign out</button>
    </>
  );
}

export default withAuthenticator(Loginforced);