'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User } from 'lucide-react';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { authLogin } from '@/redux/slices/auth';
import Link from 'next/link';

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  //   const handleHomeRoute = () => {
  //     router.push('/');
  //   };

  const { isLoginFetching } = useAppSelector(
    (state: { auth: any }) => state.auth
  );
  // local state
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [togglevisible, setToggleVisible] = useState(false);

  const handleVisible = () => {
    setToggleVisible(!togglevisible);
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    await dispatch(
      authLogin({
        data: {
          email: user.email,
          password: user.password,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Login Success');
        router.push('/');
      })
      .catch((err: any) => {
        if (err) {
          toast.error('Login Failed');
        }
      });
  };

  return (
    <div className='min-h-screen grid place-items-center bg-gradient-to-b from-teal-600 to-teal-700'>
      <Card className='w-full max-w-sm bg-gradient-to-b from-slate-400 to-slate-700 border-0 shadow-xl pt-16'>
        <CardContent className='space-y-6'>
          <div className='flex justify-center mb-6'>
            <Avatar className='h-16 w-16 bg-slate-700/50'>
              <AvatarFallback>
                <User className='h-8 w-8 text-slate-400' />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='space-y-4'>
            <div className='space-y-2 relative'>
              <div className='absolute top-2 left-2 '>
                <EnvelopeIcon className=' text-gray-500  w-5 h-5 md:w-5 md:h-5' />
              </div>
              <Input
                type='text'
                id='email'
                name='email'
                placeholder='email'
                value={user.email}
                onChange={handleInput}
                className=' pl-9 bg-slate-300/50 border-0 placeholder:text-slate-500 text-slate-200'
              />
            </div>
            <div className='space-y-2  relative'>
              <div className='absolute top-2 left-2 '>
                <LockClosedIcon className=' text-gray-500  w-5 h-5 md:w-5 md:h-5' />
              </div>
              <Input
                type={togglevisible ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='password'
                value={user.password}
                onChange={handleInput}
                className=' pl-9 bg-slate-300/50 border-0 placeholder:text-slate-500 text-slate-200'
              />
              <button
                type='button'
                aria-label='password'
                className='absolute top-0.5 right-5 '
                onClick={handleVisible}>
                {togglevisible ? (
                  <EyeIcon className=' text-gray-500  w-5 h-5 md:w-4 md:h-4' />
                ) : (
                  <EyeSlashIcon className=' text-gray-500  w-5 h-5 md:w-4 md:h-4' />
                )}
              </button>
            </div>
          </div>
          <div className='flex items-center justify-between text-sm '>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='remember'
                className='border-cyan-400 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400'
              />
              <Label
                htmlFor='remember'
                className='text-cyan-400 hover:text-cyan-300 p-0'>
                Remember me
              </Label>
            </div>
            <Button
              variant='link'
              className='text-cyan-400 hover:text-cyan-300 p-0 hover:no-underline'>
              Forgot your password?
            </Button>
          </div>
          <p className='text-center text-blue-400 p-0 hover:no-underline'>
            Do not have an account?
            <Link
              href='/register'
              className='whitespace-nowrap font-semibold text-cyan-400 hover:text-cyan-300 p-0 hover:no-underline '>
              {' '}
              Register
            </Link>
          </p>
          <Button
            onClick={handleLogin}
            className='w-full bg-cyan-400 hover:bg-cyan-300 text-slate-800 font-medium text-lg py-6'>
            {!isLoginFetching ? (
              'LOGIN'
            ) : (
              <>
                <Loader2 className='animate-spin' />
                Please wait
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
