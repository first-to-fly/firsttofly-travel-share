import deepCopy from "deepcopy";
import abc from "./sampleTS";
console.log("deepCopy(abc)", deepCopy(abc));
const someArray = [
    "foo",
    "bar",
];
console.log(someArray);
if (someArray.length === 0) {
    console.log(1);
}
else {
    console.log(2);
}
let someString = "";
someString = "abc";
// someString = 5; // <-- ts error
console.log(someString);
export default someArray;
// export default someString; // <-- es error
//# sourceMappingURL=sampleJS.js.map