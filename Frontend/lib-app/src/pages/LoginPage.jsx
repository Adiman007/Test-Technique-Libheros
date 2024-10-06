import React, { useState } from 'react';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });
    const [isLogin, setIsLogin] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.loginEmail,
                    password: formData.loginPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    console.log('Login successful:', data);
                    // Save the token in localStorage or state
                    localStorage.setItem('jwt', data.token);
                } else {
                    console.error('Login failed:', data);
                    alert('Invalid email or password');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred during login');
            });
        } else {
            if (formData.email !== formData.confirmEmail) {
                alert('Emails do not match');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div>
                                <label>First Name:</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Last Name:</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Confirm Email:</label>
                                <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Confirm Password:</label>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <div>
                                <label>Email:</label>
                                <input type="email" name="loginEmail" value={formData.loginEmail} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" name="loginPassword" value={formData.loginPassword} onChange={handleChange} required />
                            </div>
                        </>
                    )}
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
