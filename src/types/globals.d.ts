// Allow `import foo from '...?raw'` to type as string (Vite's raw query).
declare module '*?raw' {
  const content: string;
  export default content;
}
