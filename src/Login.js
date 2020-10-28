import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase'
import './Login.css';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        //firebase stuff
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) { history.push('/') }
            }).catch(err => alert(err.message));


    }

    const register = e => {
        e.preventDefault();
        //firebase stuff
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            if (auth) {
                history.push('/')
            }
        }).catch(err => alert(err.message));

    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png'
                    alt=''
                />
            </Link>
            <div className='login_container'>
                <h1>Login</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />


                </form>
                <p> <input type='checkbox' /> {"  "}By Signing-in you agree to our Amazon's Conditions of Uses & Sales. Please see our Privacy Notice, our Cookies Notice and our Intrested-Based Ads.</p>
                <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>


            </div>
            <div className='login_container_2'>
                <span>{" "}</span>
                <p>New to Amazon?</p>
                <span>{' '}</span>
            </div>
            <div className='login_container_3'> <button onClick={register} className='login_registerButton'>Create your Amazon Account</button></div>


        </div>
    )
}

export default Login;
