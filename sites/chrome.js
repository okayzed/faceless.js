
_.each(window.faceless_sites, function(data, key) {
  var reg = new RegExp(key);
  if (window.location.hostname.match(reg)) {
    // check if we are going to actually change this page by asking our parent script...]
    chrome.runtime.sendMessage({deface: key}, function(response) {
      if (response.deface) {
        if (_.isObject(data)) {
          window.faceless.set_selector(data.selector, data.cb);
        } else {
          window.faceless.set_selector(data);
        }
      }
    });
    
  }
});

