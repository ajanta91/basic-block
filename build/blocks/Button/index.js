/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/Button/block.json":
/*!**************************************!*\
  !*** ./src/blocks/Button/block.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"basic-block/button","version":"1.0.0","title":"Button [BB]","category":"wp-nonce-blocks","description":"Display a Button block.","example":{},"attributes":{"buttonLabel":{"type":"string","default":"Click Me"},"buttonUrl":{"type":"string","default":"#"},"openInNewTab":{"type":"boolean","default":false},"buttonClass":{"type":"string","default":"btn-primary"}},"supports":{"color":{"background":false,"text":true},"html":false,"typography":{"fontSize":true}},"textdomain":"basic-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ }),

/***/ "./src/blocks/Button/edit.js":
/*!***********************************!*\
  !*** ./src/blocks/Button/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * Imports the InspectorControls component, which is used to wrap
 * the block's custom controls that will appear in in the Settings
 * Sidebar when the block is selected.
 *
 * Also imports the React hook that is used to mark the block wrapper
 * element. It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */


/**
 * Imports the useEffect React Hook. This is used to set an attribute when the
 * block is loaded in the Editor.
 *
 * @see https://react.dev/reference/react/useEffect
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes
}) {
  const {
    buttonLabel,
    buttonUrl,
    openInNewTab,
    buttonClass,
    buttonId,
    backgroundColor
  } = attributes;
  console.log('Edit function called with attributes:', attributes);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings', 'basic-block'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Label', 'basic-block'),
          value: attributes.buttonLabel,
          onChange: value => setAttributes({
            buttonLabel: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button URL', 'basic-block'),
          value: attributes.buttonUrl,
          onChange: value => setAttributes({
            buttonUrl: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Open in new tab', 'basic-block'),
          checked: attributes.openInNewTab,
          onChange: value => setAttributes({
            openInNewTab: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Class', 'basic-block'),
          value: attributes.buttonClass,
          onChange: value => setAttributes({
            buttonClass: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button ID', 'basic-block'),
          value: attributes.buttonId,
          onChange: value => setAttributes({
            buttonId: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Advanced Settings', 'basic-block'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom CSS Class', 'basic-block'),
          value: attributes.customClass,
          onChange: value => setAttributes({
            customClass: value
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
        href: attributes.buttonUrl,
        target: attributes.openInNewTab ? '_blank' : '_self',
        className: attributes.buttonClass,
        id: attributes.buttonId,
        children: attributes.buttonLabel
      })
    })]
  });
}

/***/ }),

/***/ "./src/blocks/Button/save.js":
/*!***********************************!*\
  !*** ./src/blocks/Button/save.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 *
 * @return {Element} Element to render.
 */

function save({
  attributes
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
      href: attributes.buttonUrl,
      id: attributes.buttonId,
      className: `wp_nonce_button ${attributes.buttonClass}`,
      children: attributes.buttonLabel
    })
  });
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/blocks/Button/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/Button/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/blocks/Button/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/blocks/Button/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */


/**
 * Internal dependencies
 */




/**
 * Define a custom SVG icon for the block. This icon will appear in
 * the Inserter and when the user selects the block in the Editor.
 */

const calendarIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("svg", {
    width: "24",
    height: "15",
    viewBox: "0 0 24 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("rect", {
      x: "0.5",
      y: "0.5",
      width: "23",
      height: "14",
      rx: "2.5",
      fill: "white",
      stroke: "#1AD694"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
      d: "M7.06277 7.3935C7.23077 7.4235 7.37327 7.512 7.49027 7.659C7.60727 7.806 7.66577 7.9725 7.66577 8.1585C7.66577 8.3175 7.62377 8.4615 7.53977 8.5905C7.45877 8.7165 7.34027 8.817 7.18427 8.892C7.02827 8.964 6.84677 9 6.63977 9H5.38877V5.8725H6.58127C6.79427 5.8725 6.97727 5.9085 7.13027 5.9805C7.28327 6.0525 7.39877 6.15 7.47677 6.273C7.55477 6.393 7.59377 6.528 7.59377 6.678C7.59377 6.858 7.54577 7.008 7.44977 7.128C7.35377 7.248 7.22477 7.3365 7.06277 7.3935ZM5.90177 7.1865H6.53627C6.70427 7.1865 6.83477 7.149 6.92777 7.074C7.02377 6.996 7.07177 6.885 7.07177 6.741C7.07177 6.6 7.02377 6.4905 6.92777 6.4125C6.83477 6.3315 6.70427 6.291 6.53627 6.291H5.90177V7.1865ZM6.59477 8.5815C6.76877 8.5815 6.90527 8.5395 7.00427 8.4555C7.10327 8.3715 7.15277 8.2545 7.15277 8.1045C7.15277 7.9515 7.10027 7.83 6.99527 7.74C6.89027 7.65 6.75077 7.605 6.57677 7.605H5.90177V8.5815H6.59477ZM10.4687 6.5205V9H9.95574V8.7075C9.87474 8.8095 9.76824 8.8905 9.63624 8.9505C9.50724 9.0075 9.36924 9.036 9.22224 9.036C9.02724 9.036 8.85174 8.9955 8.69574 8.9145C8.54274 8.8335 8.42124 8.7135 8.33124 8.5545C8.24424 8.3955 8.20074 8.2035 8.20074 7.9785V6.5205H8.70924V7.902C8.70924 8.124 8.76474 8.295 8.87574 8.415C8.98674 8.532 9.13824 8.5905 9.33024 8.5905C9.52224 8.5905 9.67374 8.532 9.78474 8.415C9.89874 8.295 9.95574 8.124 9.95574 7.902V6.5205H10.4687ZM11.7441 6.939V8.3115C11.7441 8.4045 11.7651 8.472 11.8071 8.514C11.8521 8.553 11.9271 8.5725 12.0321 8.5725H12.3471V9H11.9421C11.7111 9 11.5341 8.946 11.4111 8.838C11.2881 8.73 11.2266 8.5545 11.2266 8.3115V6.939H10.9341V6.5205H11.2266V5.904H11.7441V6.5205H12.3471V6.939H11.7441ZM13.4184 6.939V8.3115C13.4184 8.4045 13.4394 8.472 13.4814 8.514C13.5264 8.553 13.6014 8.5725 13.7064 8.5725H14.0214V9H13.6164C13.3854 9 13.2084 8.946 13.0854 8.838C12.9624 8.73 12.9009 8.5545 12.9009 8.3115V6.939H12.6084V6.5205H12.9009V5.904H13.4184V6.5205H14.0214V6.939H13.4184ZM15.5697 9.0405C15.3357 9.0405 15.1242 8.988 14.9352 8.883C14.7462 8.775 14.5977 8.625 14.4897 8.433C14.3817 8.238 14.3277 8.013 14.3277 7.758C14.3277 7.506 14.3832 7.2825 14.4942 7.0875C14.6052 6.8925 14.7567 6.7425 14.9487 6.6375C15.1407 6.5325 15.3552 6.48 15.5922 6.48C15.8292 6.48 16.0437 6.5325 16.2357 6.6375C16.4277 6.7425 16.5792 6.8925 16.6902 7.0875C16.8012 7.2825 16.8567 7.506 16.8567 7.758C16.8567 8.01 16.7997 8.2335 16.6857 8.4285C16.5717 8.6235 16.4157 8.775 16.2177 8.883C16.0227 8.988 15.8067 9.0405 15.5697 9.0405ZM15.5697 8.595C15.7017 8.595 15.8247 8.5635 15.9387 8.5005C16.0557 8.4375 16.1502 8.343 16.2222 8.217C16.2942 8.091 16.3302 7.938 16.3302 7.758C16.3302 7.578 16.2957 7.4265 16.2267 7.3035C16.1577 7.1775 16.0662 7.083 15.9522 7.02C15.8382 6.957 15.7152 6.9255 15.5832 6.9255C15.4512 6.9255 15.3282 6.957 15.2142 7.02C15.1032 7.083 15.0147 7.1775 14.9487 7.3035C14.8827 7.4265 14.8497 7.578 14.8497 7.758C14.8497 8.025 14.9172 8.232 15.0522 8.379C15.1902 8.523 15.3627 8.595 15.5697 8.595ZM18.6149 6.48C18.8099 6.48 18.9839 6.5205 19.1369 6.6015C19.2929 6.6825 19.4144 6.8025 19.5014 6.9615C19.5884 7.1205 19.6319 7.3125 19.6319 7.5375V9H19.1234V7.614C19.1234 7.392 19.0679 7.2225 18.9569 7.1055C18.8459 6.9855 18.6944 6.9255 18.5024 6.9255C18.3104 6.9255 18.1574 6.9855 18.0434 7.1055C17.9324 7.2225 17.8769 7.392 17.8769 7.614V9H17.3639V6.5205H17.8769V6.804C17.9609 6.702 18.0674 6.6225 18.1964 6.5655C18.3284 6.5085 18.4679 6.48 18.6149 6.48Z",
      fill: "black"
    })]
  })
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  icon: calendarIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map