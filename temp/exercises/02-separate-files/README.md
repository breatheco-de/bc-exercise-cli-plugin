# 02: Separate Files

Thanks to webpack, we can split our code in several files using the ***import*** or ***require*** statement like this:

```js
// file1.js
const sum = (a,b) => {
  return a+b;
}
export default sum; //export
```

```js
// file2.js
import sum from './file1.js'; //import
console.log(sum(2,2)); //will output 4
```
This basically means that we can organize our 