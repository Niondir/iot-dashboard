/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {ITypeInfo} from "../appState";
import {IDatasourcePlugin} from "../datasource/datasourcePluginFactory";
/**
 * When a Plugin is loaded via the UI, an action is called to do so.
 * The action will load an external script, containing the plugin code, which calls one of the API methods here.
 * By calling the API method the plugin is put to the pluginCache where it can be fetched by the application to initialize it
 *
 * The application can not call the Plugin since it could (and should) be wrapped into a module.
 * @type {null}
 */

let pluginCache: any = null;


export function popLoadedPlugin() {
    const plugin = pluginCache;
    pluginCache = null;
    return plugin;
}

export function hasPlugin() {
    return pluginCache !== null;
}

export function registerDatasourcePlugin(typeInfo: ITypeInfo, datasource: IDatasourcePlugin) {
    console.assert(!hasPlugin(), "Plugin must be finished loading before another can be registered", pluginCache);
    pluginCache = ({
        TYPE_INFO: typeInfo,
        Datasource: datasource
    });
}

// TODO: type Widget as soon as it is in typescript
export function registerWidgetPlugin(typeInfo: ITypeInfo, widget: any) {
    console.assert(!hasPlugin(), "Plugin must be finished loading before another can be registered", pluginCache);
    pluginCache = ({
        TYPE_INFO: typeInfo,
        Widget: widget
    });
}