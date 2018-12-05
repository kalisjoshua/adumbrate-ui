import { h, render } from 'preact';

import './index.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
registerServiceWorker();
