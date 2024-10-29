"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@hono";
exports.ids = ["vendor-chunks/@hono"];
exports.modules = {

/***/ "(rsc)/./node_modules/@hono/auth-js/dist/index.mjs":
/*!***************************************************!*\
  !*** ./node_modules/@hono/auth-js/dist/index.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authHandler: () => (/* binding */ authHandler),\n/* harmony export */   getAuthUser: () => (/* binding */ getAuthUser),\n/* harmony export */   initAuthConfig: () => (/* binding */ initAuthConfig),\n/* harmony export */   reqWithEnvUrl: () => (/* binding */ reqWithEnvUrl),\n/* harmony export */   setEnvDefaults: () => (/* binding */ setEnvDefaults),\n/* harmony export */   verifyAuth: () => (/* binding */ verifyAuth)\n/* harmony export */ });\n/* harmony import */ var _auth_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth/core */ \"(rsc)/./node_modules/@auth/core/index.js\");\n/* harmony import */ var hono_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hono/adapter */ \"(rsc)/./node_modules/hono/dist/helper/adapter/index.js\");\n/* harmony import */ var hono_http_exception__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hono/http-exception */ \"(rsc)/./node_modules/hono/dist/http-exception.js\");\n// src/index.ts\n\n\n\n\nfunction setEnvDefaults(env2, config) {\n  config.secret ??= env2.AUTH_SECRET;\n  config.basePath ||= \"/api/auth\";\n  (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__.setEnvDefaults)(env2, config);\n}\nasync function cloneRequest(input, request, headers) {\n  if ((0,hono_adapter__WEBPACK_IMPORTED_MODULE_1__.getRuntimeKey)() === \"bun\") {\n    return new Request(input, {\n      method: request.method,\n      headers: headers ?? new Headers(request.headers),\n      body: request.method === \"GET\" || request.method === \"HEAD\" ? void 0 : await request.blob(),\n      // @ts-ignore: TS2353\n      referrer: \"referrer\" in request ? request.referrer : void 0,\n      // deno-lint-ignore no-explicit-any\n      referrerPolicy: request.referrerPolicy,\n      mode: request.mode,\n      credentials: request.credentials,\n      // @ts-ignore: TS2353\n      cache: request.cache,\n      redirect: request.redirect,\n      integrity: request.integrity,\n      keepalive: request.keepalive,\n      signal: request.signal\n    });\n  }\n  return new Request(input, request);\n}\nasync function reqWithEnvUrl(req, authUrl) {\n  if (authUrl) {\n    const reqUrlObj = new URL(req.url);\n    const authUrlObj = new URL(authUrl);\n    const props = [\"hostname\", \"protocol\", \"port\", \"password\", \"username\"];\n    props.forEach((prop) => reqUrlObj[prop] = authUrlObj[prop]);\n    return cloneRequest(reqUrlObj.href, req);\n  } else {\n    const url = new URL(req.url);\n    const headers = new Headers(req.headers);\n    const proto = headers.get(\"x-forwarded-proto\");\n    const host = headers.get(\"x-forwarded-host\") ?? headers.get(\"host\");\n    if (proto != null)\n      url.protocol = proto.endsWith(\":\") ? proto : proto + \":\";\n    if (host != null) {\n      url.host = host;\n      const portMatch = host.match(/:(\\d+)$/);\n      if (portMatch)\n        url.port = portMatch[1];\n      else\n        url.port = \"\";\n      headers.delete(\"x-forwarded-host\");\n      headers.delete(\"Host\");\n      headers.set(\"Host\", host);\n    }\n    return cloneRequest(url.href, req, headers);\n  }\n}\nasync function getAuthUser(c) {\n  const config = c.get(\"authConfig\");\n  const ctxEnv = (0,hono_adapter__WEBPACK_IMPORTED_MODULE_1__.env)(c);\n  setEnvDefaults(ctxEnv, config);\n  const authReq = await reqWithEnvUrl(c.req.raw, ctxEnv.AUTH_URL);\n  const origin = new URL(authReq.url).origin;\n  const request = new Request(`${origin}${config.basePath}/session`, {\n    headers: { cookie: c.req.header(\"cookie\") ?? \"\" }\n  });\n  let authUser = {};\n  const response = await (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__.Auth)(request, {\n    ...config,\n    callbacks: {\n      ...config.callbacks,\n      async session(...args) {\n        authUser = args[0];\n        const session2 = await config.callbacks?.session?.(...args) ?? args[0].session;\n        const user = args[0].user ?? args[0].token;\n        return { user, ...session2 };\n      }\n    }\n  });\n  const session = await response.json();\n  return session && session.user ? authUser : null;\n}\nfunction verifyAuth() {\n  return async (c, next) => {\n    const authUser = await getAuthUser(c);\n    const isAuth = !!authUser?.token || !!authUser?.user;\n    if (!isAuth) {\n      const res = new Response(\"Unauthorized\", {\n        status: 401\n      });\n      throw new hono_http_exception__WEBPACK_IMPORTED_MODULE_2__.HTTPException(401, { res });\n    } else {\n      c.set(\"authUser\", authUser);\n    }\n    await next();\n  };\n}\nfunction initAuthConfig(cb) {\n  return async (c, next) => {\n    const config = cb(c);\n    c.set(\"authConfig\", config);\n    await next();\n  };\n}\nfunction authHandler() {\n  return async (c) => {\n    const config = c.get(\"authConfig\");\n    const ctxEnv = (0,hono_adapter__WEBPACK_IMPORTED_MODULE_1__.env)(c);\n    setEnvDefaults(ctxEnv, config);\n    if (!config.secret || config.secret.length === 0) {\n      throw new hono_http_exception__WEBPACK_IMPORTED_MODULE_2__.HTTPException(500, { message: \"Missing AUTH_SECRET\" });\n    }\n    const authReq = await reqWithEnvUrl(c.req.raw, ctxEnv.AUTH_URL);\n    const res = await (0,_auth_core__WEBPACK_IMPORTED_MODULE_0__.Auth)(authReq, config);\n    return new Response(res.body, res);\n  };\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQGhvbm8vYXV0aC1qcy9kaXN0L2luZGV4Lm1qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNrQztBQUNnQjtBQUNFO0FBQ2M7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsRUFBRSwwREFBa0I7QUFDcEI7QUFDQTtBQUNBLE1BQU0sMkRBQWE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaURBQUc7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLE9BQU8sRUFBRSxnQkFBZ0I7QUFDMUQsZUFBZTtBQUNmLEdBQUc7QUFDSDtBQUNBLHlCQUF5QixnREFBSTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLGdCQUFnQiw4REFBYSxRQUFRLEtBQUs7QUFDMUMsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpREFBRztBQUN0QjtBQUNBO0FBQ0EsZ0JBQWdCLDhEQUFhLFFBQVEsZ0NBQWdDO0FBQ3JFO0FBQ0E7QUFDQSxzQkFBc0IsZ0RBQUk7QUFDMUI7QUFDQTtBQUNBO0FBUUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtY2FudmFzLy4vbm9kZV9tb2R1bGVzL0Bob25vL2F1dGgtanMvZGlzdC9pbmRleC5tanM/NmQ2ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvaW5kZXgudHNcbmltcG9ydCB7IEF1dGggfSBmcm9tIFwiQGF1dGgvY29yZVwiO1xuaW1wb3J0IHsgZW52LCBnZXRSdW50aW1lS2V5IH0gZnJvbSBcImhvbm8vYWRhcHRlclwiO1xuaW1wb3J0IHsgSFRUUEV4Y2VwdGlvbiB9IGZyb20gXCJob25vL2h0dHAtZXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBzZXRFbnZEZWZhdWx0cyBhcyBjb3JlU2V0RW52RGVmYXVsdHMgfSBmcm9tIFwiQGF1dGgvY29yZVwiO1xuZnVuY3Rpb24gc2V0RW52RGVmYXVsdHMoZW52MiwgY29uZmlnKSB7XG4gIGNvbmZpZy5zZWNyZXQgPz89IGVudjIuQVVUSF9TRUNSRVQ7XG4gIGNvbmZpZy5iYXNlUGF0aCB8fD0gXCIvYXBpL2F1dGhcIjtcbiAgY29yZVNldEVudkRlZmF1bHRzKGVudjIsIGNvbmZpZyk7XG59XG5hc3luYyBmdW5jdGlvbiBjbG9uZVJlcXVlc3QoaW5wdXQsIHJlcXVlc3QsIGhlYWRlcnMpIHtcbiAgaWYgKGdldFJ1bnRpbWVLZXkoKSA9PT0gXCJidW5cIikge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdChpbnB1dCwge1xuICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMgPz8gbmV3IEhlYWRlcnMocmVxdWVzdC5oZWFkZXJzKSxcbiAgICAgIGJvZHk6IHJlcXVlc3QubWV0aG9kID09PSBcIkdFVFwiIHx8IHJlcXVlc3QubWV0aG9kID09PSBcIkhFQURcIiA/IHZvaWQgMCA6IGF3YWl0IHJlcXVlc3QuYmxvYigpLFxuICAgICAgLy8gQHRzLWlnbm9yZTogVFMyMzUzXG4gICAgICByZWZlcnJlcjogXCJyZWZlcnJlclwiIGluIHJlcXVlc3QgPyByZXF1ZXN0LnJlZmVycmVyIDogdm9pZCAwLFxuICAgICAgLy8gZGVuby1saW50LWlnbm9yZSBuby1leHBsaWNpdC1hbnlcbiAgICAgIHJlZmVycmVyUG9saWN5OiByZXF1ZXN0LnJlZmVycmVyUG9saWN5LFxuICAgICAgbW9kZTogcmVxdWVzdC5tb2RlLFxuICAgICAgY3JlZGVudGlhbHM6IHJlcXVlc3QuY3JlZGVudGlhbHMsXG4gICAgICAvLyBAdHMtaWdub3JlOiBUUzIzNTNcbiAgICAgIGNhY2hlOiByZXF1ZXN0LmNhY2hlLFxuICAgICAgcmVkaXJlY3Q6IHJlcXVlc3QucmVkaXJlY3QsXG4gICAgICBpbnRlZ3JpdHk6IHJlcXVlc3QuaW50ZWdyaXR5LFxuICAgICAga2VlcGFsaXZlOiByZXF1ZXN0LmtlZXBhbGl2ZSxcbiAgICAgIHNpZ25hbDogcmVxdWVzdC5zaWduYWxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbmV3IFJlcXVlc3QoaW5wdXQsIHJlcXVlc3QpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVxV2l0aEVudlVybChyZXEsIGF1dGhVcmwpIHtcbiAgaWYgKGF1dGhVcmwpIHtcbiAgICBjb25zdCByZXFVcmxPYmogPSBuZXcgVVJMKHJlcS51cmwpO1xuICAgIGNvbnN0IGF1dGhVcmxPYmogPSBuZXcgVVJMKGF1dGhVcmwpO1xuICAgIGNvbnN0IHByb3BzID0gW1wiaG9zdG5hbWVcIiwgXCJwcm90b2NvbFwiLCBcInBvcnRcIiwgXCJwYXNzd29yZFwiLCBcInVzZXJuYW1lXCJdO1xuICAgIHByb3BzLmZvckVhY2goKHByb3ApID0+IHJlcVVybE9ialtwcm9wXSA9IGF1dGhVcmxPYmpbcHJvcF0pO1xuICAgIHJldHVybiBjbG9uZVJlcXVlc3QocmVxVXJsT2JqLmhyZWYsIHJlcSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXEudXJsKTtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxLmhlYWRlcnMpO1xuICAgIGNvbnN0IHByb3RvID0gaGVhZGVycy5nZXQoXCJ4LWZvcndhcmRlZC1wcm90b1wiKTtcbiAgICBjb25zdCBob3N0ID0gaGVhZGVycy5nZXQoXCJ4LWZvcndhcmRlZC1ob3N0XCIpID8/IGhlYWRlcnMuZ2V0KFwiaG9zdFwiKTtcbiAgICBpZiAocHJvdG8gIT0gbnVsbClcbiAgICAgIHVybC5wcm90b2NvbCA9IHByb3RvLmVuZHNXaXRoKFwiOlwiKSA/IHByb3RvIDogcHJvdG8gKyBcIjpcIjtcbiAgICBpZiAoaG9zdCAhPSBudWxsKSB7XG4gICAgICB1cmwuaG9zdCA9IGhvc3Q7XG4gICAgICBjb25zdCBwb3J0TWF0Y2ggPSBob3N0Lm1hdGNoKC86KFxcZCspJC8pO1xuICAgICAgaWYgKHBvcnRNYXRjaClcbiAgICAgICAgdXJsLnBvcnQgPSBwb3J0TWF0Y2hbMV07XG4gICAgICBlbHNlXG4gICAgICAgIHVybC5wb3J0ID0gXCJcIjtcbiAgICAgIGhlYWRlcnMuZGVsZXRlKFwieC1mb3J3YXJkZWQtaG9zdFwiKTtcbiAgICAgIGhlYWRlcnMuZGVsZXRlKFwiSG9zdFwiKTtcbiAgICAgIGhlYWRlcnMuc2V0KFwiSG9zdFwiLCBob3N0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb25lUmVxdWVzdCh1cmwuaHJlZiwgcmVxLCBoZWFkZXJzKTtcbiAgfVxufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aFVzZXIoYykge1xuICBjb25zdCBjb25maWcgPSBjLmdldChcImF1dGhDb25maWdcIik7XG4gIGNvbnN0IGN0eEVudiA9IGVudihjKTtcbiAgc2V0RW52RGVmYXVsdHMoY3R4RW52LCBjb25maWcpO1xuICBjb25zdCBhdXRoUmVxID0gYXdhaXQgcmVxV2l0aEVudlVybChjLnJlcS5yYXcsIGN0eEVudi5BVVRIX1VSTCk7XG4gIGNvbnN0IG9yaWdpbiA9IG5ldyBVUkwoYXV0aFJlcS51cmwpLm9yaWdpbjtcbiAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAke29yaWdpbn0ke2NvbmZpZy5iYXNlUGF0aH0vc2Vzc2lvbmAsIHtcbiAgICBoZWFkZXJzOiB7IGNvb2tpZTogYy5yZXEuaGVhZGVyKFwiY29va2llXCIpID8/IFwiXCIgfVxuICB9KTtcbiAgbGV0IGF1dGhVc2VyID0ge307XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQXV0aChyZXF1ZXN0LCB7XG4gICAgLi4uY29uZmlnLFxuICAgIGNhbGxiYWNrczoge1xuICAgICAgLi4uY29uZmlnLmNhbGxiYWNrcyxcbiAgICAgIGFzeW5jIHNlc3Npb24oLi4uYXJncykge1xuICAgICAgICBhdXRoVXNlciA9IGFyZ3NbMF07XG4gICAgICAgIGNvbnN0IHNlc3Npb24yID0gYXdhaXQgY29uZmlnLmNhbGxiYWNrcz8uc2Vzc2lvbj8uKC4uLmFyZ3MpID8/IGFyZ3NbMF0uc2Vzc2lvbjtcbiAgICAgICAgY29uc3QgdXNlciA9IGFyZ3NbMF0udXNlciA/PyBhcmdzWzBdLnRva2VuO1xuICAgICAgICByZXR1cm4geyB1c2VyLCAuLi5zZXNzaW9uMiB9O1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBzZXNzaW9uICYmIHNlc3Npb24udXNlciA/IGF1dGhVc2VyIDogbnVsbDtcbn1cbmZ1bmN0aW9uIHZlcmlmeUF1dGgoKSB7XG4gIHJldHVybiBhc3luYyAoYywgbmV4dCkgPT4ge1xuICAgIGNvbnN0IGF1dGhVc2VyID0gYXdhaXQgZ2V0QXV0aFVzZXIoYyk7XG4gICAgY29uc3QgaXNBdXRoID0gISFhdXRoVXNlcj8udG9rZW4gfHwgISFhdXRoVXNlcj8udXNlcjtcbiAgICBpZiAoIWlzQXV0aCkge1xuICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlKFwiVW5hdXRob3JpemVkXCIsIHtcbiAgICAgICAgc3RhdHVzOiA0MDFcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEhUVFBFeGNlcHRpb24oNDAxLCB7IHJlcyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYy5zZXQoXCJhdXRoVXNlclwiLCBhdXRoVXNlcik7XG4gICAgfVxuICAgIGF3YWl0IG5leHQoKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGluaXRBdXRoQ29uZmlnKGNiKSB7XG4gIHJldHVybiBhc3luYyAoYywgbmV4dCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IGNiKGMpO1xuICAgIGMuc2V0KFwiYXV0aENvbmZpZ1wiLCBjb25maWcpO1xuICAgIGF3YWl0IG5leHQoKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGF1dGhIYW5kbGVyKCkge1xuICByZXR1cm4gYXN5bmMgKGMpID0+IHtcbiAgICBjb25zdCBjb25maWcgPSBjLmdldChcImF1dGhDb25maWdcIik7XG4gICAgY29uc3QgY3R4RW52ID0gZW52KGMpO1xuICAgIHNldEVudkRlZmF1bHRzKGN0eEVudiwgY29uZmlnKTtcbiAgICBpZiAoIWNvbmZpZy5zZWNyZXQgfHwgY29uZmlnLnNlY3JldC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBIVFRQRXhjZXB0aW9uKDUwMCwgeyBtZXNzYWdlOiBcIk1pc3NpbmcgQVVUSF9TRUNSRVRcIiB9KTtcbiAgICB9XG4gICAgY29uc3QgYXV0aFJlcSA9IGF3YWl0IHJlcVdpdGhFbnZVcmwoYy5yZXEucmF3LCBjdHhFbnYuQVVUSF9VUkwpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEF1dGgoYXV0aFJlcSwgY29uZmlnKTtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHJlcy5ib2R5LCByZXMpO1xuICB9O1xufVxuZXhwb3J0IHtcbiAgYXV0aEhhbmRsZXIsXG4gIGdldEF1dGhVc2VyLFxuICBpbml0QXV0aENvbmZpZyxcbiAgcmVxV2l0aEVudlVybCxcbiAgc2V0RW52RGVmYXVsdHMsXG4gIHZlcmlmeUF1dGhcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@hono/auth-js/dist/index.mjs\n");

/***/ }),

/***/ "(rsc)/./node_modules/@hono/zod-validator/dist/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@hono/zod-validator/dist/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   zValidator: () => (/* binding */ zValidator)\n/* harmony export */ });\n/* harmony import */ var hono_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hono/validator */ \"(rsc)/./node_modules/hono/dist/validator/index.js\");\n\nconst zValidator = (target, schema, hook) => \n// @ts-expect-error not typed well\n(0,hono_validator__WEBPACK_IMPORTED_MODULE_0__.validator)(target, async (value, c) => {\n    const result = await schema.safeParseAsync(value);\n    if (hook) {\n        const hookResult = await hook({ data: value, ...result }, c);\n        if (hookResult) {\n            if (hookResult instanceof Response) {\n                return hookResult;\n            }\n            if ('response' in hookResult) {\n                return hookResult.response;\n            }\n        }\n    }\n    if (!result.success) {\n        return c.json(result, 400);\n    }\n    return result.data;\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQGhvbm8vem9kLXZhbGlkYXRvci9kaXN0L2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUNwQztBQUNQO0FBQ0EseURBQVM7QUFDVDtBQUNBO0FBQ0Esd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aGUtY2FudmFzLy4vbm9kZV9tb2R1bGVzL0Bob25vL3pvZC12YWxpZGF0b3IvZGlzdC9lc20vaW5kZXguanM/MDE1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2YWxpZGF0b3IgfSBmcm9tICdob25vL3ZhbGlkYXRvcic7XG5leHBvcnQgY29uc3QgelZhbGlkYXRvciA9ICh0YXJnZXQsIHNjaGVtYSwgaG9vaykgPT4gXG4vLyBAdHMtZXhwZWN0LWVycm9yIG5vdCB0eXBlZCB3ZWxsXG52YWxpZGF0b3IodGFyZ2V0LCBhc3luYyAodmFsdWUsIGMpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzY2hlbWEuc2FmZVBhcnNlQXN5bmModmFsdWUpO1xuICAgIGlmIChob29rKSB7XG4gICAgICAgIGNvbnN0IGhvb2tSZXN1bHQgPSBhd2FpdCBob29rKHsgZGF0YTogdmFsdWUsIC4uLnJlc3VsdCB9LCBjKTtcbiAgICAgICAgaWYgKGhvb2tSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChob29rUmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9va1Jlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgncmVzcG9uc2UnIGluIGhvb2tSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9va1Jlc3VsdC5yZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiBjLmpzb24ocmVzdWx0LCA0MDApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@hono/zod-validator/dist/esm/index.js\n");

/***/ })

};
;