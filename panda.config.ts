import { defineConfig } from "@pandacss/dev"
 
export default defineConfig({
    // Whether to use css reset
    preflight: true,
    
    // Where to look for your css declarations
    include: ["./shared/components/**/*.{ts,tsx,js,jsx}", "./app/**/*.{ts,tsx,js,jsx}"],
    
    // Files to exclude
    exclude: [],
    
    // The output directory for your css system
    outdir: "styled-system",
    importMap:'@pandacss',
    syntax: 'template-literal', // required
    jsxFramework: 'react' // optional
})