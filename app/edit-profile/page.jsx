'use client';

import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import EditProfile from "@components/EditProfile";

const EditPofile = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [profile,setProfile] = useState({
        firstName: '',
        lastName: '',
        userName: '',
    })
    const userId = session?.user.id


    useEffect(()=> {

        const getUserDetails = async () => {
            const response = await fetch(`/api/users/${userId}/profile`)
            const data = await response.json();

            setProfile({
                firstName: data.name.split(" ")[0],
                lastName: data.name.split(" ")[1],
                userName: data.username
            })
        }
        if(userId) getUserDetails(); 
    }, [userId])




    const editProfile = async(e) => {
        e.preventDefault();
        setSubmitting(true)
        try {
            const response = await fetch(`/api/users/${userId}/profile`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        userName: profile.userName
                    })
                }
            )
            if (response.ok) {
                router.push('/');
            }
        }catch(error){
            console.log(error)
        }finally{
            setSubmitting(false)
        }
    }


  return (
    <EditProfile
    image = {session?.user.image}
    profile = {profile}
    setProfile = {setProfile}
    submitting = {submitting}
    handleSubmit = {editProfile}

    />
  )
}

export default EditPofile