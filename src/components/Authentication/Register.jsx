import React from 'react'
import AuthForm from './AuthForm/AuthForm'
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <AuthForm type="register" loginLink={<Link to='/signin'>Войти</Link>} />
    );
}