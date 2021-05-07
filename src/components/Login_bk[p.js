import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    let inputRef = useRef();
    let history = useHistory();

    let initialState = {
        email: null,
        password: null
    };

    const [formState, setFormState] = useState(initialState);

    const onHandleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onLogin = event => {
        event.preventDefault();

        const { email, password } = formState;

        if (email === "sid@organicecommerce.com" && password === "12345678") {
            if (!window.localStorage.getItem("user_name"))
                window.localStorage.setItem("user_name", "Sid");

            history.push("/home");
        } else {
            alert("Login credential is not matched!");
        }
    };

    return (
        <div className="text-center" style={{margin: "100px"}}>
            <form className="form-label" onSubmit={(event) => onLogin(event)}>
                <h3>Please sign in</h3>
                <div className="row">
                    <div className="co-md-12" style={{margin: "5px"}}>
                        <input 
                            ref={inputRef}
                            type="email" 
                            name="email"
                            className="form-control-md"
                            style={{width: "20%"}}
                            placeholder="Email address" 
                            onChange={onHandleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <input 
                            type="password" 
                            name="password" 
                            minLength="3"
                            maxLength="10"
                            className="form-control-md" 
                            style={{width: "20%"}}
                            placeholder="Password" 
                            onChange={onHandleChange} />
                    </div> 
                </div>
                <div style={{margin: "10px"}}>
                    <button className="btn btn-sm btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
