/*
 * function Component with Hooks: Modify ./index.js to apply this file
 */
import React, { useState, useLayoutEffect } from 'react';
import './App.scss';
import logo from './logo.svg';
import tplsrc from './views/showing-click-times.liquid';
import Parser from 'html-react-parser';
import { engine } from './engine';
import { Context } from './Context';
import Settings from './settings';
import imgExample from './assets/img/image-1.jpg';

const fetchTpl = engine.getTemplate(tplsrc.toString())

export function App() {
  const [state, setState] = useState({
    logo: logo,
    name: 'alice',
    clickCount: 0,
    html: '',
    general: {
      brand: 'Nexlab',
      slogan: 'Inside out',
      description: 'Lorem ipsum'
    },
    products: [
      {
        id: '1',
        name: 'product 1',
        image: imgExample
      },
      {
        id: '2',
        name: 'product 2',
        image: imgExample
      },
      {
        id: '3',
        name: 'product 3',
        image: imgExample
      },
      {
        id: '4',
        name: 'product 4',
        image: imgExample
      },
      {
        id: '5',
        name: 'product 5',
        image: imgExample
      },
      {
        id: '6',
        name: 'product 6',
        image: imgExample
      },
      {
        id: '7',
        name: 'product 7',
        image: imgExample
      },
      {
        id: '8',
        name: 'product 8',
        image: imgExample
      },
      {
        id: '9',
        name: 'product 9',
        image: imgExample
      },
      {
        id: '10',
        name: 'product 10',
        image: imgExample
      },
      {
        id: '11',
        name: 'product 11',
        image: imgExample
      },
      {
        id: '12',
        name: 'product 12',
        image: imgExample
      }
    ]
  });
  const saveGeneralInfo = (form) => {
    setState({
      ...state,
      general: form
    })
  }

  useLayoutEffect(() => {
    fetchTpl
      .then(tpl => engine.render(tpl, state))
      .then(html => setState({...state, html}))
  }, [state.general])

  return (
    <div className="App">
      {Parser(`${state.html}`)}
      <Context.Provider
        value={{
          saveGeneralInfo,
          count: () => setState({...state, clickCount: state.clickCount + 1})
        }}
      >
        <Settings general={state.general} />
      </Context.Provider>
    </div>
  );
}
