const env = require('./env-config.js')

module.exports = {
  "presets": [
    [
      "next/babel", 
      {
        "preset-env": {},
        "transform-runtime": {},
        "styled-jsx": {
          "plugins": [
            "styled-jsx-plugin-postcss"
          ]
        },
        "class-properties": {}
      }
    ],
    "@zeit/next-typescript/babel",
  ],
  "plugins": [
    ['transform-define', env], // 定义环境变量，传递给前端 
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ]
}