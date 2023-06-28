import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";

export const Register = () => {
  /* the keys inside the schema have to be exactly as the ones from ...register */

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

  const onSubmit = async (data: any) => {
    console.log("onSubmit called");
    try {
      console.log("Form submitted with data: ", data);
      const endpoint = "http://127.0.0.1:8000/register/";
      const response = await Axios.post(endpoint, data);
      console.log("User registered: ", response.data);
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };
  /* {...register } is giving an object with the key as the name inside the "" */
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register("username")} />
        <p>{errors.username?.message}</p>
        <input type="text" placeholder="Email" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
