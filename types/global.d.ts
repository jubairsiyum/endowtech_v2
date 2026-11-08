// Global ambient type declarations for CSS and static asset imports
// Fixes TypeScript error TS(2882): Cannot find module or type declarations for side-effect import

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.sass" {
  const content: Record<string, string>;
  export default content;
}
