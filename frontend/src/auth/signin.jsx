import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../context/authctx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PuffLoader } from "react-spinners";

export const SignIn = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const MIN_PASSWORD_LENGTH = 8;


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log("Forgot password clicked");
    navigate("/resetpassword");
  };


  const handlePasswordChange = (e) => {
    const value = e.target.value.trim();
    setPassword(value);
    setPasswordError(
      value.length >= MIN_PASSWORD_LENGTH
        ? ""
        : `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    );
  };



  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid email format");
  };
  const handleLogin = () => {
    if (!validateEmail(email) || password.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(
        "Please enter a valid email and ensure the password is at least 8 characters long"
      );
      return;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        alert("You have  successfully loggined in as ", user);
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        console.log("Login error:", error.message);
        setErrorMessage("Login failed: invalid credentials ");
      }).
      finally(() => {
        setIsLoading(false);
      });
  

  };

  return (
    <>
    <Card className="mx-auto w-full max-w-[24rem]">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
      <Typography className="-mb-2" variant="h6">
          Email
        </Typography>
      <Input
          label="Email"
          size="lg"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />
        <Typography className="-mb-2" variant="h6">
          Password
        </Typography>
        <Input
          label="Password"
          size="lg"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          icon={
            showPassword ? (
              <FaEyeSlash onClick={togglePasswordVisibility} />
            ) : (
              <FaEye onClick={togglePasswordVisibility} />
            )
          }
        />
          {errorMessage && (
          <Typography variant="small" color="red">
            {errorMessage}
          </Typography>
        )}
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={handleLogin}  fullWidth>
          {isLoading ? (
            <PuffLoader color="#EBF0EF"  />
          ) : (
            'Sign In'
          )}
        </Button>
        <Typography
          variant="small"
          color="blue-gray"
          className="mt-2 cursor-pointer"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </Typography>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Link
            to="/signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign up
          </Link>
        </Typography>
      </CardFooter>
    </Card>
    </>
  );
}