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
        let haON = true,
            cvON = true,
            opON = true,
            optmON = false;
        const ul = document.querySelector('.cupertino-pane ul');
        const unoptimizedImgs = [...ul.querySelectorAll('li img')].map(
            ({ src }) => src
        );
        const optimizedImgs = [
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193186/unoptimized-2_dmmr1s.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193191/unoptimized-3_h2xluc.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193196/unoptimized-4_hxt1sl.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193201/unoptimized-5_whamfk.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193383/unoptimized-6_lbeojg.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193388/unoptimized-7_frj1av.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193391/unoptimized-8_lanrys.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193395/unoptimized-9_logbvb.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193517/unoptimized-10_xoz1is.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193520/unoptimized-11_ysyo0w.jpg',
            'https://res.cloudinary.com/ucheozoemena/image/upload/v1630193524/unoptimized-12_oymqwm.jpg',
        ];
        const injectBtn = document.querySelector('.inject');
        injectBtn.addEventListener('click', e => {
            ul.innerHTML += ul.innerHTML;
        });
        const toggleHaBtn = document.querySelector('.toggle-ha');
        toggleHaBtn.addEventListener('click', e => {
            if (haON) {
                ul.classList.remove('ha');
                toggleHaBtn.querySelector('span').textContent = 'OFF';
                haON = false;
            } else {
                ul.classList.add('ha');
                toggleHaBtn.querySelector('span').textContent = 'ON';
                haON = true;
            }
        });
        const toggleCvBtn = document.querySelector('.toggle-cv');
        toggleCvBtn.addEventListener('click', e => {
            if (cvON) {
                ul.classList.remove('cv');
                toggleCvBtn.querySelector('span').textContent = 'none';
                cvON = false;
            } else {
                ul.classList.add('cv');
                toggleCvBtn.querySelector('span').textContent = 'auto';
                cvON = true;
            }
        });
        const toggleOpBtn = document.querySelector('.toggle-op');
        toggleOpBtn.addEventListener('click', e => {
            if (opON) {
                ul.classList.remove('op');
                toggleOpBtn.querySelector('span').textContent = 'OFF';
                opON = false;
            } else {
                ul.classList.add('op');
                toggleOpBtn.querySelector('span').textContent = 'ON';
                opON = true;
            }
        });
        const toggleOptmzBtn = document.querySelector('.toggle-src');
        toggleOptmzBtn.addEventListener('click', e => {
            if (optmON) {
                ul.querySelectorAll('li img').forEach((node, idx) => {
                    node.src = '';
                    node.src = unoptimizedImgs[idx];
                });
                toggleOptmzBtn.querySelector('span').textContent =
                    'unoptimized';
                optmON = false;
            } else {
                ul.querySelectorAll('li img').forEach((node, idx) => {
                    node.src = '';
                    node.src = optimizedImgs[idx];
                });
                toggleOptmzBtn.querySelector('span').textContent = 'optimized';
                optmON = true;
            }
        });
        function downloadImage(URL, Folder_Name, File_Name) {
            // step to request a file system
            const storageFolder =
                globals.deviceOSVersion && globals.deviceOSVersion >= 10
                    ? 'externalApplicationStorageDirectory'
                    : 'externalRootDirectory';
            window.resolveLocalFileSystemURL(
                cordova.file[storageFolder],
                fileSystemSuccess,
                fileSystemFail
            );

            function fileSystemSuccess(fileSystem) {
                const download_link = encodeURI(URL);
                // Get extension of URL, falling back to mp4 or jpg if the extension can't be determined
                const fallback = 'jpg';
                let ext = download_link.match(/\.(\w+)\?/);
                if (ext && ext[1]) {
                    let value = ext[1];
                    if (value.length < 3 || value.length > 4) {
                        // can't be png/jpg/jpeg/mp4
                        ext = fallback;
                    } else {
                        ext = /(jpe?g|png|mp4)/.test(value) ? value : fallback;
                    }
                } else {
                    ext = fallback;
                }
                const directoryEntry = fileSystem.filesystem.root; // to get root path of directory
                directoryEntry.getDirectory(
                    Folder_Name,
                    {
                        create: true,
                        exclusive: false,
                    },
                    onDirectorySuccess,
                    onDirectoryFail
                ); // creating folder in sdcard
                const rootdir = fileSystem.filesystem.root;
                let fp = rootdir.toURL(); // Returns Fulpath of local directory
                console.log(rootdir);
                fp = fp + Folder_Name + '/' + File_Name + '.' + ext; // fullpath and name of the file which we want to give
                // download function call
                filetransfer(download_link, fp);
            }

            function onDirectorySuccess(parent) {
                // alert("Sucesso");
            }

            function onDirectoryFail(error) {
                // Error while creating directory
                // alert("Unable to create new directory: " + error.code);
            }

            function fileSystemFail(evt) {
                // Unable to access file system
                // alert(evt.target.error.code);
            }
            function filetransfer(download_link, fp) {
                const fileTransfer = new FileTransfer();

                // File download function with URL and local path
                fileTransfer.download(
                    download_link,
                    fp,
                    function (entry) {
                        // alert("download complete: " + entry.fullPath);
                        alert('Media downloaded');
                    },
                    function (error) {
                        // Download abort errors or download failed errors
                        console.log(error);
                    },
                    false
                );
            }
        }
    },
};

app.initialize();
