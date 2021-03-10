import React, { useLayoutEffect, useState } from 'react';
import Parser from 'html-react-parser';
import tplsrc from '../../views/news.liquid';
import { engine } from '../../engine';
import './news.scss';

const fetchTpl = engine.getTemplate(tplsrc.toString())


export default function News(props) {
  const [html, setHtml] = useState('');
  const newsItems = [1,2,3,4,5,6,7,8,9,10,11,12];
  useLayoutEffect(() => {
    fetchTpl
      .then(tpl => engine.render(tpl, {...props, newsItems}))
      .then(html => setHtml(html))
  }, [html, props.theme, props.general, props.logo]);
  return (
    <div>
      {Parser(`${html}`)}
    </div>
  )
}