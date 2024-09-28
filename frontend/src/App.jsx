import React from 'react';
import { Box, useColorModeValue, } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';
import CreatePage from './pages/CreatePage/CreatePage';
import CartPage from './pages/CartPage/CartPage';


const App = () => {
  return (
   <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/create' element={<CreatePage />}/>
      <Route path='/cart' element={<CartPage />}/>
    </Routes>
   </Box>
  )
}

export default App