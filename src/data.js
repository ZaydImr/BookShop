import React from 'react';
import pic1 from './assets/office1.jpg';
import pic2 from './assets/office2.jpg';
import pic3 from './assets/office3.jpg';
import pic4 from './assets/office4.jpg';
import pic5 from './assets/office5.jpg';
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

export const office =[
  {
    url : pic1,
  },
  {
    url : pic2,
  },
  {
    url : pic3,
  },
  {
    url : pic4,
  },
  {
    url : pic5,
  }
]