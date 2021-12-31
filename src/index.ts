import sampleTS from "sampleTS";

import sampleJS from "./sampleJS";


(async () => {
  console.log("Dynamically loading module...");
  const dynamicSample = await import("./sampleJS");
  console.log("Module loaded", dynamicSample);
})();

console.log("sampleJS", sampleJS);
console.log("sampleTS", sampleTS);
