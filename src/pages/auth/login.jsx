import React, { useState } from 'react'
import { Form, Formik} from "formik"
import { useLocation, useNavigate } from 'react-router-dom'
import { CgSpinner } from "react-icons/cg"
import { toast } from 'react-toastify'

import Logo from "../../assets/svg/logo.svg"
import PasswordField from  '../../components/InputFields/PasswordField'
import { api } from '../../services/api'
import { appUrls } from '../../services/urls'


const Login = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
  
    
    const from = location.state?.from?.pathname || "/";

    const submitForm = async (values) => {
        setLoading(true)
        const data = {
          email: values?.email,
          password: values?.password
        }
        try {
            const res = await api.post(appUrls?.LOGIN_URL, data);
            console.log(res, "elle")
            if (res?.status === 200) {
                setLoading(false)
                const { token, ...newObject} = res?.data;
                localStorage.setItem("token", token);
                localStorage.setItem("userObj", JSON.stringify(newObject));
                toast(`${res?.data?.message}`, { 
                    position: "top-right",
                    autoClose: 3500,
                    closeOnClick: true,
                });
                navigate("/subscribers")
            }
        }
        catch (err) {
            console.log(err, "err")
            setLoading(false)
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            })
        }
    
    };
    
    


  return (
    <div className='mb-5 bg-[#FAFAFA] h-screen flex flex-col '>
        <img src={Logo} alt='logo' className='w-[141px] px-5 mt-5 cursor-pointer'/>
        <div className='w-full md:w-[480px] mx-auto mt-[1%] my-auto h-[400px] bg-[#fff] shadow rounded-lg border flex flex-col border-solid border-[#E6E7EC]  p-8 '>
            <div className='flex flex-col justify-center gap-1 items-center'>
                <p className="text-xl font-medium text-[#101828]">Welcome back!</p>
                <p className='text-[#828282] text-sm'>Sign in to access admin</p>
            </div>
            <div className="h-[300px] mt-5">
                <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                //   validationSchema={formValidationSchema}
                onSubmit={(values) => {
                    window.scrollTo(0, 0)
                    console.log(values, "often")
                    submitForm(values)
                }}
                >
                {({
                    handleSubmit,
                    handleChange,
                    dirty,
                    isValid,
                    setFieldValue,
                    errors,
                    touched,
                    // setFieldTouched,
                    values,
                }) => (
                <Form onSubmit={handleSubmit} className="flex flex-col lg:items-center">
                    <div className='flex flex-col gap-6 lg:items-center h-[47px]'>
            
                        <div className="flex flex-col ">
                        <label htmlFor='email' className="text-xs font-normal text-[#101828]">Email</label>
                            <input
                                name="email"
                                placeholder="youremail@domain.com"
                                type="text" 
                                value={values.email}
                                onChange={handleChange}
                                className="rounded-lg border-[#D0D5DD] xs:w-full outline-none lg:w-[420px] mt-1.5 h-[51px] border-solid  p-3 border"
                            />
                            {errors.email && touched.email ? (
                            <div className='text-RED-_100'>{errors.email}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col xs:w-full lg:w-[420px]">
                        <label htmlFor='password' className="text-xs font-normal text-[#101828]">Password</label>
                        <PasswordField 
                            name="password"
                            value={values.password}
                            placeholder="Password"
                            className="border lg:w-[420px] h-[51px] rounded-lg border-[#D0D5DD] mt-1.5"
                            onChange={handleChange}
                        />
                        {/* <p className="text-primary text-left text-xs mt-1.5 font-medium cursor-pointer">Forgot Password?</p> */}
                        {errors.password && touched.password ? (
                            <div className='text-RED-_100'>{errors.password}</div>
                            ) : null}
                        </div>

                        <button 
                            className= " bg-[#000] mt-5  xs:w-full lg:w-[420px] text-[#fff] rounded-lg p-3 cursor-pointer w-full h-[54px] flex justify-center"
                            type="submit"
                        >
                            <p className='text-[#fff] text-sm  text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Login'}</p>
                        </button>
                    
                    </div>
                    

                </Form>
            )}
                </Formik>
            </div>

        </div>
    
    </div>
  )
}

export default Login