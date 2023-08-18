import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Signup = ({ setIsLoggedIn }) => {

    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    let navigate = useNavigate()


    const host = "http://localhost:5000"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credential;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log(json);

        if (credential.password !== credential.cpassword) {
            toast.error("Passwords do not match");
            return;
        }

        // save the auth/ jwt-token and redirect
        if (json.success) {
            // save the auth/ jwt-token and redirect
            localStorage.setItem('token', json.authtoken);
            setIsLoggedIn(true);
            toast.success("Account Created Successfully")
            navigate('/')
        }
        else {
            toast.error("Account Already Exist!")
            navigate('/signup');
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }



    return (
        <div className=' container my-3 w-75 h-75 border border-secondary shadow-lg p-3 mb-5 bg-body rounded'>
            <Form onSubmit={handleSubmit}>
                <h1 className='my-3'>Create an Account to use iNoteBook</h1>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className='d-flex'><b>Name</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name="name" value={credential.name} onChange={onChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='d-flex'><b>Email address</b></Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={credential.email} onChange={onChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='d-flex'><b>Create Password</b></Form.Label>
                    <Form.Control type={showPassword ? ("text") : ("password")} placeholder=" create password" name="password" value={credential.password} onChange={onChange} minLength={5} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='d-flex'><b>Confirm Password</b></Form.Label>
                    <Form.Control type={showPassword ? ("text") : ("password")} placeholder=" confirm password" name="cpassword" value={credential.cpassword} onChange={onChange} minLength={5} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox " onClick={() => setShowPassword((prev) => !prev)}>
                    <Form.Check className="d-flex gap-2" type="checkbox" label="Show Password" />
                </Form.Group>
                <Button className="mb-5"variant="primary" type="submit">
                    Signup
                </Button>
            </Form>
            <p className=' mt-2'>If you have already an account, please login using login button</p>
        </div>
    )
}

export default Signup