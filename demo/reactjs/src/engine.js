import path from 'path';
import { Liquid } from 'liquidjs';

export const engine = new Liquid({
    root: path.resolve(__dirname, 'views/'),  // dirs to lookup layouts/includes
    extname: '.liquid'     // the extname used for layouts/includes, defaults 
});

engine.registerFilter('image', d => {
  let img = `<img src="${d}" class="App-logo" alt="logo"></img>`;  
  return img 
})
engine.registerFilter('form', d => {
  let form = `
    <form class="${d}">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
    </form>
  `;  
  return form; 
})
engine.registerFilter('footer', d => {
  return `
    <footer class="app-footer ${d}">
      <p>Nexlab &copy; 2021</p>
    </footer>
  `;
})
engine.registerFilter('header', (brand, slogan, logo) => {
  return `
    <header className="App-header">
      <a href="/">
        <img src="${logo}" />
      </a>  
      <div>
        <a href="/">${brand}</a>
        <p>${slogan}</p>
      </div>
    </header>
  `;
})