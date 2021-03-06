import React, { useEffect, useLayoutEffect, useState } from 'react';
import Parser from 'html-react-parser';
import { engine } from '../../engine';
import tplsrc from '../../views/product-detail.liquid';
import {
  useParams
} from "react-router-dom";
const fetchTpl = engine.getTemplate(tplsrc.toString())

export default function ProductDetail({general, theme, products, ...props}) {
  const [state, setState] = useState({
    html: ''
  });
  const [product, setProduct] = useState({});
  const {id} = useParams();
  useLayoutEffect(() => {
    fetchTpl
      .then(tpl => engine.render(tpl, {
        ...state,
        ...props,
        general,
        theme,
        product
      }))
      .then(html => setState({...state, ...props, html}))
  }, [general, theme, product]);

  useEffect(() => {
    const product = products.find((e) => e.id.toString() === id.toString());
    setProduct(product);
  }, [id])

  return (
    <div>
      {Parser(`${state.html}`)}
    </div>
  )
}