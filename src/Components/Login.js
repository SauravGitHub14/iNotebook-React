import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast' 

const Login = ({setIsLoggedIn}) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate()


    const host = "http://localhost:5000"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'jwt-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjODkzYmFlMzQ1MDVlZWVhNGFlMzk3In0sImlhdCI6MTY5MDg3NDczMX0.4QhMXoaSojHQrcn77qkCxnAURdD3XbQQBGagz3-tQ-g"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })


        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth/ jwt-token and redirect
            setIsLoggedIn(true);
            localStorage.setItem('token', json.authtoken);
            
            toast.success("Logged In Successfully")
            navigate('/')
        }
        else {
            toast.error("Invalid Password or Username!")
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }



    return (
        <div className=' container my-5 w-50 h-50 border border-dark shadow-lg p-3 mb-5 bg-body rounded'>
            <Form onSubmit={handleSubmit}>
                <h1 className='my-5'>Login to continue to iNoteBook </h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='d-flex'>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={credential.email} placeholder="Enter email" onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='d-flex'>Password</Form.Label>
                    <Form.Control type={showPassword ? ("text") : ("password")} name="password" value={credential.password} placeholder="Password" onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox " onClick={() => setShowPassword((prev) => !prev)}>
                    <Form.Check className="d-flex gap-2" type="checkbox" label="Show Password" />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Login
                </Button>
            </Form>
            <p className=' mt-5'>If you don't have an account, please signup using signup button</p>
        </div>
    )
}

export default Login