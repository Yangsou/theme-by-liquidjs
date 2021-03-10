import React, { useLayoutEffect, useState } from 'react';
import Parser from 'html-react-parser';
import tplsrc from '../../views/contact.liquid';
import { engine } from '../../engine';

const fetchTpl = engine.getTemplate(tplsrc.toString())


export default function Contact(props) {
  const [html, setHtml] = useState('');
  useLayoutEffect(() => {
    fetchTpl
      .then(tpl => engine.render(tpl, {...props}))
      .then(html => setHtml(html))
  }, [html, props.theme, props.general, props.logo]);
  return (
    <div>
      {Parser(`${html}`)}
    </div>
  )
}