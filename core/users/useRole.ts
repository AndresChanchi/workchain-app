'use client';

import { useState } from 'react';

export type UserRole = 'employer' | 'freelancer';

export const useRole = () => {
  const [role, setRole] = useState<UserRole>('employer');
  
  const toggleRole = () => {
    setRole(prev => prev === 'employer' ? 'freelancer' : 'employer');
  };
  
  return { role, toggleRole };
};