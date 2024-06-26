"use client"

import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import {signOut, useSession, getProviders, signIn} from 'next-auth/react'


const Nav = () => {

  const {data: session} = useSession();

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(()=>{
    const setUpProviders = async ()=> {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders()
  })

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
        src='/assets/images/logo.gif'
        alt='Logo'
        width={55}
        height={55}
        className='object-contain'
        unoptimized = {true}
        />
        <p className='logo_text'>Inspire AI</p>
      </Link>

      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

              <Image src={session?.user?.image}
              alt='profile'
              width={37}
              height={37}
              className='rounded-full cursor-pointer'
              onClick={()=> setToggleDropdown((prev)=>!prev)}/>
            

            {toggleDropdown && (
              <div className='dropdown_lg'>
                <Link 
                className='dropdown_link'
                href="/edit-profile"
                onClick={()=> setToggleDropdown(false)}>
                  Edit Profile
                </Link>

                <Link 
                className='dropdown_link'
                href="/profile"
                onClick={()=> setToggleDropdown(false)}>
                  Manage your prompts
                </Link>

              </div>
            )}

          </div>
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider)=> (
                <button
                type='button'
                key = {provider.name}
                onClick={(e)=> 
                  {
                    e.preventDefault()
                    signIn(provider.id)
                  }
                  
                }
                className='black_btn'>
                  Sign In
                </button>
              ))
            }
          </>
        )}

      </div>

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
             <Image src={session?.user?.image}
              alt='profile'
              width={37}
              height={37}
              className='rounded-full cursor-pointer'
              onClick={()=> setToggleDropdown((prev)=>!prev)}/>

            {toggleDropdown && (
              <div className='dropdown'>
                <Link 
                className='dropdown_link'
                href="/edit-profile"
                onClick={()=> setToggleDropdown(false)}>
                  Edit Profile
                </Link>

                <Link 
                href="/profile"
                className='dropdown_link'
                onClick={()=> setToggleDropdown(false)}>
                  Mange your Prompts
                </Link>

                <Link 
                href="/create-prompt"
                className='dropdown_link'
                onClick={()=> setToggleDropdown(false)}>
                  Create Prompt
                </Link>

                <button
                type='button'
                onClick={()=> {
                  setToggleDropdown(false);
                  signOut();
                }}
                className='w-full black_btn'>
                  Sign Out
                </button>

              </div>
            )}


          </div>
          
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider)=> (
                <button
                type='button'
                key = {provider.name}
                onClick={(e)=> 
                  {
                    e.preventDefault()
                    signIn(provider.id)
                  }
                  
                }
                className='black_btn'>
                  Sign In
                </button>
              ))
            }
          </> 
        )}

      </div>

    </nav>
  )
}

export default Nav