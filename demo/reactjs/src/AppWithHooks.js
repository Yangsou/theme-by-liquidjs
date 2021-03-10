/*
 * function Component with Hooks: Modify ./index.js to apply this file
 */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import './App.scss';
import logo from './assets/img/nexlab-logo.svg';
import tplsrc from './views/showing-click-times.liquid';
import { engine } from './engine';
import { Context } from './Context';
import Settings from './settings';
import imgExample1 from './assets/img/RA-AG0017Y10B.jpeg';
import imgExample2 from './assets/img/BM7264-51A.jpeg';
import imgExample3 from './assets/img/BI1061-50E.jpeg';
import imgExample4 from './assets/img/RA-AG0028L10B.jpeg';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductList from './pages/list';
import ProductDetail from './pages/product';
import Contact from './pages/contact';
import News from './pages/news';

const fetchTpl = engine.getTemplate(tplsrc.toString());

export function App() {
  const [html, setHtml] = useState('');
  const [state, setState] = useState({
    logo: logo,
    name: 'alice',
    clickCount: 0,
    general: {
      brand: 'Nexlab',
      slogan: 'Inside out',
      description: 'Lorem ipsum'
    },
    products: [
      {
        id: 'RA-AG0017Y10B-1',
        name: 'Đồng hồ nữ automatic Orient RA-AG0017Y10B',
        image: imgExample1
      },
      {
        id: 'BM7264-51A-1',
        name: 'Đồng hồ nam Citizen BM7264-51A',
        image: imgExample2
      },
      {
        id: 'BI1061-50E-1',
        name: 'Đồng hồ nam Citizen BI1061-50E',
        image: imgExample3
      },
      {
        id: 'RA-AG0028L10B-1',
        name: 'Đồng hồ automatic nam ORIENT BAMBINO OPEN HEART',
        image: imgExample4
      },
      {
        id: 'RA-AG0017Y10B-2',
        name: 'Đồng hồ nữ automatic Orient RA-AG0017Y10B',
        image: imgExample1
      },
      {
        id: 'BM7264-51A-2',
        name: 'Đồng hồ nam Citizen BM7264-51A',
        image: imgExample2
      },
      {
        id: 'BI1061-50E-2',
        name: 'Đồng hồ nam Citizen BI1061-50E',
        image: imgExample3
      },
      {
        id: 'RA-AG0028L10B-2',
        name: 'Đồng hồ automatic nam ORIENT BAMBINO OPEN HEART',
        image: imgExample4
      },
      {
        id: 'RA-AG0017Y10B',
        name: 'Đồng hồ nữ automatic Orient RA-AG0017Y10B',
        image: imgExample1
      },
      {
        id: 'BM7264-51A',
        name: 'Đồng hồ nam Citizen BM7264-51A',
        image: imgExample2
      },
      {
        id: 'BI1061-50E',
        name: 'Đồng hồ nam Citizen BI1061-50E',
        image: imgExample3
      },
      {
        id: 'RA-AG0028L10B',
        name: 'Đồng hồ automatic nam ORIENT BAMBINO OPEN HEART',
        image: imgExample4
      },
    ],
    theme: {
      theme: 'theme-1',
      layout: 'layout-1'
    }
  });
  const saveGeneralInfo = (form, logoUrl) => {
    setState({
      ...state,
      general: form,
      logo: logoUrl
    });
    localStorage.setItem('state', JSON.stringify({...state, general: form, logo: logoUrl}));
  }
  const saveThemeInfo = (form) => {
    setState({
      ...state,
      theme: form
    });
    localStorage.setItem('state', JSON.stringify({...state, theme: form}));
  }

  useLayoutEffect(() => {
    fetchTpl
      .then(tpl => engine.render(tpl, {...state}))
      .then(html => setHtml(html))
  }, [state.general, state.theme]);

  useEffect(() => {
    const _state = JSON.parse(localStorage.getItem('state'));
    if (_state) {
      setState({
        ...state,
        general: _state.general,
        logo: _state.logo,
        theme: _state.theme
      })
    }
  }, []);

  return (
    <div className="App">
      <Context.Provider
        value={{
          saveGeneralInfo,
          saveThemeInfo,
          count: () => setState({...state, clickCount: state.clickCount + 1})
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <ProductList html={html} />
            </Route>
            <Route path="/product/:id">
              <ProductDetail {...state} theme={state.theme} general={state.general} />
            </Route>
            <Route path="/contact">
              <Contact {...state} theme={state.theme} general={state.general} />
            </Route>
            <Route path="/news">
              <News {...state} theme={state.theme} general={state.general} />
            </Route>
          </Switch>
        </Router>
        <Settings logo={state.logo} general={state.general} theme={state.theme} />
      </Context.Provider>
    </div>
  );
}
