import React from 'react';
import Parser from 'html-react-parser';

export default function ProductList({html}) {
  return (
    <div>
      {Parser(`${html}`)}
    </div>
  )
}