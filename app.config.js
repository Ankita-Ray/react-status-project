import 'dotenv/config';

export default {
    name: "status",
slug: "status",
version: "1.0.0",
orientation: "portrait",
icon: "./assets/icon.png",
splash: {
  image: "./assets/splash.png",
  resizeMode: "contain",
  backgroundColor: "#ffffff"
},
updates: {
  "fallbackToCacheTimeout": 0
},
assetBundlePatterns: [
  "**/*"
],
ios: {
  supportsTablet: true
},
web: {
  favicon: "./assets/favicon.png"
},
  extra: {
    enableComments: process.env.COOLAPP_COMMENTS === 'true',
  },
};