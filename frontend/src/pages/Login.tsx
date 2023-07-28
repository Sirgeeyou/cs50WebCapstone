import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { login, logout, setJwtToken } from "../pages/store";
import {
  useDispatch,
  useSelector,
} from "react-redux"; /* useDispatch is for modifying states and useSelector is for getting states */
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState("");

  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.user.value.username);

  const schema = yup.object().shape({
    username: yup.string().required("Invalid username"),
    password: yup.string().required("invalid password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    Axios.post("http://127.0.0.1:8000/login/", data)
      .then((res) => {
        if (res.data.success) {
          setNewUsername(res.data.username);
          dispatch(setJwtToken(res.data.jwtToken));
          dispatch(
            login({
              success: true,
              username: res.data.username,
              jwtToken: res.data.jwtToken,
            })
          );
          localStorage.setItem("loggedInUser", JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  console.log(errors);

  return (
    <div className="flex flex-col items-center justify-top h-screen  mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          className="input w-full max-w-xs bg-sky-950"
          {...register("username")}
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
        />
        <p>{errors.username?.message}</p>
        <input
          type="password"
          placeholder="Password"
          className="input w-full max-w-xs bg-sky-950 mt-2"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <button className="btn mt-2  bg-sky-950">Submit</button>
      </form>
    </div>
  );
};
