import React from 'react';
import {  FaFacebook, FaLinkedin, FaTwitter,FaSignInAlt } from 'react-icons/fa'
export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/books',
    text: 'books',
  },
  {
    id: 3,
    url: '/',
    text: 'about',
  },
  {
    id: 4,
    url: '/',
    text: 'contact',
  }
]

export const social = [
  {
    id: 1,
    url: 'https://www.facebook.com/Zayd.imr/',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.linkedin.com/in/zaydimr/',
    icon: <FaLinkedin />,
  },
  {
    id:4,
    url:'/login',
    icon: <FaSignInAlt/>
  }
]