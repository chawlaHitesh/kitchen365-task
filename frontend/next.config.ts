import type { NextConfig } from "next";
const path = require('path')

const nextConfig: NextConfig = {
  output:"standalone",
   turbopack: {
    root: ".",
  },
 
};

export default nextConfig;
