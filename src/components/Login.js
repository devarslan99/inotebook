import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password})
        });


        const json = await response.json();

        if(json.success){
            localStorage.setItem('token',json.authtoken);
           
            props.showAlert("Account created successfully","success");
            navigate("/");
        }else{
            props.showAlert("invalid credentials","danger");
        }
        console.log(json);

    }

    const onChange = (e) => {

        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    return (
        <div className='mt-3'>
            <h2 className='mb-2'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Login