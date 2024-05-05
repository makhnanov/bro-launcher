import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';

const Main = () => {
    return (
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}></Route>
        </Routes>
    );
}

export default Main;