

import { useState } from 'react';
import AppNavigation from './src/navigation/Appnavigation';

export default function App() {

  const [userName, setUserName] = useState('');

  function handleLogin(name) {
    setUserName(name);
  }

  return (
   <AppNavigation
    onLogin={handleLogin}
   />   
  );
}