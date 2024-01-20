import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //for create user
        const password = credentials.password;
        const cpassword = credentials.cpassword;

        if (password !== cpassword) {
            props.showAlert('password did not match', 'error')
            history.push("/signup")
        }
        else {
            const response = await fetch("https://inotebookbackend-z2ar.onrender.com/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });

            const json = await response.json()
            setCredentials({ name: "", email: "", password: "", cpassword: "" })

            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                props.showAlert("signed up successfully", "success");
                history.push("/");
            }
            else {
                props.showAlert("invalid credentials", "error");
                history.push("/signup")
            }
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} autoComplete="on" id="name" name='name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} autoComplete="on" id="email" name='email'  aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} autoComplete="on"  id="password" name='password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} autoComplete="on"  id="cpassword" name='cpassword' />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form> 
        </div>
    )
}

export default Signup
