import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({name:"", email: "", password: "",cpassword:"" })
    const handleSubmit = async (e) => {

        e.preventDefault();
       const {name,email,password,cpassword}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name,email,password})
        });


        const json = await response.json();

        if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
        }
        console.log(json);

    }

    const onChange = (e) => {

        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }





  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} id="name" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required/>
    </div>
    <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword"  minLength={5} required/>
    </div>
  
    <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Signup
