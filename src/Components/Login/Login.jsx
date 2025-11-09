import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../../firebase.init';
import { Link } from 'react-router';

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('')
    const emailRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        setErrorMassage('')
        setSuccess(false)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (!result.user.emailVerified) {
                    alert('please varify your  email address')
                } else {
                    setSuccess(true)
                }

            })
            .catch(error => {
                console.log(error)
                setErrorMassage(error.message)
            })

    }

    const handleForgetPassword = () => {
        console.log(emailRef.current.value);
        const email = emailRef.current.value

        setErrorMassage('')

        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('a password reset email send')
        })
        .catch(error => {
            setErrorMassage(error.message)
        })
    }


    return (

        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
            <div className="card-body">
                <h3 className="text-5xl font-bold">Login now!</h3>
                <form onSubmit={handleLogin} className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" name='email' ref={emailRef} className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" name='password' className="input" placeholder="Password" />
                    <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>
                <p>New to this Website ? <Link to="/register">Register</Link></p>
                {
                    errorMassage && <p className='text-red-500'>{errorMassage}</p>
                }
                {
                    success && <p>
                        user log in successfully
                    </p>
                }
            </div>
        </div>
    );
};

export default Login;