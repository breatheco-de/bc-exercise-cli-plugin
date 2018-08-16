import React from 'react';
import ReactDOM from 'react-dom';

/**
 * here we import the function that was exported
 * by default on whatToRender.js
 */
import WhatToRender from './whatToRender.js';

               //fake html tag           //where
ReactDOM.render(WhatToRender(), document.querySelector('#myDiv'));