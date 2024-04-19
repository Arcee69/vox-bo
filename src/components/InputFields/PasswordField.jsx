import React, { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function PasswordField({
  labelName,
  className,
  name,
  isValid,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* <label
        htmlFor="password"
        className={`text-sm leading-4 mt-4 ${
          isValid ? "text-text_grey" : "text-primary"
        }`}
      >
        {labelName || "Password"}
      </label> */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name || "password"}
          className={`block w-full text-sm p-3 border rounded mt-2 outline-none ${className}`}
          placeholder="Password"
          {...rest}
        />
        <div className="absolute inset-y-0 right-0 pr-3 mt-1.5 flex items-center">
          {showPassword ? (
            <AiOutlineEye
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>
    </>
  );
}
