import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
// 设置移动端的适配
// 除以几视口的宽度就是多少rem，现在我们设置视口的总宽度为750rem
document.documentElement.style.fontSize = 100 / 750 + 'vw';

const root = ReactDOM.createRoot(document.getElementById('root'));

// React组件可以直接通过JSX渲染
root.render(<App/>);
