import { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
//Task 1: Import urlConfig from `giftlink-frontend/src/config.js`
import {urlConfig} from '../../config';
//Task 2: Import useAppContext `giftlink-frontend/context/AuthContext.js`
import { useAppContext } from '../../context/AuthContext';
//Task 3: Import useNavigate from `react-router-dom` to handle navigation after successful registration.

function RegisterPage() {

    const navigate = useNavigate();
    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [ errorMessage, setErrorMessage ] = useState("");

    const { setIsLoggedIn } = useAppContext();

    const handlerRegister = async () =>{
       
       try{ const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, 
            { method: "POST",
                headers: {
                    "content-type" : "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })

        })
        const jsonData = await response.json();
        console.log("Response:", jsonData );
        console.log("error:", jsonData.error);

        if (jsonData.authtoken) {
            sessionStorage.setItem('auth-token', jsonData.authtoken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', jsonData.email);
        //Step 2 - Task 3
            setIsLoggedIn(true);
        //Step 2 - Task 4
            navigate('/app');
        }
        if (jsonData.error) {
        //Step 2 - Task 5
            setErrorMessage(jsonData.error);
        }
         }catch(e){
            console.log("There was an error in the request POST:", e.errorMessage)
         }
       
     }
   

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form label"> FirstName</label><br />
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your FirstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="form label"> LastName</label><br />
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your LastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="form label"> Email</label><br />
                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form label"> Password</label><br />
                            <input
                                id="password"
                                type="text"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* insert code here to create a button that performs the `handleRegister` function on click */}
                        <button className="btn-custom-register w-100 mb-3" onClick={handlerRegister}> Register </button>
                        <div className="text-danger">{errorMessage}</div>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )//end of return
}

export default RegisterPage;