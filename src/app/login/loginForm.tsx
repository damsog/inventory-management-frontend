'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AiFillGithub } from 'react-icons/ai';
import { IoLogoGoogle } from 'react-icons/io';

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';

interface LoginFormClassOptions {
    className?: string
}

interface LoginFormOptions {
    email: string,
    password: string
}

const LoginForm = ({className}: LoginFormClassOptions) => {
    const { data: session, status } = useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormOptions>();
    const router = useRouter();

    useEffect(() => {
        if(status === "loading") return;
        if(session) router.push("/main");
    }, [session, status]);

    const onSubmit: SubmitHandler<LoginFormOptions> = data => console.log(data);
    const redirectToSignup = () => router.push('/signup');
 
    return (
        <div className={`${className} rounded-2xl shadow-lg`}>
            <form className=' px-16 py-8 bg-[#1d1d23] rounded-2xl flex-row justify-between ' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        {...register("email", { required: true })}
                        className='m-4 rounded-lg p-3 text-gray-400 text-lg bg-[#29292e] focus:bg-[#3c3c40] focus:outline-none'
                        type="text"
                        name="email"
                        placeholder="Email"
                    />                                
                </div>
                <div>
                    <input
                        {...register("password", { required: true })} 
                        className='m-4 rounded-lg p-3 text-gray-400 text-lg bg-[#29292e] focus:bg-[#3c3c40] focus:outline-none'
                        type="password" 
                        name="password" 
                        placeholder="Password"
                    />
                </div>
                <div className='flex flex-col items-center justify-between m-4 hover:text-gray-200
                                 border border-cyan-600 shadow-lg shadow-cyan-600/50 rounded-lg p-2 hover:bg-[#29292e]
                                 active:translate-y-1'>
                    <input type="submit" value="Login" className='text-gray-400 text-lg'/>
                </div>
                <div className='px-4 flex flex-col items-center justify-center'>
                    <h5 className='text-gray-400'>Or Sign In using</h5>
                    <div className='my-2 flex space-x-4'>
                        <h5 className=" text-4xl cursor-pointer text-gray-300 hover:text-cyan-600" onClick={() => signIn()}><AiFillGithub/></h5>
                        <h5 className=" text-4xl cursor-pointer text-gray-300 hover:text-cyan-600" onClick={() => signIn()}><IoLogoGoogle/></h5>
                    </div>
                </div>
                <div className='px-4 my-2'>
                    <h1 className="text-gray-400 ">Don't have an account? <span className="text-cyan-600 hover:text-cyan-500 hover:cursor-pointer" onClick={redirectToSignup}>sign-up!</span></h1>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;