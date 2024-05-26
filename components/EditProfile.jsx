'use client';
import Image from 'next/image'
import Link from 'next/link'

const EditProfile = ({image, profile, setProfile, submitting, handleSubmit}) => {

  return (
    <section className='w-full'>
    <h1 className="head_text text-left">
        <span className="blue_gradient">My Profile</span></h1>
        <p className="desc text-left">Welcome to your personalized Profile Page</p>

    <div className='flex w-full gap-x-5'>
      <div className='self-center'>
      <Image 
        src={image}
        alt='Logo'
        width={250}
        height={250}
        className='rounded-full '
        />
      </div>
      
        <form 
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
           First Name
          </span>
          <input 
          value={profile.firstName}
          onChange={(e)=> setProfile({
            ...profile, firstName:e.target.value 
          })}
          required
          className="form_input"
          ></input>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
           Last Name
          </span>
          <input 
          value={profile.lastName}
          onChange={(e)=> setProfile({
            ...profile, lastName:e.target.value 
          })}
          required
          className="form_input"
          ></input>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
           Username
          </span>
          <input 
          value={profile.userName}
          onChange={(e)=> setProfile({
            ...profile, userName:e.target.value 
          })}
          required
          className="form_input"
          ></input>
        </label>
          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href='/' className="text-gray-500 text-sm">
            Cancel
            </Link>
          <button
          type="submit"
          disabled = {submitting} 
          className="px-5 py-1.5 text-sm bg-green-700 rounded-full text-white">
            {submitting ? `Save...` : 'Save'}
          </button>
          </div>
      </form>
    </div>
    </section>
  )
}

export default EditProfile