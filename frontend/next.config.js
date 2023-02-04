// const nextConfig = {
//   reactStrictMode: false,
// };

const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  experimental: { esmExternals: true },
  reactStrictMode: false,
});

// module.exports = nextConfig;
