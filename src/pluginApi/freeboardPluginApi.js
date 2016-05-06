import * as FreeboardDatasource from './freeboardDatasource'
import * as Plugins from '../pluginApi/plugins'
import * as PluginApi from './pluginApi'
import store from '../store'

function mapSettings(settings) {
    return settings.map(setting => {
        return {
            id: setting["name"],
            name: setting["display_name"],
            description: setting["description"],
            type: setting["type"],
            defaultValue: setting["default_value"],
            required: setting["required"]
        }
    })
}

const freeboardPluginApi = {

    /**
     * Method to register a DatasourcePlugin as you would with the IoT-Dashboard API
     * But supporting the Freeboard syntax
     * @param plugin A Freeboard Datasource Plugin.
     * See: https://freeboard.github.io/freeboard/docs/plugin_example.html
     */
    loadDatasourcePlugin(plugin) {
        console.log("Loading freeboard Plugin: ", plugin);

        let typeName = plugin["type_name"];
        let displayName = plugin["display_name"];
        let description = plugin["description"];
        let externalScripts = plugin["external_scripts"];
        let settings = plugin["settings"];
        let newInstance = plugin["newInstance"];

        let TYPE_INFO = {
            type: typeName,
            name: displayName,
            description: description,
            dependencies: externalScripts,
            settings: mapSettings(settings)
        };

        let dsPlugin = {
            TYPE_INFO,
            Datasource: FreeboardDatasource.create(newInstance, TYPE_INFO)
        };

        PluginApi.registerDatasourcePlugin(dsPlugin.TYPE_INFO, dsPlugin.Datasource);
    }


};

window.freeboard = freeboardPluginApi;

export default freeboardPluginApi;