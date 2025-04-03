

const withNextIntl= require("next-intl/plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const nextIntlConfig = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isDev ? undefined : "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath: isProd ? "/ynex-js/preview" : undefined,
  assetPrefix : isProd ? "https://nextjs.spruko.com/ynex-js/preview/" : undefined,
  images: {
    loader: "imgix",
    path: "/",
    unoptimized: true,
  }
};

module.exports = nextIntlConfig(nextConfig);
