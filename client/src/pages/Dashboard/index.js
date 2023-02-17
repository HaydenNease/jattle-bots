import React from 'react';
import Auth from '../../utils/auth'
import Profile from './Profile';

export default function Dashboard() {
  if(!Auth.loggedIn()) {
    window.location.replace('/login');
  }
  
  return <Profile />
}