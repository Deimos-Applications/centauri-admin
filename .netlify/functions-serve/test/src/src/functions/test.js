var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/is-promise/index.js
var require_is_promise = __commonJS({
  "node_modules/is-promise/index.js"(exports, module2) {
    module2.exports = isPromise;
    module2.exports.default = isPromise;
    function isPromise(obj) {
      return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
    }
  }
});

// node_modules/@netlify/functions/src/lib/consts.js
var require_consts = __commonJS({
  "node_modules/@netlify/functions/src/lib/consts.js"(exports, module2) {
    var BUILDER_FUNCTIONS_FLAG = true;
    var HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
    var HTTP_STATUS_OK = 200;
    var METADATA_VERSION = 1;
    module2.exports = {
      BUILDER_FUNCTIONS_FLAG,
      HTTP_STATUS_METHOD_NOT_ALLOWED,
      HTTP_STATUS_OK,
      METADATA_VERSION
    };
  }
});

// node_modules/@netlify/functions/src/lib/builder.js
var require_builder = __commonJS({
  "node_modules/@netlify/functions/src/lib/builder.js"(exports, module2) {
    var isPromise = require_is_promise();
    var { BUILDER_FUNCTIONS_FLAG, HTTP_STATUS_METHOD_NOT_ALLOWED, HTTP_STATUS_OK, METADATA_VERSION } = require_consts();
    var augmentResponse = (response) => {
      if (!response || response.statusCode !== HTTP_STATUS_OK) {
        return response;
      }
      return __spreadProps(__spreadValues({}, response), {
        metadata: { version: METADATA_VERSION, builder_function: BUILDER_FUNCTIONS_FLAG }
      });
    };
    var wrapHandler = (handler2) => (event, context, callback) => {
      if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD") {
        return Promise.resolve({
          body: "Method Not Allowed",
          statusCode: HTTP_STATUS_METHOD_NOT_ALLOWED
        });
      }
      const modifiedEvent = __spreadProps(__spreadValues({}, event), {
        multiValueQueryStringParameters: {},
        queryStringParameters: {}
      });
      const wrappedCallback = (error, response) => callback(error, augmentResponse(response));
      const execution = handler2(modifiedEvent, context, wrappedCallback);
      if (isPromise(execution)) {
        return execution.then(augmentResponse);
      }
      return execution;
    };
    module2.exports = { builder: wrapHandler };
  }
});

// node_modules/@netlify/functions/src/main.js
var require_main = __commonJS({
  "node_modules/@netlify/functions/src/main.js"(exports, module2) {
    var { builder: builder2 } = require_builder();
    module2.exports = { builder: builder2 };
  }
});

// src/functions/test.ts
__export(exports, {
  handler: () => handler
});
var import_functions = __toModule(require_main());
var preHandler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: `
    <!DOCTYPE html>
	    <html>
		    <body>
		      Hello World

          <pre>${JSON.stringify(event)}</pre>
		    </body>
    </html>
    `
  };
};
var handler = (0, import_functions.builder)(preHandler);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=test.js.map
