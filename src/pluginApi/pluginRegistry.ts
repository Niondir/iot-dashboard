/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {DashboardStore} from "../store";
import {ITypeInfo} from "../appState";
import * as _ from "lodash";

/**
 * The plugin that is registered to the Dashboard
 */
export interface IPluginModule {
    TYPE_INFO: ITypeInfo
}

/**
 * After a plugin was registered, we create a PluginFactory to store and create instances of the loaded Plugin
 */
export interface IPluginFactory<TPlugin extends IPlugin> {
    getInstance(id: string): TPlugin
    dispose(): void
}

/**
 * Describes an actual instance of a Plugin
 */
export interface IPlugin {
}

export type IdValueMap<T> = {[id: string]: T}

export default class PluginRegistry<TPluginModule extends IPluginModule, TPluginFactory extends IPluginFactory<any>> {

    private _plugins: IdValueMap<TPluginFactory> = {};

    constructor(private _store: DashboardStore) {
        if (!_store) {
            throw new Error("PluginRegistry must be initialized with a Store");
        }
    }

    get store(): DashboardStore {
        return this._store;
    }

    register(module: TPluginModule) {
        if (!this._store === undefined) {
            throw new Error("PluginRegistry has no store. Set the store property before registering modules!");
        }

        console.assert(module.TYPE_INFO !== undefined, "Missing TYPE_INFO on plugin module. Every module must export TYPE_INFO");
        console.assert(module.TYPE_INFO.type !== undefined, "Missing TYPE_INFO.type on plugin TYPE_INFO.");

        this._plugins[module.TYPE_INFO.type] = this.createPluginFromModule(module);
    }

    createPluginFromModule(module: TPluginModule): TPluginFactory {
        throw new Error("PluginRegistry must implement createPluginFromModule");
    }

    hasPlugin(type: string): boolean {
        return this._plugins[type] !== undefined;
    }

    // TODO: rename to getPluginFactory() when also widgets are in TypeScript?
    getPlugin(type: string): TPluginFactory {
        const plugin = this._plugins[type];
        if (!plugin) {
            throw new Error("Can not find plugin with type '" + type + "' in plugin registry.");
        }
        return plugin;
    }


    getPlugins() {
        return _.assign<any, IdValueMap<TPluginFactory>>({}, this._plugins);
    }
}