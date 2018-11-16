import axios from 'axios';
import { baseURLCs, baseUrlSs } from '../config/config.js';
import getConfig from 'next/config';

axios.jsonp = (_url, options = {}) => {
    const generateCallbackFunction = () => {
        return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
    }
    const clearFunction = functionName => {
        // IE8 throws an exception when you try to delete a property on window
        // http://stackoverflow.com/a/1824228/751089
        try {
            delete window[functionName];
        } catch (e) {
            window[functionName] = undefined;
        }
    }

    const removeScript = scriptId => {
        const script = document.getElementById(scriptId);
        if (script) {
            document.getElementsByTagName('head')[0].removeChild(script);
        }
    }

    // to avoid param reassign
    let url = _url;
    const defaultOptions = {
        timeout: 25000,
        jsonpCallback: 'callback',
        jsonpCallbackFunction: null,
    };
    const timeout = options.timeout || defaultOptions.timeout;
    const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    let timeoutId;

    return new Promise((resolve, reject) => {
        const callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
        const scriptId = `${jsonpCallback}_${callbackFunction}`;

        window[callbackFunction] = (response) => {
            resolve(response);

            if (timeoutId) clearTimeout(timeoutId);

            removeScript(scriptId);

            clearFunction(callbackFunction);
        };

        // Check if the user set their own params, and if not add a ? to start a list of params
        url += (url.indexOf('?') === -1) ? '?' : '&';
        Object.entries(options).forEach(item => {
            url += item.join('=') + '&';
        })
        const jsonpScript = document.createElement('script');
        jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
        if (options.charset) {
            jsonpScript.setAttribute('charset', options.charset);
        }
        jsonpScript.id = scriptId;
        document.getElementsByTagName('head')[0].appendChild(jsonpScript);

        timeoutId = setTimeout(() => {
            reject(new Error(`JSONP request to ${_url} timed out`));

            clearFunction(callbackFunction);
            removeScript(scriptId);
            window[callbackFunction] = () => {
                clearFunction(callbackFunction);
            };
        }, timeout);

        // Caught if got 404/500
        jsonpScript.onerror = () => {
            reject(new Error(`JSONP request to ${_url} failed`));

            clearFunction(callbackFunction);
            removeScript(scriptId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    });
}

export default class Server {
  axios(url, params, method = 'get') {
    return new Promise((resolve, reject) => {
      const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();
      const envConifg = Object.assign(publicRuntimeConfig, serverRuntimeConfig);
      if (typeof params !== 'object') params = {};
      let headers = {};
      if (params.headers) {
        headers = params.headers;
        delete params.headers;
      }
      const _option = {
        method,
        url,
        baseURL: envConifg.apiHost,
        timeout: 10000,
        params,
        data: null,
        headers,
        withCredentials: true, //是否携带cookies发起请求
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
      if (method.toLowerCase() === 'jsonp') {
        if (url.indexOf('//') === -1) {
          url = _option.baseURL + url;
        }
        axios.jsonp(url, params)
          .then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          })
      } else {
        axios.request(_option).then(res => {
          resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
        }, error => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        })
      }
    })
  }
}

