// src/custom.d.ts (or src/declarations.d.ts)
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  // You might also include a declaration for regular .css if you have them,
  // though it's less common to import them directly into components in a modular way.
  declare module '*.css';