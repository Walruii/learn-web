/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  env: {
        mongodburl: `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}/?retryWrites=true&w=majority`,
    }
}

module.exports = nextConfig
