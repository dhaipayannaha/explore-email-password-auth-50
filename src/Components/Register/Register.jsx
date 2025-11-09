import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../../firebase.init';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router';

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [errorMassage, setErrorMassage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked
        console.log(email, password);

        setSuccess(false)
        setErrorMassage('')

        if (!terms) {
            setErrorMassage('please accept terms and condition')
            return;
        }


        //password validation
        const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (passwordRegExp.test(password) === false) {
            setErrorMassage('password must one lowercase one uppercase')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                sendEmailVerification(result.user)
                    .then(() => {
                        setSuccess(true);
                        alert('Verification email has been sent to your inbox.');
                    });

                // update user profile
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
                .then(() => {
                    console.log('user profile updated')
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                setErrorMassage(error.message);
            });

    }


    return (
        <div className='max-w-sm mx-auto mt-12'>
            <h3 className='text-2xl text-center mb-4 font-bold'>This is register</h3>
            <form className='space-y-5' onSubmit={handleRegister}>
               

                <label className="input validator join-item">
                   
                    <input type="text" name='name' placeholder="Enter yoyr name" />
                </label>
                <label className="input validator join-item">
                   
                    <input type="text" name='photo' placeholder="Photo url" />
                </label>
                <label className="input validator join-item">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input type="email" name='email' placeholder="mail@site.com" />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
                <br />

                {/* password field */}
                <label className="input validator relative">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <div >
                        <input
                            type={showPassword ? "text" : "password"}
                            name='password'
                            required
                            placeholder="Password"
                        // minLength="8"
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute right-4'>{
                            showPassword ? <FaEye /> : <FaEyeSlash />
                        }
                        </button>
                    </div>
                </label>
                <p className="validator-hint hidden">
                    Must be more than 8 characters, including
                    <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                </p>
                <br />
                <label className="label">
                    <input type="checkbox" name='terms' className="checkbox" />
                    Remember me
                </label>
                <br />

                {/* submit button */}
                <input className='btn btn-primary' type="submit" value="Submit" />
            </form>
            <p>Already have an account ? <Link to="/login">Login</Link></p>
            {
                errorMassage && <p className='text-red-500'>{errorMassage}</p>
            }
            {
                success && <p className='text-green-500'>User has created successfully</p>
            }
        </div>
    );
};

export default Register;