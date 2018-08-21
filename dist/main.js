/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "32e00925908c7118054e";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.ts")(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Map_1 = __webpack_require__(/*! src/Map */ "./src/Map.ts");
var RectCoordinate_1 = __webpack_require__(/*! models/RectCoordinate */ "./src/models/RectCoordinate.ts");
var G_1 = __webpack_require__(/*! models/G */ "./src/models/G.ts");
var temp_1 = __webpack_require__(/*! models/temp */ "./src/models/temp.ts");
/* 测试 */
var m = new Map_1.default('app', 2);
var g = new G_1.default();
var rc_1 = new RectCoordinate_1.default({
    left: 100,
    top: 100,
    w: m.w - 150,
    h: 400,
    data: []
});
var _data = Array.apply(null, { length: 241 }).map(function (item) {
    return Math.random() * 500 + 500;
});
rc_1.update(_data);
var t_1 = new temp_1.default({
    left: 100,
    top: 500,
    w: m.w - 150,
    h: 200,
    data: _data
});
g.add(rc_1);
g.add(t_1);
m.add(g);
m.render();


/***/ }),

/***/ "./src/Map.ts":
/*!********************!*\
  !*** ./src/Map.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Painter_1 = __webpack_require__(/*! src/Painter */ "./src/Painter.ts");
var Map = /** @class */ (function () {
    function Map(id, dpr) {
        if (dpr === void 0) { dpr = 1; }
        var _this = this;
        this.fr = document.getElementById(id);
        this.el = document.createElement('canvas');
        this.view = {
            x: 0,
            y: 0,
            w: this.fr.offsetWidth,
            h: this.fr.offsetHeight
        };
        this.el.width = this.fr.offsetWidth * dpr;
        this.w = this.fr.offsetWidth;
        this.el.height = this.fr.offsetHeight * dpr;
        this.h = this.fr.offsetHeight;
        this.dpr = dpr;
        this.el.style.width = '100%'; // this.fr.offsetWidth + 'px'
        this.el.style.height = '100%'; // this.fr.offsetHeight + 'px'
        this.fr.appendChild(this.el);
        this.C = this.el.getContext('2d');
        this.C.translate(.5, .5);
        this.C.imageSmoothingEnabled = true;
        this.C.scale(dpr, dpr);
        this.nodes = [];
        this.observerList = [];
        this.mouse = {};
        this.el.addEventListener('mousemove', function () { _this.handleMousemove(event); });
    }
    Map.prototype.render = function (clear) {
        if (clear === void 0) { clear = true; }
        var _a = this, nodes = _a.nodes, C = _a.C, w = _a.w, h = _a.h, view = _a.view;
        clear && C.clearRect(view.x, view.y, w, h);
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            Painter_1.default.draw(C, node.tag, node);
        }
    };
    Map.prototype.viewMove = function (x, y) {
        this.view.x += x;
        this.view.y += y;
        this.C.translate(-x, -y);
    };
    Map.prototype.add = function (obj) {
        this.nodes.push(obj);
        obj.parent = this;
    };
    Map.prototype.remove = function (obj) {
        var i = this.nodes.indexOf(obj);
        this.nodes.splice(i, 1);
    };
    Map.prototype.clear = function () {
        var _a = this, C = _a.C, w = _a.w, h = _a.h, view = _a.view;
        C.clearRect(view.x, view.y, w, h);
        this.C.translate(view.x, view.y);
        this.nodes = [];
        this.view.x = 0;
        this.view.y = 0;
    };
    Map.getFocusNode = function (mouse, observerList) {
        var temp;
        var x = mouse.x, y = mouse.y;
        for (var i = 0; i < observerList.length; i++) {
            var _o = observerList[i];
            if (_o.left > x)
                continue;
            if (_o.left + _o.w < x)
                continue;
            if (_o.top > y)
                continue;
            if (_o.top + _o.h < y)
                continue;
            temp = _o;
            break;
        }
        return temp;
    };
    Map.prototype.handleMousemove = function (e) {
        if (!e)
            return;
        var observerList = this.observerList;
        this.mouse.x = e.layerX;
        this.mouse.y = e.layerY;
        var focus = Map.getFocusNode(this.mouse, observerList);
        if (this.focus && focus !== this.focus)
            this.focus.onBlur();
        if (focus) {
            this.focus = focus;
            focus.onFocus();
        }
        else {
            this.focus = null;
        }
        this.render();
    };
    return Map;
}());
exports.default = Map;


/***/ }),

/***/ "./src/Painter.ts":
/*!************************!*\
  !*** ./src/Painter.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Painter = {
    c: CanvasRenderingContext2D,
    draw: function (c, type, obj) {
        var _this = this;
        this.c = c;
        return (function () {
            c.save();
            c.beginPath();
            _this[type].call(c, obj);
            c.restore();
        })();
    },
    reg: function (method, fn) {
        this[method] = fn;
    }
};
exports.default = Painter;


/***/ }),

/***/ "./src/VNode.ts":
/*!**********************!*\
  !*** ./src/VNode.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vNode = /** @class */ (function () {
    function vNode(tag) {
        this.tag = tag;
    }
    return vNode;
}());
exports.default = vNode;


/***/ }),

/***/ "./src/models/G.ts":
/*!*************************!*\
  !*** ./src/models/G.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var VNode_1 = __webpack_require__(/*! src/VNode */ "./src/VNode.ts");
var Painter_1 = __webpack_require__(/*! src/Painter */ "./src/Painter.ts");
/**
 * 容器
 * @constructor
 */
var G = /** @class */ (function (_super) {
    __extends(G, _super);
    function G(obj) {
        if (obj === void 0) { obj = {}; }
        var _this = _super.call(this, 'G') || this;
        _this.left = 0;
        _this.top = 0;
        _this.w = 0;
        _this.h = 0;
        _this.deg = 0;
        _this.center = [0, 0];
        _this.clip = false;
        for (var x in obj) {
            _this[x] = obj[x];
        }
        _this._c = obj.c || 'rgba(0, 0, 0, .1)';
        _this.children = [];
        return _this;
    }
    G.prototype.add = function (vNode) {
        this.children.push(vNode);
    };
    G.prototype.remove = function (obj) {
        var i = this.children.indexOf(obj);
        this.children.splice(i, 1);
    };
    G.prototype.onFocus = function () {
        this.c = '#ff0';
    };
    G.prototype.onBlur = function () {
        this.c = this._c;
    };
    return G;
}(VNode_1.default));
exports.default = G;
Painter_1.default.reg('G', function (node) {
    var children = node.children, center = node.center, deg = node.deg, w = node.w, h = node.h, left = node.left, top = node.top, _a = node.c, c = _a === void 0 ? 'rgba(0, 0, 0, .1)' : _a, clip = node.clip;
    if (clip && w && h) {
        this.beginPath();
        this.rect(left, top, w, h);
        this.clip();
    }
    this.beginPath();
    this.translate.apply(this, center);
    this.rotate(deg * Math.PI / 180);
    this.translate(-center[0] + left, -center[1] + top);
    this.rect(0, 0, w, h);
    // this.fillStyle = c
    // this.fill()
    var self = this;
    for (var x in children) {
        Painter_1.default.draw(self, children[x].tag, children[x]);
    }
    this.translate(-left, -top);
    this.rotate(-deg * Math.PI / 180);
});


/***/ }),

/***/ "./src/models/Line.ts":
/*!****************************!*\
  !*** ./src/models/Line.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var VNode_1 = __webpack_require__(/*! src/VNode */ "./src/VNode.ts");
var Painter_1 = __webpack_require__(/*! src/Painter */ "./src/Painter.ts");
/* main */
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(obj) {
        var _this = _super.call(this, 'LINE') || this;
        _this.w = 1;
        _this.deg = 0;
        if (!obj.c)
            obj.c = '#ff0';
        if (!obj.w)
            obj.w = 1;
        for (var x in obj) {
            _this[x] = obj[x];
        }
        _this._p1 = _this.p1;
        _this._p2 = _this.p2;
        _this.pm = [(_this.p1[0] + _this.p2[0]) / 2, (_this.p1[1] + _this.p2[1]) / 2];
        return _this;
    }
    Line.prototype.matrix = function (a, b, c, d, e, f) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 1; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 0; }
        if (e === void 0) { e = 0; }
        if (f === void 0) { f = 0; }
        var _a = this, _p1 = _a._p1, _p2 = _a._p2, pm = _a.pm;
        function calc(pointer) {
            var _p = [pointer[0] - pm[0], pointer[1] - pm[1]];
            return [a * _p[0] + c * _p[1] + e + pm[0], b * _p[0] + d * _p[1] + f + pm[1]];
        }
        this.p1 = calc(_p1);
        this.p2 = calc(_p2);
    };
    /**
     * 旋转
     * @param deg 角度
     */
    Line.prototype.rotate = function (deg) {
        this.matrix(Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180), -Math.sin(deg * Math.PI / 180), Math.cos(deg * Math.PI / 180), 0, 0);
    };
    /**
     * 平移
     * @param x x { number }
     * @param y y { number }
      */
    Line.prototype.translate = function (x, y) {
        this.matrix(1, 0, 0, 1, x, y);
    };
    return Line;
}(VNode_1.default));
exports.default = Line;
/* 注册绘制方法 */
Painter_1.default.reg('LINE', function (node) {
    var p1 = node.p1, p2 = node.p2, pm = node.pm, c = node.c, w = node.w;
    this.lineWidth = w;
    this.moveTo.apply(this, p1);
    this.lineTo.apply(this, p2);
    this.strokeStyle = c;
    this.stroke();
});


/***/ }),

/***/ "./src/models/Lines.ts":
/*!*****************************!*\
  !*** ./src/models/Lines.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var VNode_1 = __webpack_require__(/*! src/VNode */ "./src/VNode.ts");
var Painter_1 = __webpack_require__(/*! src/Painter */ "./src/Painter.ts");
/* 线段集合 */
var Lines = /** @class */ (function (_super) {
    __extends(Lines, _super);
    function Lines(obj) {
        var _this = _super.call(this, 'LINES') || this;
        _this.w = 1;
        _this.bezier = false;
        _this.fill = false;
        _this.fillStyle = '#ccc';
        for (var x in obj) {
            _this[x] = obj[x];
        }
        return _this;
    }
    return Lines;
}(VNode_1.default));
exports.default = Lines;
Painter_1.default.reg('LINES', function (Lines) {
    var pointers = Lines.pointers, _a = Lines.c, c = _a === void 0 ? '#ff0' : _a, _b = Lines.w, w = _b === void 0 ? 1 : _b, bezier = Lines.bezier, _c = Lines.fill, fill = _c === void 0 ? false : _c, fillStyle = Lines.fillStyle;
    if (bezier) {
        this.moveTo.apply(this, pointers[0]);
        for (var x = 1; x < pointers.length; x++) {
            var dX = (pointers[x][0] - pointers[x - 1][0]) * .75;
            this.bezierCurveTo.apply(this, [pointers[x - 1][0] + dX, pointers[x - 1][1], pointers[x][0] - dX, pointers[x][1]].concat(pointers[x]));
        }
    }
    else {
        for (var x in pointers) {
            this.lineTo.apply(this, pointers[x]);
        }
    }
    if (fill) {
        this.fillStyle = fillStyle;
        this.fill();
    }
    this.lineWidth = w;
    this.strokeStyle = c;
    this.stroke();
});


/***/ }),

/***/ "./src/models/RectCoordinate.ts":
/*!**************************************!*\
  !*** ./src/models/RectCoordinate.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var VNode_1 = __webpack_require__(/*! src/VNode */ "./src/VNode.ts");
var Painter_1 = __webpack_require__(/*! src/Painter */ "./src/Painter.ts");
var Line_1 = __webpack_require__(/*! models/Line */ "./src/models/Line.ts");
var Lines_1 = __webpack_require__(/*! models/Lines */ "./src/models/Lines.ts");
var G_1 = __webpack_require__(/*! models/G */ "./src/models/G.ts");
var Text_1 = __webpack_require__(/*! models/Text */ "./src/models/Text.ts");
var tag = 'RECT_COORDINATE';
var RectCoordinate = /** @class */ (function (_super) {
    __extends(RectCoordinate, _super);
    function RectCoordinate(obj) {
        var _this = _super.call(this, tag) || this;
        _this.w = 100;
        _this.h = 100;
        _this.left = 0;
        _this.top = 0;
        _this.minX = 0;
        _this.maxX = 241;
        _this.minY = 0;
        _this.maxY = 100;
        _this.length = 241;
        for (var x in obj) {
            _this[x] = obj[x];
        }
        _this.c = "rgba(" + Math.round(Math.random() * 0xff) + ", " + Math.round(Math.random() * 0xff) + ", " + Math.round(Math.random() * 0xff) + ", .3)";
        _this.update(_this.data);
        return _this;
    }
    // 数据更新
    RectCoordinate.prototype.update = function (data) {
        this.data = data;
        if (!data || data.length <= 1)
            return;
        var _maxY = Math.max.apply(Math, this.data);
        var _minY = Math.min.apply(Math, this.data);
        this.maxY = _maxY + (_maxY - _minY) * .3;
        this.minY = _minY - (_maxY - _minY) * .3;
    };
    // 坐标映射
    RectCoordinate.prototype.coord = function (pointer) {
        var _a = this, maxX = _a.maxX, maxY = _a.maxY, minX = _a.minX, minY = _a.minY, w = _a.w, h = _a.h, top = _a.top, perW = _a.perW;
        var perX = w / (maxX - minX);
        var perY = h / (maxY - minY);
        var _x = perW * pointer[0];
        var _y = h - (pointer[1] - minY) * perY;
        return [_x, _y];
    };
    Object.defineProperty(RectCoordinate.prototype, "perW", {
        // 单位宽度
        get: function () {
            return this.w / this.length;
        },
        enumerable: true,
        configurable: true
    });
    return RectCoordinate;
}(VNode_1.default));
exports.default = RectCoordinate;
Painter_1.default.reg(tag, function (node) {
    var w = node.w, h = node.h, left = node.left, top = node.top, minX = node.minX, minY = node.minY, maxX = node.maxX, maxY = node.maxY, data = node.data, c = node.c;
    var _self = this;
    var g = new G_1.default({
        left: left,
        top: top,
        w: w,
        h: h,
        c: c
    });
    // 创建坐标
    var rc = new Lines_1.default({
        pointers: [
            [0, 0],
            [0, h],
            [0 + w, h],
            [0 + w, 0]
        ],
        c: '#ddd',
        w: .3
    });
    // 纵坐标刻度
    var g_v = new G_1.default();
    var g_0 = new G_1.default();
    for (var x = 0; x <= 11; x++) {
        var _x = -10;
        var _y = h - x * (h / 11);
        g_v.add(new Line_1.default({
            p1: node.coord([0, (maxY - minY) / 11 * x + minY]),
            p2: node.coord([241, (maxY - minY) / 11 * x + minY]),
            c: 'rgba(233, 233, 233, .3)',
            w: .3
        }));
        g_v.add(new Text_1.default({
            text: ((maxY - minY) / 11 * x + minY).toFixed(2),
            left: _x,
            top: _y,
            textAlign: 'right',
            c: '#ccc'
        }));
    }
    // 横坐标刻度
    var g_h = new G_1.default();
    var strs = ['9:30', '10:00', '10:30', '11:00', '11:30/13:00', '13:30', '14:00', "14:30", "15:00"];
    for (var i = 0; i < strs.length; i++) {
        var _x = w / (strs.length - 1) * i;
        var _y = h + 12;
        g_h.add(new Text_1.default({
            text: strs[i],
            left: _x,
            top: _y,
            textAlign: 'center',
            c: '#ccc'
        }));
    }
    g.add(g_v);
    g.add(g_h);
    g.add(rc);
    // 绘制折线
    var perW = node.perW;
    var _data = data.map(function (item, index) { return node.coord([index, item]); });
    var l_0 = new Lines_1.default({
        pointers: _data,
        c: 'rgb(91, 161, 236)',
        bezier: true,
        w: .5
    });
    l_0.bezier = !l_0.bezier;
    g.add(l_0);
    console.log(g);
    Painter_1.default.draw(_self, 'G', g);
});


/***/ }),

/***/ "./src/models/Text.ts":
/*!****************************!*\
  !*** ./src/models/Text.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var VNode_1 = __webpack_require__(/*! src/VNode */ "./src/VNode.ts");
var Painter_1 = __webpack_require__(/*! src/Painter */ "./src/Painter.ts");
var tag = 'TEXT';
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(obj) {
        if (obj === void 0) { obj = { text: '' }; }
        var _this = _super.call(this, tag) || this;
        _this.left = 10;
        _this.top = 10;
        _this.textAlign = 'center';
        _this.c = '#fff';
        _this.font = '12px "宋体"';
        _this.baseLine = 'middle';
        for (var x in obj) {
            _this[x] = obj[x];
        }
        return _this;
    }
    return Text;
}(VNode_1.default));
exports.default = Text;
Painter_1.default.reg(tag, function (node) {
    var left = node.left, top = node.top, textAlign = node.textAlign, c = node.c, font = node.font;
    this.textAlign = textAlign;
    this.fillStyle = c;
    this.font = font;
    this.fillText(node.text, left, top);
});


/***/ }),

/***/ "./src/models/temp.ts":
/*!****************************!*\
  !*** ./src/models/temp.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var VNode_1 = __webpack_require__(/*! src/VNode */ "./src/VNode.ts");
var Painter_1 = __webpack_require__(/*! src/Painter */ "./src/Painter.ts");
var Line_1 = __webpack_require__(/*! models/Line */ "./src/models/Line.ts");
var Lines_1 = __webpack_require__(/*! models/Lines */ "./src/models/Lines.ts");
var G_1 = __webpack_require__(/*! models/G */ "./src/models/G.ts");
var Text_1 = __webpack_require__(/*! models/Text */ "./src/models/Text.ts");
var tag = 'RECT_TEMP';
var RectCoordinate = /** @class */ (function (_super) {
    __extends(RectCoordinate, _super);
    function RectCoordinate(obj) {
        var _this = _super.call(this, tag) || this;
        _this.w = 100;
        _this.h = 100;
        _this.left = 0;
        _this.top = 0;
        _this.minX = 0;
        _this.maxX = 241;
        _this.minY = 0;
        _this.maxY = 100;
        _this.length = 241;
        for (var x in obj) {
            _this[x] = obj[x];
        }
        _this.c = "rgba(" + Math.round(Math.random() * 0xff) + ", " + Math.round(Math.random() * 0xff) + ", " + Math.round(Math.random() * 0xff) + ", .3)";
        _this.update(_this.data);
        return _this;
    }
    // 数据更新
    RectCoordinate.prototype.update = function (data) {
        this.data = data;
        if (!data || data.length <= 1)
            return;
        var _maxY = Math.max.apply(Math, this.data);
        var _minY = 0; // Math.min.apply(Math, this.data)
        this.maxY = _maxY + (_maxY - _minY) * .3;
        this.minY = 0; // _minY - (_maxY - _minY) * .3
    };
    // 坐标映射
    RectCoordinate.prototype.coord = function (pointer) {
        var _a = this, maxX = _a.maxX, maxY = _a.maxY, minX = _a.minX, minY = _a.minY, w = _a.w, h = _a.h, top = _a.top, perW = _a.perW;
        var perX = w / (maxX - minX);
        var perY = h / (maxY - minY);
        var _x = perW * pointer[0];
        var _y = h - (pointer[1] - minY) * perY;
        return [_x, _y];
    };
    Object.defineProperty(RectCoordinate.prototype, "perW", {
        // 单位宽度
        get: function () {
            return this.w / this.length;
        },
        enumerable: true,
        configurable: true
    });
    return RectCoordinate;
}(VNode_1.default));
exports.default = RectCoordinate;
Painter_1.default.reg(tag, function (node) {
    var w = node.w, h = node.h, left = node.left, top = node.top, minX = node.minX, minY = node.minY, maxX = node.maxX, maxY = node.maxY, data = node.data, c = node.c;
    var _self = this;
    var g = new G_1.default({
        left: left,
        top: top,
        w: w,
        h: h,
        c: c
    });
    // 创建坐标
    var rc = new Lines_1.default({
        pointers: [
            [0, 0],
            [0, h],
            [0 + w, h],
            [0 + w, 0]
        ],
        c: '#ddd',
        w: .3
    });
    // 纵坐标刻度
    var g_v = new G_1.default();
    var g_0 = new G_1.default();
    for (var x = 0; x <= 11; x++) {
        var _x = -10;
        var _y = h - x * (h / 11);
        g_v.add(new Line_1.default({
            p1: node.coord([0, (maxY - minY) / 11 * x + minY]),
            p2: node.coord([241, (maxY - minY) / 11 * x + minY]),
            c: 'rgba(233, 233, 233, .3)',
            w: .3
        }));
        g_v.add(new Text_1.default({
            text: ((maxY - minY) / 11 * x + minY).toFixed(2),
            left: _x,
            top: _y,
            textAlign: 'right',
            c: '#ccc'
        }));
    }
    // 横坐标刻度
    var g_h = new G_1.default();
    var strs = ['9:30', '10:00', '10:30', '11:00', '11:30/13:00', '13:30', '14:00', "14:30", "15:00"];
    for (var i = 0; i < strs.length; i++) {
        var _x = w / (strs.length - 1) * i;
        var _y = h + 12;
        g_h.add(new Text_1.default({
            text: strs[i],
            left: _x,
            top: _y,
            textAlign: 'center',
            c: '#ccc'
        }));
    }
    g.add(g_v);
    g.add(g_h);
    g.add(rc);
    // 绘制线段组
    var perW = node.perW;
    var _data = data.map(function (item, index) { return node.coord([index, item]); });
    for (var i = 0; i < _data.length; i++) {
        var _l = new Line_1.default({
            p1: [_data[i][0], h],
            p2: _data[i]
        });
        g.add(_l);
    }
    Painter_1.default.draw(_self, 'G', g);
});


/***/ })

/******/ });
//# sourceMappingURL=main.js.map