# 01 - Hello World

For this first excercise we are going to take it slow.

React it's just a rendering engine, its main goal is save us (the developers) to work with the DOM.

To acomplish that, the library comes with a function called **ReactDOM.render** that receives two parameters:

1) What to render.
2) Where to render it.

For example:

```js
import React from 'react';
import ReactDOM from 'react-dom';

//This function returns a string that will be rendered
const whatToRender = () => {
    return 'I Love React';
}

//A DOM element were react will render the image
const myDiv = document.querySelector('#myDiv');

               //what           //where
ReactDOM.render(whatToRender(), myDiv);
```

# Instructions

Make the function whatToRender return "I Love React" instead of "Hello World"