/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* inject:tests */
import './datasource/datasource.test.ts'
import './datasource/datasourcePluginFactory.test.ts'
import './datasource/datasourcePluginRegistry.test.ts'
import './datasource/datasourcePlugins.test.ts'
import './pluginApi/plugins.test.ts'
import './pluginApi/uri.test.js'
import './serverRenderer.test.ts'
import './util/collection.test.js'
import './widgets/widgetPlugins.test.ts'
import './widgets/widgets.test.ts'
/* endinject */

// TODO: instead of inject we could use require.context
// const testsContext = require.context(".", true, /_test$/);
// testsContext.keys().forEach(testsContext);
