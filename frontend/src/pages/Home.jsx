import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


const Home = () => {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user)
      navigate('/login')

  }, [])
  return (
    <>
      <Header />
    </>
  );
};

export default Home;
