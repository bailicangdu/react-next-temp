module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    'postcss-flexbugs-fixes': {},
    "autoprefixer": {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', 
        "iOS >= 8",
        "Android >= 4",
      ],
      flexbox: 'no-2009',
    },
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": { 
      utf8: false 
    }, 
    "postcss-px-to-viewport": {
      viewportWidth: 750, 
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false 
    },
    "postcss-viewport-units": {
      filterRule: rule => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
    },
    "cssnano": {
      // preset: "advanced", //开启后autoprefixer 失效 -- 待解决
      autoprefixer: false,
      "postcss-zindex": false,
      reduceIdents: false, 
    },
  }
}