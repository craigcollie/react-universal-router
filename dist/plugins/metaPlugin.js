'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


function metaPlugin(location, route, isHistoryEvent) {
  var meta = route.meta;


  if (!meta) return null;

  var title = meta.title,
      description = meta.description;


  var metaDescription = document.querySelector('meta[name="description"]') || null;

  if (document.title) {
    document.title = title;
  }

  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }
}
exports.default = metaPlugin;