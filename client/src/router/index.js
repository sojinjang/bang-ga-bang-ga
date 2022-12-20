import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import EditUserInfo from '../pages/Mypage/EditUserInfo';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recruit-list' element={<Home />} />
        <Route path='/recruit-map' element={<Home />} />
        <Route path='/cafeinfo' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/edit' element={<EditUserInfo />} />
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
