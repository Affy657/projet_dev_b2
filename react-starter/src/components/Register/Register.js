import React, { useState, useRef } from 'react';
import axios from 'axios';

import './Register.css';

export default function Register({ onRegister, onError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  function usernameHandler(evt) {
    if (loading) return;
    setUsername(evt.target.value);
    onError(null);
  }

  function passwordHandler(evt) {
    if (loading) return;
    setPassword(evt.target.value);
    onError(null);
  }

  function handlerSubmit(evt) {
    evt.preventDefault();
    if (loading) return;
    setLoading(true);

    axios
      .post('http://localhost:3001/auth/register', {
        username,
        password,
      })
      .then((response) => {
        onRegister();
      })
      .catch((e) => {
        console.error(e);
        console.log(e.response.status, e.response.data);
        if (e.response.data.error === 'Missing username') {
          onError("Veuillez entrer votre nom d'utilisateur");
        }

        if (e.response.data.error === 'Missing password') {
          onError('Veuillez entrer votre mot de passe');
        }

        if (e.response.data.error === 'Users already exist') {
          onError("L'utilisateur existe déjà");
        }

        setLoading(false);
        setPassword('');
        if (!passwordRef.current) return;
        passwordRef.current.value = '';
      });
  }

  return (
    <div className="register-wrapper">
      <h1>Create Account</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" onChange={usernameHandler} />
        </label>
        <label>
          <p>Password</p>
          <input ref={passwordRef} type="password" onChange={passwordHandler} />
        </label>
        <div>
          <button type="submit" onClick={handlerSubmit} onSubmit={handlerSubmit}>
            Register
          </button>
          {loading && <p>Inscription en cours...</p>}
        </div>
      </form>
    </div>
  );
}