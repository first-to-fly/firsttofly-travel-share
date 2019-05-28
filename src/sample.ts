console.log('Hello world');

const someArray2 = ['foo', 'bar'];
console.log(someArray2);

if (someArray2.length === 0) {
  console.log(1);
} else {
  console.log(2);
}

let someString2 = '';
someString2 = 'def';
someString2 = 5; // <-- ts error
console.log(someString2);

declare const styles: {
  readonly myClass: string;
};

console.log(styles);

const testHash: {
  abc?: string;
} = {};

console.log(testHash);

const abc = 'def';
export default abc;
