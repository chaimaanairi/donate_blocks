/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    }
    return config
  }
};
