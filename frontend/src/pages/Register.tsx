import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setJwtToken } from "./store";
import { useDispatch } from "react-redux";

export const Register = () => {
  /* the keys inside the schema have to be exactly as the ones from ...register */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    username: yup.string().required("Please type your username"),
    email: yup.string().email().required("Please provide a valid email"),
    password: yup.string().required("Please provide a password "),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")])
      .required("Passwords do not match "),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    /* a resolver is where we specify how our schema will look like 
        we need to pass the schema to the resolver to tell react form to use the 
        given schema */
    resolver: yupResolver(schema),
  });

  // Add state to handle login status
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("onSubmit called");
    try {
      console.log("Form submitted with data: ", data);
      const endpoint = "http://127.0.0.1:8000/register/";
      const response = await Axios.post(endpoint, data);
      console.log("User registered: ", response.data);
      console.log("response.data.username", response.data.username);
      // Check if registration was successful
      if (response.data.message === "Registration successful.") {
        // Store the user ID in localStorage
        localStorage.setItem("jwtToken", response.data.jwtToken);

        dispatch(setJwtToken(response.data.jwtToken));
        dispatch(
          login({
            success: true,
            username: response.data.username,
            jwtToken: response.data.jwtToken,
          })
        );
        // Set login success state to true
        setLoginSuccess(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };
  /* {...register } is giving an object with the key as the name inside the "" */
  return (
    <div className="flex flex-col items-center justify-top h-screen mt-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          className="input w-full max-w-xs bg-sky-950"
          {...register("username")}
        />

        <p>{errors.username?.message}</p>
        <input
          type="text"
          placeholder="Email"
          className="input w-full max-w-xs mt-2 bg-sky-950"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
        <input
          className="input w-full max-w-xs mt-2 bg-sky-950"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <input
          className="input w-full max-w-xs mt-2 bg-sky-950"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <button className="btn mt-2  bg-sky-950">Submit</button>
      </form>
    </div>
  );
};
