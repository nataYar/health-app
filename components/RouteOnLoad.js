'use client'
import { useContext, useEffect } from "react";
import { UserContext } from '../app/context/userProvider';
import { useRouter } from 'next/navigation';

const RouteOnLoad = () => {
  const { myUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // if (myUser !== null) {
      router.push('/dashboard');
    // } 
  }, []);

  return (
    <></>
  );
};

export default RouteOnLoad;

