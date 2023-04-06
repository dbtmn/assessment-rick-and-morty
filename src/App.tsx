import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Dashboard from './modules/Dashboard';
import CharacterDetail from './modules/CharacterDetail';

import './App.scss';

class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <Routes>
          <Route
            element={<div className="app">
              <Grid container className="app__container">
                <Grid item xs={2} sm={2} md={2} lg={2} className="app__spacer" />
                <Grid item xs={8} sm={8} md={8} lg={8}>
                  <Outlet />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} className="app__spacer" />
              </Grid>
            </div>}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/character-detail' element={<CharacterDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
