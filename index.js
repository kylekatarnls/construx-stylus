/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2015 eBay Software Foundation                                │
 │                                                                             │
 │hh ,'""`.                                                                    │
 │  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
 │  |(@)(@)|  you may not use this file except in compliance with the License. │
 │  )  __  (  You may obtain a copy of the License at                          │
 │ /,'))((`.\                                                                  │
 │(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
 │ `\ `)(' /'                                                                  │
 │                                                                             │
 │   Unless required by applicable law or agreed to in writing, software       │
 │   distributed under the License is distributed on an "AS IS" BASIS,         │
 │   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │   See the License for the specific language governing permissions and       │
 │   limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/
'use strict';

var lib = require('stylus');

module.exports = function (options) {

    options.ext = options.ext || 'styl';
    var stylusPlugins = [];
    var plugins = options.plugins || [];
    plugins.forEach(function (plugin) {
        var pluginModule = require(plugin);
        stylusPlugins.push(pluginModule());
    });
    return function styl(data, args, callback) {

        var config = {
            filename: args.context.filePath,
            paths: args.paths,
            use: stylusPlugins
        };

        lib.render(data.toString(), config, callback);
    };

};
