//Allows TypeScript to handle non-code asset imports (css files)
declare module "*.css" {
  const content: any;
  export default content;
}