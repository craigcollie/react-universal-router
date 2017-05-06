'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


function historyPlugin(location, route, isHistoryEvent) {
  if (!isHistoryEvent) {
    var locationObject = { page: location };

    if (typeof window !== 'undefined') {
      window.history.pushState(locationObject, location, location);
    }
  }
}
exports.default = historyPlugin;