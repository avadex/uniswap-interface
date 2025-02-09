'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var bignumber = require('@ethersproject/bignumber');
var toolkit = require('@reduxjs/toolkit');

var DEFAULT_CALL_GAS_REQUIRED = 1000000;
var DEFAULT_CHUNK_GAS_REQUIRED = 200000;
var CHUNK_GAS_LIMIT = 100000000;
var CONSERVATIVE_BLOCK_GAS_LIMIT = 10000000; // conservative, hard-coded estimate of the current block gas limit
// Consts for hooks

var INVALID_RESULT = {
  valid: false,
  blockNumber: undefined,
  data: undefined
};
var NEVER_RELOAD = {
  blocksPerFetch: Infinity
};
var INVALID_CALL_STATE = {
  valid: false,
  result: undefined,
  loading: false,
  syncing: false,
  error: false
};
var LOADING_CALL_STATE = {
  valid: true,
  result: undefined,
  loading: true,
  syncing: true,
  error: false
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function toCallKey(call) {
  var key = call.address + "-" + call.callData;

  if (call.gasRequired) {
    if (!Number.isSafeInteger(call.gasRequired)) {
      throw new Error("Invalid number: " + call.gasRequired);
    }

    key += "-" + call.gasRequired;
  }

  return key;
}
function parseCallKey(callKey) {
  var pcs = callKey.split('-');

  if (![2, 3].includes(pcs.length)) {
    throw new Error("Invalid call key: " + callKey);
  }

  return _extends({
    address: pcs[0],
    callData: pcs[1]
  }, pcs[2] ? {
    gasRequired: Number.parseInt(pcs[2])
  } : {});
}
function callsToCallKeys(calls) {
  var _calls$filter$map$sor, _calls$filter, _calls$filter$map;

  return (_calls$filter$map$sor = calls == null ? void 0 : (_calls$filter = calls.filter(function (c) {
    return Boolean(c);
  })) == null ? void 0 : (_calls$filter$map = _calls$filter.map(toCallKey)) == null ? void 0 : _calls$filter$map.sort()) != null ? _calls$filter$map$sor : [];
}
function callKeysToCalls(callKeys) {
  if (!(callKeys != null && callKeys.length)) return null;
  return callKeys.map(function (key) {
    return parseCallKey(key);
  });
}

function toCallState(callResult, contractInterface, fragment, latestBlockNumber) {
  if (!callResult) return INVALID_CALL_STATE;
  var valid = callResult.valid,
      data = callResult.data,
      blockNumber = callResult.blockNumber;
  if (!valid) return INVALID_CALL_STATE;
  if (valid && !blockNumber) return LOADING_CALL_STATE;
  if (!contractInterface || !fragment || !latestBlockNumber) return LOADING_CALL_STATE;
  var success = data && data.length > 2;
  var syncing = (blockNumber != null ? blockNumber : 0) < latestBlockNumber;
  var result = undefined;

  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data);
    } catch (error) {
      console.debug('Result data parsing failed', fragment, data);
      return {
        valid: true,
        loading: false,
        error: true,
        syncing: syncing,
        result: result
      };
    }
  }

  return {
    valid: true,
    loading: false,
    syncing: syncing,
    result: result,
    error: !success
  };
}

function isMethodArg(x) {
  return bignumber.BigNumber.isBigNumber(x) || ['string', 'number'].indexOf(typeof x) !== -1;
}
function isValidMethodArgs(x) {
  return x === undefined || Array.isArray(x) && x.every(function (xi) {
    return isMethodArg(xi) || Array.isArray(xi) && xi.every(isMethodArg);
  });
}

function useCallsDataSubscription(context, chainId, calls, blocksPerFetch) {
  if (blocksPerFetch === void 0) {
    blocksPerFetch = 1;
  }

  var reducerPath = context.reducerPath,
      actions = context.actions;
  var callResults = reactRedux.useSelector(function (state) {
    return state[reducerPath].callResults;
  });
  var dispatch = reactRedux.useDispatch();
  var serializedCallKeys = React.useMemo(function () {
    return JSON.stringify(callsToCallKeys(calls));
  }, [calls]); // update listeners when there is an actual change that persists for at least 100ms

  React.useEffect(function () {
    var callKeys = JSON.parse(serializedCallKeys);
    var calls = callKeysToCalls(callKeys);
    if (!chainId || !calls) return;
    dispatch(actions.addMulticallListeners({
      chainId: chainId,
      calls: calls,
      options: {
        blocksPerFetch: blocksPerFetch
      }
    }));
    return function () {
      dispatch(actions.removeMulticallListeners({
        chainId: chainId,
        calls: calls,
        options: {
          blocksPerFetch: blocksPerFetch
        }
      }));
    };
  }, [actions, chainId, dispatch, blocksPerFetch, serializedCallKeys]);
  return React.useMemo(function () {
    return calls.map(function (call) {
      var _callResults$chainId;

      if (!chainId || !call) return INVALID_RESULT;
      var result = (_callResults$chainId = callResults[chainId]) == null ? void 0 : _callResults$chainId[toCallKey(call)];
      var data = result != null && result.data && result.data !== '0x' ? result.data : undefined;
      return {
        valid: true,
        data: data,
        blockNumber: result == null ? void 0 : result.blockNumber
      };
    });
  }, [callResults, calls, chainId]);
} // Similar to useCallsDataSubscription above but for subscribing to
// calls to multiple chains at once


function useMultichainCallsDataSubscription(context, chainToCalls, blocksPerFetch) {
  if (blocksPerFetch === void 0) {
    blocksPerFetch = 1;
  }

  var reducerPath = context.reducerPath,
      actions = context.actions;
  var callResults = reactRedux.useSelector(function (state) {
    return state[reducerPath].callResults;
  });
  var dispatch = reactRedux.useDispatch();
  var serializedCallKeys = React.useMemo(function () {
    var sortedChainIds = getChainIds(chainToCalls).sort();
    var chainCallKeysTuple = sortedChainIds.map(function (chainId) {
      var calls = chainToCalls[chainId];
      var callKeys = callsToCallKeys(calls); // Note, using a tuple to ensure consistent order when serialized

      return [chainId, callKeys];
    });
    return JSON.stringify(chainCallKeysTuple);
  }, [chainToCalls]);
  React.useEffect(function () {
    var chainCallKeysTuples = JSON.parse(serializedCallKeys);
    if (!(chainCallKeysTuples != null && chainCallKeysTuples.length)) return;
    reactRedux.batch(function () {
      for (var _iterator = _createForOfIteratorHelperLoose(chainCallKeysTuples), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
            chainId = _step$value[0],
            callKeys = _step$value[1];
        var calls = callKeysToCalls(callKeys);
        if (!(calls != null && calls.length)) continue;
        dispatch(actions.addMulticallListeners({
          chainId: chainId,
          calls: calls,
          options: {
            blocksPerFetch: blocksPerFetch
          }
        }));
      }
    });
    return function () {
      reactRedux.batch(function () {
        for (var _iterator2 = _createForOfIteratorHelperLoose(chainCallKeysTuples), _step2; !(_step2 = _iterator2()).done;) {
          var _step2$value = _step2.value,
              chainId = _step2$value[0],
              callKeys = _step2$value[1];
          var calls = callKeysToCalls(callKeys);
          if (!(calls != null && calls.length)) continue;
          dispatch(actions.removeMulticallListeners({
            chainId: chainId,
            calls: calls,
            options: {
              blocksPerFetch: blocksPerFetch
            }
          }));
        }
      });
    };
  }, [actions, dispatch, blocksPerFetch, serializedCallKeys]);
  return React.useMemo(function () {
    return getChainIds(chainToCalls).reduce(function (result, chainId) {
      var calls = chainToCalls[chainId];
      result[chainId] = calls.map(function (call) {
        var _callResults$chainId2;

        if (!chainId || !call) return INVALID_RESULT;
        var result = (_callResults$chainId2 = callResults[chainId]) == null ? void 0 : _callResults$chainId2[toCallKey(call)];
        var data = result != null && result.data && result.data !== '0x' ? result.data : undefined;
        return {
          valid: true,
          data: data,
          blockNumber: result == null ? void 0 : result.blockNumber
        };
      });
      return result;
    }, {});
  }, [callResults, chainToCalls]);
} // formats many calls to a single function on a single contract, with the function name and inputs specified


function useSingleContractMultipleData(context, chainId, latestBlockNumber, contract, methodName, callInputs, options) {
  var _ref = options != null ? options : {},
      gasRequired = _ref.gasRequired,
      blocksPerFetch = _ref.blocksPerFetch; // Create ethers function fragment


  var fragment = React.useMemo(function () {
    var _contract$interface;

    return contract == null ? void 0 : (_contract$interface = contract["interface"]) == null ? void 0 : _contract$interface.getFunction(methodName);
  }, [contract, methodName]); // Get encoded call data. Note can't use useCallData below b.c. this is  for a list of CallInputs

  var callDatas = React.useMemo(function () {
    if (!contract || !fragment) return [];
    return callInputs.map(function (callInput) {
      return isValidMethodArgs(callInput) ? contract["interface"].encodeFunctionData(fragment, callInput) : undefined;
    });
  }, [callInputs, contract, fragment]); // Create call objects

  var calls = React.useMemo(function () {
    if (!contract) return [];
    return callDatas.map(function (callData) {
      if (!callData) return undefined;
      return {
        address: contract.address,
        callData: callData,
        gasRequired: gasRequired
      };
    });
  }, [contract, callDatas, gasRequired]); // Subscribe to call data

  var results = useCallsDataSubscription(context, chainId, calls, blocksPerFetch);
  return React.useMemo(function () {
    return results.map(function (result) {
      return toCallState(result, contract == null ? void 0 : contract["interface"], fragment, latestBlockNumber);
    });
  }, [results, contract, fragment, latestBlockNumber]);
}
function useMultipleContractSingleData(context, chainId, latestBlockNumber, addresses, contractInterface, methodName, callInputs, options) {
  var _ref2 = options != null ? options : {},
      gasRequired = _ref2.gasRequired,
      blocksPerFetch = _ref2.blocksPerFetch;

  var _useCallData = useCallData(methodName, contractInterface, callInputs),
      fragment = _useCallData.fragment,
      callData = _useCallData.callData; // Create call objects


  var calls = React.useMemo(function () {
    if (!callData) return [];
    return addresses.map(function (address) {
      if (!address) return undefined;
      return {
        address: address,
        callData: callData,
        gasRequired: gasRequired
      };
    });
  }, [addresses, callData, gasRequired]); // Subscribe to call data

  var results = useCallsDataSubscription(context, chainId, calls, blocksPerFetch);
  return React.useMemo(function () {
    return results.map(function (result) {
      return toCallState(result, contractInterface, fragment, latestBlockNumber);
    });
  }, [fragment, results, contractInterface, latestBlockNumber]);
}
function useSingleCallResult(context, chainId, latestBlockNumber, contract, methodName, inputs, options) {
  var _useSingleContractMul;

  return (_useSingleContractMul = useSingleContractMultipleData(context, chainId, latestBlockNumber, contract, methodName, [inputs], options)[0]) != null ? _useSingleContractMul : INVALID_CALL_STATE;
} // formats many calls to any number of functions on a single contract, with only the calldata specified

function useSingleContractWithCallData(context, chainId, latestBlockNumber, contract, callDatas, options) {
  var _ref3 = options != null ? options : {},
      gasRequired = _ref3.gasRequired,
      blocksPerFetch = _ref3.blocksPerFetch; // Create call objects


  var calls = React.useMemo(function () {
    if (!contract) return [];
    return callDatas.map(function (callData) {
      return {
        address: contract.address,
        callData: callData,
        gasRequired: gasRequired
      };
    });
  }, [contract, callDatas, gasRequired]); // Subscribe to call data

  var results = useCallsDataSubscription(context, chainId, calls, blocksPerFetch);
  return React.useMemo(function () {
    return results.map(function (result, i) {
      var _contract$interface2;

      return toCallState(result, contract == null ? void 0 : contract["interface"], contract == null ? void 0 : (_contract$interface2 = contract["interface"]) == null ? void 0 : _contract$interface2.getFunction(callDatas[i].substring(0, 10)), latestBlockNumber);
    });
  }, [results, contract, callDatas, latestBlockNumber]);
} // Similar to useMultipleContractSingleData but instead of multiple contracts on one chain,
// this is for querying compatible contracts on multiple chains

function useMultiChainMultiContractSingleData(context, chainToBlockNumber, chainToAddresses, contractInterface, methodName, callInputs, options) {
  var _ref4 = options != null ? options : {},
      gasRequired = _ref4.gasRequired,
      blocksPerFetch = _ref4.blocksPerFetch;

  var _useCallData2 = useCallData(methodName, contractInterface, callInputs),
      fragment = _useCallData2.fragment,
      callData = _useCallData2.callData; // Create call objects


  var chainToCalls = React.useMemo(function () {
    if (!callData || !chainToAddresses) return {};
    return getChainIds(chainToAddresses).reduce(function (result, chainId) {
      var addresses = chainToAddresses[chainId];
      var calls = addresses.map(function (address) {
        if (!address) return undefined;
        return {
          address: address,
          callData: callData,
          gasRequired: gasRequired
        };
      });
      result[chainId] = calls;
      return result;
    }, {});
  }, [chainToAddresses, callData, gasRequired]); // Subscribe to call data

  var chainIdToResults = useMultichainCallsDataSubscription(context, chainToCalls, blocksPerFetch);
  return React.useMemo(function () {
    return getChainIds(chainIdToResults).reduce(function (combinedResults, chainId) {
      var latestBlockNumber = chainToBlockNumber == null ? void 0 : chainToBlockNumber[chainId];
      var results = chainIdToResults[chainId];
      combinedResults[chainId] = results.map(function (result) {
        return toCallState(result, contractInterface, fragment, latestBlockNumber);
      });
      return combinedResults;
    }, {});
  }, [fragment, contractInterface, chainIdToResults, chainToBlockNumber]);
} // Similar to useSingleCallResult but instead of one contract on one chain,
// this is for querying a contract on multiple chains

function useMultiChainSingleContractSingleData(context, chainToBlockNumber, chainToAddress, contractInterface, methodName, callInputs, options) {
  // This hook uses the more flexible useMultiChainMultiContractSingleData internally,
  // but transforms the inputs and outputs for convenience
  var chainIdToAddresses = React.useMemo(function () {
    return getChainIds(chainToAddress).reduce(function (result, chainId) {
      result[chainId] = [chainToAddress[chainId]];
      return result;
    }, {});
  }, [chainToAddress]);
  var multiContractResults = useMultiChainMultiContractSingleData(context, chainToBlockNumber, chainIdToAddresses, contractInterface, methodName, callInputs, options);
  return React.useMemo(function () {
    return getChainIds(chainToAddress).reduce(function (result, chainId) {
      var _multiContractResults, _multiContractResults2;

      result[chainId] = (_multiContractResults = (_multiContractResults2 = multiContractResults[chainId]) == null ? void 0 : _multiContractResults2[0]) != null ? _multiContractResults : INVALID_CALL_STATE;
      return result;
    }, {});
  }, [chainToAddress, multiContractResults]);
}

function useCallData(methodName, contractInterface, callInputs) {
  // Create ethers function fragment
  var fragment = React.useMemo(function () {
    return contractInterface == null ? void 0 : contractInterface.getFunction(methodName);
  }, [contractInterface, methodName]); // Get encoded call data

  var callData = React.useMemo(function () {
    return fragment && isValidMethodArgs(callInputs) ? contractInterface == null ? void 0 : contractInterface.encodeFunctionData(fragment, callInputs) : undefined;
  }, [callInputs, contractInterface, fragment]);
  return {
    fragment: fragment,
    callData: callData
  };
}

function getChainIds(chainIdMap) {
  return Object.keys(chainIdMap).map(function (c) {
    return parseInt(c, 10);
  });
}

var initialState = {
  callResults: {}
};
function createMulticallSlice(reducerPath) {
  return toolkit.createSlice({
    name: reducerPath,
    initialState: initialState,
    reducers: {
      addMulticallListeners: function addMulticallListeners(state, action) {
        var _listeners$chainId;

        var _action$payload = action.payload,
            calls = _action$payload.calls,
            chainId = _action$payload.chainId,
            blocksPerFetch = _action$payload.options.blocksPerFetch;
        var listeners = state.callListeners ? state.callListeners : state.callListeners = {};
        listeners[chainId] = (_listeners$chainId = listeners[chainId]) != null ? _listeners$chainId : {};
        calls.forEach(function (call) {
          var _listeners$chainId$ca, _listeners$chainId$ca2;

          var callKey = toCallKey(call);
          listeners[chainId][callKey] = (_listeners$chainId$ca = listeners[chainId][callKey]) != null ? _listeners$chainId$ca : {};
          listeners[chainId][callKey][blocksPerFetch] = ((_listeners$chainId$ca2 = listeners[chainId][callKey][blocksPerFetch]) != null ? _listeners$chainId$ca2 : 0) + 1;
        });
      },
      removeMulticallListeners: function removeMulticallListeners(state, action) {
        var _action$payload2 = action.payload,
            calls = _action$payload2.calls,
            chainId = _action$payload2.chainId,
            blocksPerFetch = _action$payload2.options.blocksPerFetch;
        var listeners = state.callListeners ? state.callListeners : state.callListeners = {};
        if (!listeners[chainId]) return;
        calls.forEach(function (call) {
          var callKey = toCallKey(call);
          if (!listeners[chainId][callKey]) return;
          if (!listeners[chainId][callKey][blocksPerFetch]) return;

          if (listeners[chainId][callKey][blocksPerFetch] === 1) {
            delete listeners[chainId][callKey][blocksPerFetch];
          } else {
            listeners[chainId][callKey][blocksPerFetch]--;
          }
        });
      },
      fetchingMulticallResults: function fetchingMulticallResults(state, action) {
        var _state$callResults$ch;

        var _action$payload3 = action.payload,
            chainId = _action$payload3.chainId,
            fetchingBlockNumber = _action$payload3.fetchingBlockNumber,
            calls = _action$payload3.calls;
        state.callResults[chainId] = (_state$callResults$ch = state.callResults[chainId]) != null ? _state$callResults$ch : {};
        calls.forEach(function (call) {
          var callKey = toCallKey(call);
          var current = state.callResults[chainId][callKey];

          if (!current) {
            state.callResults[chainId][callKey] = {
              fetchingBlockNumber: fetchingBlockNumber
            };
          } else {
            var _current$fetchingBloc;

            if (((_current$fetchingBloc = current.fetchingBlockNumber) != null ? _current$fetchingBloc : 0) >= fetchingBlockNumber) return;
            state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber;
          }
        });
      },
      errorFetchingMulticallResults: function errorFetchingMulticallResults(state, action) {
        var _state$callResults$ch2;

        var _action$payload4 = action.payload,
            chainId = _action$payload4.chainId,
            fetchingBlockNumber = _action$payload4.fetchingBlockNumber,
            calls = _action$payload4.calls;
        state.callResults[chainId] = (_state$callResults$ch2 = state.callResults[chainId]) != null ? _state$callResults$ch2 : {};
        calls.forEach(function (call) {
          var callKey = toCallKey(call);
          var current = state.callResults[chainId][callKey];
          if (!current || typeof current.fetchingBlockNumber !== 'number') return; // only should be dispatched if we are already fetching

          if (current.fetchingBlockNumber <= fetchingBlockNumber) {
            delete current.fetchingBlockNumber;
            current.data = null;
            current.blockNumber = fetchingBlockNumber;
          }
        });
      },
      updateMulticallResults: function updateMulticallResults(state, action) {
        var _state$callResults$ch3;

        var _action$payload5 = action.payload,
            chainId = _action$payload5.chainId,
            results = _action$payload5.results,
            blockNumber = _action$payload5.blockNumber;
        state.callResults[chainId] = (_state$callResults$ch3 = state.callResults[chainId]) != null ? _state$callResults$ch3 : {};
        Object.keys(results).forEach(function (callKey) {
          var _current$blockNumber;

          var current = state.callResults[chainId][callKey];
          if (((_current$blockNumber = current == null ? void 0 : current.blockNumber) != null ? _current$blockNumber : 0) > blockNumber) return;
          state.callResults[chainId][callKey] = {
            data: results[callKey],
            blockNumber: blockNumber
          };
        });
      }
    }
  });
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

/**
 * Tries to pack a list of items into as few bins as possible using the first-fit bin packing algorithm
 * @param calls the calls to chunk
 * @param chunkGasLimit the gas limit of any one chunk of calls, i.e. bin capacity
 * @param defaultGasRequired the default amount of gas an individual call should cost if not specified
 */

function chunkCalls(calls, chunkGasLimit, defaultGasRequired) {
  if (defaultGasRequired === void 0) {
    defaultGasRequired = DEFAULT_CHUNK_GAS_REQUIRED;
  }

  return calls // first sort by gas required
  .sort(function (c1, c2) {
    var _c2$gasRequired, _c1$gasRequired;

    return ((_c2$gasRequired = c2.gasRequired) != null ? _c2$gasRequired : defaultGasRequired) - ((_c1$gasRequired = c1.gasRequired) != null ? _c1$gasRequired : defaultGasRequired);
  }) // then bin the calls according to the first fit algorithm
  .reduce(function (bins, call) {
    var _call$gasRequired;

    var gas = (_call$gasRequired = call.gasRequired) != null ? _call$gasRequired : defaultGasRequired;

    for (var _iterator = _createForOfIteratorHelperLoose(bins), _step; !(_step = _iterator()).done;) {
      var bin = _step.value;

      if (bin.cumulativeGasLimit + gas <= chunkGasLimit) {
        bin.calls.push(call);
        bin.cumulativeGasLimit += gas;
        return bins;
      }
    } // didn't find a bin for the call, make a new bin


    bins.push({
      calls: [call],
      cumulativeGasLimit: gas
    });
    return bins;
  }, []) // pull out just the calls from each bin
  .map(function (b) {
    return b.calls;
  });
}

// TODO de-duplicate this file with web interface
// https://github.com/Uniswap/interface/blob/main/src/utils/retry.ts
function wait(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function waitRandom(min, max) {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}
/**
 * This error is thrown if the function is cancelled before completing
 */


var CancelledError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(CancelledError, _Error);

  function CancelledError() {
    var _this;

    _this = _Error.call(this, 'Cancelled') || this;
    _this.isCancelledError = true;
    return _this;
  }

  return CancelledError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Throw this error if the function should retry
 */


var RetryableError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(RetryableError, _Error2);

  function RetryableError() {
    var _this2;

    _this2 = _Error2.apply(this, arguments) || this;
    _this2.isRetryableError = true;
    return _this2;
  }

  return RetryableError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */

function retry(fn, _ref) {
  var n = _ref.n,
      minWait = _ref.minWait,
      maxWait = _ref.maxWait;
  var completed = false;
  var rejectCancelled;
  var promise = new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(resolve, reject) {
      var result;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rejectCancelled = reject;

            case 1:

              result = void 0;
              _context.prev = 3;
              _context.next = 6;
              return fn();

            case 6:
              result = _context.sent;

              if (!completed) {
                resolve(result);
                completed = true;
              }

              return _context.abrupt("break", 24);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);

              if (!completed) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("break", 24);

            case 15:
              if (!(n <= 0 || !_context.t0.isRetryableError)) {
                _context.next = 19;
                break;
              }

              reject(_context.t0);
              completed = true;
              return _context.abrupt("break", 24);

            case 19:
              n--;

            case 20:
              _context.next = 22;
              return waitRandom(minWait, maxWait);

            case 22:
              _context.next = 1;
              break;

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  return {
    promise: promise,
    cancel: function cancel() {
      if (completed) return;
      completed = true;
      rejectCancelled(new CancelledError());
    }
  };
}

// TODO de-duplicate this file with web interface

function useDebounce(value, delay) {
  var _useState = React.useState(value),
      debouncedValue = _useState[0],
      setDebouncedValue = _useState[1];

  React.useEffect(function () {
    // Update debounced value after delay
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay); // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.

    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

var FETCH_RETRY_CONFIG = {
  n: Infinity,
  minWait: 1000,
  maxWait: 2500
};
/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicall multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param blockNumber block number passed as the block tag in the eth_call
 */

function fetchChunk(_x, _x2, _x3, _x4) {
  return _fetchChunk.apply(this, arguments);
}
/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */


function _fetchChunk() {
  _fetchChunk = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(multicall, chunk, blockNumber, isDebug) {
    var _yield$multicall$call, returnData, _error$message, _error$message2, error, half, _yield$Promise$all, c0, c1;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.debug('Fetching chunk', chunk, blockNumber);
            _context.prev = 1;
            _context.next = 4;
            return multicall.callStatic.multicall(chunk.map(function (obj) {
              var _obj$gasRequired;

              return {
                target: obj.address,
                callData: obj.callData,
                gasLimit: (_obj$gasRequired = obj.gasRequired) != null ? _obj$gasRequired : DEFAULT_CALL_GAS_REQUIRED
              };
            }), // we aren't passing through the block gas limit we used to create the chunk, because it causes a problem with the integ tests
            {
              blockTag: blockNumber
            });

          case 4:
            _yield$multicall$call = _context.sent;
            returnData = _yield$multicall$call.returnData;

            if (isDebug) {
              returnData.forEach(function (_ref, i) {
                var _chunk$i$gasRequired;

                var gasUsed = _ref.gasUsed,
                    returnData = _ref.returnData,
                    success = _ref.success;

                if (!success && returnData.length === 2 && gasUsed.gte(Math.floor(((_chunk$i$gasRequired = chunk[i].gasRequired) != null ? _chunk$i$gasRequired : DEFAULT_CALL_GAS_REQUIRED) * 0.95))) {
                  var _chunk$i$gasRequired2;

                  console.warn("A call failed due to requiring " + gasUsed.toString() + " vs. allowed " + ((_chunk$i$gasRequired2 = chunk[i].gasRequired) != null ? _chunk$i$gasRequired2 : DEFAULT_CALL_GAS_REQUIRED), chunk[i]);
                }
              });
            }

            return _context.abrupt("return", returnData);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            error = _context.t0;

            if (!(error.code === -32000 || ((_error$message = error.message) == null ? void 0 : _error$message.indexOf('header not found')) !== -1)) {
              _context.next = 17;
              break;
            }

            throw new RetryableError("header not found for block number " + blockNumber);

          case 17:
            if (!(error.code === -32603 || ((_error$message2 = error.message) == null ? void 0 : _error$message2.indexOf('execution ran out of gas')) !== -1)) {
              _context.next = 27;
              break;
            }

            if (!(chunk.length > 1)) {
              _context.next = 27;
              break;
            }

            {
              console.debug('Splitting a chunk in 2', chunk);
            }

            half = Math.floor(chunk.length / 2);
            _context.next = 23;
            return Promise.all([fetchChunk(multicall, chunk.slice(0, half), blockNumber), fetchChunk(multicall, chunk.slice(half, chunk.length), blockNumber)]);

          case 23:
            _yield$Promise$all = _context.sent;
            c0 = _yield$Promise$all[0];
            c1 = _yield$Promise$all[1];
            return _context.abrupt("return", c0.concat(c1));

          case 27:
            console.error('Failed to fetch chunk', error);
            throw error;

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _fetchChunk.apply(this, arguments);
}

function activeListeningKeys(allListeners, chainId) {
  if (!allListeners || !chainId) return {};
  var listeners = allListeners[chainId];
  if (!listeners) return {};
  return Object.keys(listeners).reduce(function (memo, callKey) {
    var keyListeners = listeners[callKey];
    memo[callKey] = Object.keys(keyListeners).filter(function (key) {
      var blocksPerFetch = parseInt(key);
      if (blocksPerFetch <= 0) return false;
      return keyListeners[blocksPerFetch] > 0;
    }).reduce(function (previousMin, current) {
      return Math.min(previousMin, parseInt(current));
    }, Infinity);
    return memo;
  }, {});
}
/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param latestBlockNumber the latest block number
 */

function outdatedListeningKeys(callResults, listeningKeys, chainId, latestBlockNumber) {
  if (!chainId || !latestBlockNumber) return [];
  var results = callResults[chainId]; // no results at all, load everything

  if (!results) return Object.keys(listeningKeys);
  return Object.keys(listeningKeys).filter(function (callKey) {
    var blocksPerFetch = listeningKeys[callKey];
    var data = callResults[chainId][callKey]; // no data, must fetch

    if (!data) return true;
    var minDataBlockNumber = latestBlockNumber - (blocksPerFetch - 1); // already fetching it for a recent enough block, don't refetch it

    if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber) return false; // if data is older than minDataBlockNumber, fetch it

    return !data.blockNumber || data.blockNumber < minDataBlockNumber;
  });
}

function onFetchChunkSuccess(context, chunk, result) {
  var actions = context.actions,
      dispatch = context.dispatch,
      chainId = context.chainId,
      latestBlockNumber = context.latestBlockNumber,
      isDebug = context.isDebug; // split the returned slice into errors and results

  var _chunk$reduce = chunk.reduce(function (memo, call, i) {
    if (result[i].success) {
      var _result$i$returnData;

      memo.results[toCallKey(call)] = (_result$i$returnData = result[i].returnData) != null ? _result$i$returnData : null;
    } else {
      memo.erroredCalls.push(call);
    }

    return memo;
  }, {
    erroredCalls: [],
    results: {}
  }),
      erroredCalls = _chunk$reduce.erroredCalls,
      results = _chunk$reduce.results; // dispatch any new results


  if (Object.keys(results).length > 0) dispatch(actions.updateMulticallResults({
    chainId: chainId,
    results: results,
    blockNumber: latestBlockNumber
  })); // dispatch any errored calls

  if (erroredCalls.length > 0) {
    if (isDebug) {
      result.forEach(function (returnData, ix) {
        if (!returnData.success) {
          console.debug('Call failed', chunk[ix], returnData);
        }
      });
    } else {
      console.debug('Calls errored in fetch', erroredCalls);
    }

    dispatch(actions.errorFetchingMulticallResults({
      calls: erroredCalls,
      chainId: chainId,
      fetchingBlockNumber: latestBlockNumber
    }));
  }
}

function onFetchChunkFailure(context, chunk, error) {
  var actions = context.actions,
      dispatch = context.dispatch,
      chainId = context.chainId,
      latestBlockNumber = context.latestBlockNumber;

  if (error.isCancelledError) {
    console.debug('Cancelled fetch for blockNumber', latestBlockNumber, chunk, chainId);
    return;
  }

  console.error('Failed to fetch multicall chunk', chunk, chainId, error);
  dispatch(actions.errorFetchingMulticallResults({
    calls: chunk,
    chainId: chainId,
    fetchingBlockNumber: latestBlockNumber
  }));
}

function Updater(props) {
  var context = props.context,
      chainId = props.chainId,
      latestBlockNumber = props.latestBlockNumber,
      contract = props.contract,
      isDebug = props.isDebug;
  var actions = context.actions,
      reducerPath = context.reducerPath;
  var dispatch = reactRedux.useDispatch();
  var state = reactRedux.useSelector(function (state) {
    return state[reducerPath];
  }); // wait for listeners to settle before triggering updates

  var debouncedListeners = useDebounce(state.callListeners, 100);
  var cancellations = React.useRef();
  var listeningKeys = React.useMemo(function () {
    return activeListeningKeys(debouncedListeners, chainId);
  }, [debouncedListeners, chainId]);
  var serializedOutdatedCallKeys = React.useMemo(function () {
    var outdatedCallKeys = outdatedListeningKeys(state.callResults, listeningKeys, chainId, latestBlockNumber);
    return JSON.stringify(outdatedCallKeys.sort());
  }, [chainId, state.callResults, listeningKeys, latestBlockNumber]);
  React.useEffect(function () {
    if (!latestBlockNumber || !chainId || !contract) return;
    var outdatedCallKeys = JSON.parse(serializedOutdatedCallKeys);
    if (outdatedCallKeys.length === 0) return;
    var calls = outdatedCallKeys.map(function (key) {
      return parseCallKey(key);
    });
    var chunkedCalls = chunkCalls(calls, CHUNK_GAS_LIMIT);

    if (cancellations.current && cancellations.current.blockNumber !== latestBlockNumber) {
      cancellations.current.cancellations.forEach(function (c) {
        return c();
      });
    }

    dispatch(actions.fetchingMulticallResults({
      calls: calls,
      chainId: chainId,
      fetchingBlockNumber: latestBlockNumber
    }));
    var fetchChunkContext = {
      actions: actions,
      dispatch: dispatch,
      chainId: chainId,
      latestBlockNumber: latestBlockNumber,
      isDebug: isDebug
    }; // Execute fetches and gather cancellation callbacks

    var newCancellations = chunkedCalls.map(function (chunk) {
      var _retry = retry(function () {
        return fetchChunk(contract, chunk, latestBlockNumber, isDebug);
      }, FETCH_RETRY_CONFIG),
          cancel = _retry.cancel,
          promise = _retry.promise;

      promise.then(function (result) {
        return onFetchChunkSuccess(fetchChunkContext, chunk, result);
      })["catch"](function (error) {
        return onFetchChunkFailure(fetchChunkContext, chunk, error);
      });
      return cancel;
    });
    cancellations.current = {
      blockNumber: latestBlockNumber,
      cancellations: newCancellations
    };
  }, [actions, chainId, contract, dispatch, serializedOutdatedCallKeys, latestBlockNumber, isDebug]);
  return null;
}

function createUpdater(context) {
  var UpdaterContextBound = function UpdaterContextBound(props) {
    return React__default.createElement(Updater, Object.assign({
      context: context
    }, props));
  };

  return UpdaterContextBound;
}

function createMulticall(options) {
  var _options$reducerPath;

  var reducerPath = (_options$reducerPath = options == null ? void 0 : options.reducerPath) != null ? _options$reducerPath : 'multicall';
  var slice = createMulticallSlice(reducerPath);
  var actions = slice.actions,
      reducer = slice.reducer;
  var context = {
    reducerPath: reducerPath,
    actions: actions
  };

  var useMultipleContractSingleData$1 = function useMultipleContractSingleData$1() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return useMultipleContractSingleData.apply(void 0, [context].concat(args));
  };

  var useSingleContractMultipleData$1 = function useSingleContractMultipleData$1() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return useSingleContractMultipleData.apply(void 0, [context].concat(args));
  };

  var useSingleContractWithCallData$1 = function useSingleContractWithCallData$1() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return useSingleContractWithCallData.apply(void 0, [context].concat(args));
  };

  var useSingleCallResult$1 = function useSingleCallResult$1() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return useSingleCallResult.apply(void 0, [context].concat(args));
  };

  var useMultiChainMultiContractSingleData$1 = function useMultiChainMultiContractSingleData$1() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return useMultiChainMultiContractSingleData.apply(void 0, [context].concat(args));
  };

  var useMultiChainSingleContractSingleData$1 = function useMultiChainSingleContractSingleData$1() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return useMultiChainSingleContractSingleData.apply(void 0, [context].concat(args));
  };

  var hooks = {
    useMultipleContractSingleData: useMultipleContractSingleData$1,
    useSingleContractMultipleData: useSingleContractMultipleData$1,
    useSingleContractWithCallData: useSingleContractWithCallData$1,
    useSingleCallResult: useSingleCallResult$1,
    useMultiChainMultiContractSingleData: useMultiChainMultiContractSingleData$1,
    useMultiChainSingleContractSingleData: useMultiChainSingleContractSingleData$1
  };
  var Updater = createUpdater(context);
  return {
    reducerPath: reducerPath,
    reducer: reducer,
    actions: actions,
    hooks: hooks,
    Updater: Updater
  };
}

exports.CHUNK_GAS_LIMIT = CHUNK_GAS_LIMIT;
exports.CONSERVATIVE_BLOCK_GAS_LIMIT = CONSERVATIVE_BLOCK_GAS_LIMIT;
exports.DEFAULT_CALL_GAS_REQUIRED = DEFAULT_CALL_GAS_REQUIRED;
exports.DEFAULT_CHUNK_GAS_REQUIRED = DEFAULT_CHUNK_GAS_REQUIRED;
exports.INVALID_CALL_STATE = INVALID_CALL_STATE;
exports.INVALID_RESULT = INVALID_RESULT;
exports.LOADING_CALL_STATE = LOADING_CALL_STATE;
exports.NEVER_RELOAD = NEVER_RELOAD;
exports.createMulticall = createMulticall;
//# sourceMappingURL=redux-multicall.cjs.development.js.map
