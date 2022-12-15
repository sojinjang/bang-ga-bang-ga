import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import NotFound from '../pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recruit-list' element={<Home />} />
        <Route path='/recruit-map' element={<Home />} />
        <Route path='/cafeinfo' element={<Home />} />
        <Route path='/mypage' element={<MyPage />}>
          <Route path='edit' element={<Home />} />
          <Route path='confirm-pwd' element={<Home />} />
          <Route path='matching-history' element={<Home />} />
        </Route>
        <Route path='/register' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
