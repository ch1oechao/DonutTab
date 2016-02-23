import React from 'react';
import ReactDOM from 'react-dom';

import Tab from './components/Tab/Tab.js';

require('./assets/styles/main.scss');
 
(function main() {
	$.material.init();
    ReactDOM.render(<Tab />, document.getElementById('donutTab'));
})();
