/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        document
            .querySelector('button.get-native')
            .addEventListener('click', e => {
                NativeStorage.getItem(
                    'nativeval',
                    val => alert(`value from native storage: ${val}`),
                    e => alert(`error getting value from native storage: ${e}`)
                );
            });
        document
            .querySelector('button.set-native')
            .addEventListener('click', e => {
                const value = Math.random().toFixed(4);
                NativeStorage.setItem(
                    'nativeval',
                    value,
                    val => alert(`value saved in native storage: ${val}`),
                    e => alert(`error saving value in native storage: ${e}`)
                );
            });

        window.sqlitePlugin.openDatabase(
            {
                name: 'native-storage-test.db',
                iosDatabaseLocation: 'default',
                androidDatabaseProvider: 'system',
                androidLockWorkaround: 1,
            },
            db => {
                db.executeSql(
                    'CREATE TABLE IF NOT EXISTS testing (id, value, UNIQUE(id) ON CONFLICT REPLACE)',
                    [],
                    res => {
                        document
                            .querySelector('button.get-sqlite')
                            .addEventListener('click', e => {
                                db.executeSql(
                                    'SELECT value FROM testing WHERE id = ?',
                                    ['test'],
                                    res =>
                                        alert(
                                            `value from sqlite: ${
                                                res.rows.length > 0
                                                    ? res.rows.item(0).value
                                                    : 'no value'
                                            }`
                                        ),
                                    e =>
                                        alert(
                                            `error getting value from sqlite: ${e}`
                                        )
                                );
                            });
                        document
                            .querySelector('button.set-sqlite')
                            .addEventListener('click', e => {
                                const value = Math.random().toFixed(4);
                                db.executeSql(
                                    'INSERT OR REPLACE INTO testing (id, value) VALUES (?,?)',
                                    ['test', value],
                                    res =>
                                        alert(
                                            `value saved in sqlite: ${value}`
                                        ),
                                    e =>
                                        alert(
                                            `error saving value in sqlite: ${e}`
                                        )
                                );
                            });
                    },
                    e => alert(`error initializing table in sqlite db: ${e}`)
                );
            },
            e => alert(`error initializing sqlite db: ${e}`)
        );
    },
};

app.initialize();
