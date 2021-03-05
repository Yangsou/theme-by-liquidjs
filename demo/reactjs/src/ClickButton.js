import './ClickButton.css';
import React from 'react';
import { Context } from './Context';
import { Button } from 'antd';

export function ClickButton() {
  return (
    <Context.Consumer>
      {context => (
        <Button onClick={context.count}>
          Click Here!
        </Button>
      )}
    </Context.Consumer>
  );
};
