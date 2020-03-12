// Follow https://stackoverflow.com/a/51114250
// - No "import ...", else this file is treated as a module and no longer global
// - Use "import()" if needed for types
// - Use "declare namespace" (add) instead of "declare module" (overwrite)

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}


declare module "*.less" {
  const content: {[className: string]: string};
  export default content;
}


declare module "*.scss" {
  const content: {[className: string]: string};
  export default content;
}
