"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation' 

import Profile from '@components/Profile'

import React from 'react'

const UserProfile = ({ params }) => {
  const searchParam = useSearchParams()
  const userName = searchParam.get('name')
  console.log(params)

  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setUserPosts(data);
    }

    fetchUserPosts()
  }, [])

  return (
    <Profile
    name={`${userName}'s`}
    desc={`Welcome to ${userName}'s profile page!`}
    data={userPosts}
  />

  )
}

export default UserProfile