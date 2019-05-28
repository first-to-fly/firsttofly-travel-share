import sample from './sample';
import sampleCSS from './sample.scss';

console.log(sample);
console.log(sampleCSS);

const someArray = [
  'foo',
  'bar',
];
console.log(someArray);

if (someArray.length === 0) {
  console.log(1);
} else {
  console.log(2);
}

let someString = '';
someString = 'abc';
someString = 5; // <-- ts error
console.log(someString);
