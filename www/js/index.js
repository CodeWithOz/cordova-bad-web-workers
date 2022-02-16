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
        console.log('[app] deviceready fired');
        document.querySelector('.toggle').addEventListener('click', e => {
            app.performWindowFunction();
        });
        app.getDB('repro.db', db => {
            // operations are reproduced and working at https://dbfiddle.uk/?rdbms=sqlite_3.27&fiddle=da10568e4e8ad57699fa89617b2dcfee
            const operations = [
                'CREATE TABLE chatMessages (`id` TEXT, `chatID` TEXT, `date` TEXT, `message` TEXT, `senderID` TEXT, `type` TEXT);',
                `INSERT INTO chatMessages ('chatID', 'date', 'id', 'message', 'senderID', 'type') VALUES
                    ('initialChat', '0001-01-01T01:01:11.001Z', '18c9bb49-09f4-4dc4-b0ba-a3c45c324347', 'first message', 'first_sender_id', 'txt'),
                    ('alternateChat', '0001-02-01T01:01:11.001Z', '18c9bb49-09f4-4dc4-b0ba-a3c45c324348', 'second message', 'first_sender_id', 'groupedMsgs'),
                    ('alternateChat', '0001-03-01T01:01:11.001Z', '28c9bb49-09f4-4dc4-b0ba-a3c45c324348', 'third message', 'first_sender_id', 'groupedMsgs'),
                    ('alternateChat', '0001-04-01T01:01:11.001Z', '18c9bb49-09f5-4dc4-b0ba-a3c45c324348', 'fourth message', 'first_sender_id', 'txt'),
                    ('alternateChat', '0001-05-01T01:01:11.001Z', '18c9bb49-19f4-4dc4-b0ba-a3c45c324348', 'fifth message', 'first_sender_id', 'groupedMsgs');`,
            ];
            db.sqlBatch(
                operations,
                res => {
                    console.log('operations outcome:', res);
                    app.performWindowFunction();
                },
                err => {
                    alert(`failed to complete operations, err: ${err.message}`);
                    console.error(err);
                }
            );
        }, err => {
            alert(`failed to get database, err: ${err.message}`);
            console.error(err);
        });
    },
    performWindowFunction: () => {
        app.getDB('repro.db', db => {
            // operations are reproduced and working at https://dbfiddle.uk/?rdbms=sqlite_3.27&fiddle=da10568e4e8ad57699fa89617b2dcfee
            db.executeSql(
                `WITH cte AS (
            SELECT *,
                COUNT(*) OVER (PARTITION BY grp) count,
                ROW_NUMBER() OVER (PARTITION BY grp ORDER BY date) rn
            FROM (
                SELECT *, SUM(flag) OVER (ORDER BY date) grp
                FROM (
                    SELECT *, (type <> LAG(type, 1, '') OVER (ORDER BY date)) flag
                    FROM chatMessages WHERE chatID = 'alternateChat'
                )
            )
        )
        SELECT id, type, date, message,
            CASE WHEN type = 'groupedMsgs' THEN count END numConsecutiveItems
        FROM cte
        WHERE numConsecutiveItems IS NULL OR rn = 1;`,
                [],
                res => {
                    console.log('num results:', res.rows.length);
                    alert(
                        `operations outcome, num rows: ${res.rows.length}`
                    );
                },
                err => {
                    alert(
                        `failed to perform window function, err: ${err.message}`
                    );
                    console.error(err);
                }
            );
        }, err => {
            alert(`failed to get database, err: ${err.message}`);
            console.error(err);
        });
    },
    getDB : function getDb(name,successCB,errorCB) {
        window.sqlitePlugin.openDatabase(
            {
                name: name,
                iosDatabaseLocation: 'default',
                androidDatabaseProvider: 'system',
                androidLockWorkaround: 1,
            },
            successCB,
            errorCB
        );
    }
};

app.initialize();
