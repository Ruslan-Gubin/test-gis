import './styles/reset.css';
import './components';

const render = () => {
 return  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
 <pie-chard radius=200></pie-chard>
 `;
};


render()



