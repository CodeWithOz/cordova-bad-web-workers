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
        window.WEBVIEW_SERVER_URL = window.origin;
    },
    getCamPic: function (cb, errCb) {
        const sourceType = Camera.PictureSourceType.PHOTOLIBRARY;

        const cameraOptions = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 720,
            mediaType: Camera.MediaType.PICTURE,
        };

        const storageFolder = 'externalRootDirectory';
        let folderToStoreImage = cordova.file[storageFolder]; // <-- SD card on Android

        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

        // Convert base64 to Blob function for image crop
        function base64toBlob(b64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = sliceSize || 512;

            const byteCharacters = atob(b64Data.split(',')[1]);
            const byteArrays = [];

            for (
                let offset = 0;
                offset < byteCharacters.length;
                offset += sliceSize
            ) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, {
                type: contentType,
            });
            return blob;
        }

        function cameraSuccess(imageURI) {
            const newImageURI = window.Ionic.WebView.convertFileSrc(imageURI);
            let uploadCropProfile = new Croppie(
                document.querySelector('#cropImageProfile'),
                {
                    enableOrientation: false,
                    enableExif: true,
                    viewport: {
                        width: 200,
                        height: 200,
                        type: 'circle',
                    },
                    boundary: {
                        width: 300,
                        height: 300,
                    },
                }
            );
            uploadCropProfile.bind({
                url: newImageURI,
            });
            uploadCropProfile
                .result({
                    type: 'base64',
                    format: 'jpeg',
                    size: 'original',
                    quality: 1,
                    circle: false,
                })
                .then(function (resp) {
                    window.resolveLocalFileSystemURL(
                        folderToStoreImage,
                        function (dirEntry) {
                            // Setup filename and assume a jpg file
                            const filename =
                                Math.floor(
                                    Math.random() * 100 + 1
                                ) + '-image.jpg';
                            console.log(
                                'File name cropped ',
                                filename
                            );
                            // Get file and create if it's not available
                            dirEntry.getFile(
                                filename,
                                {
                                    create: true,
                                    exclusive: false,
                                },
                                function (fileEntry) {
                                    // convert base64 data to jpg
                                    let binary = base64toBlob(
                                        resp,
                                        'jpg'
                                    );

                                    // store created jpg file
                                    fileEntry.createWriter(
                                        function (fileWriter) {
                                            // Write file end function
                                            fileWriter.onwriteend =
                                                function () {
                                                    console.log(
                                                        'Writing done'
                                                    );
                                                    // store and get it's path
                                                    const croppedImageURL =
                                                        fileEntry.nativeURL;

                                                    // send cropped image URL in callback
                                                    cb(
                                                        croppedImageURL
                                                    );
                                                };

                                            fileWriter.onerror =
                                                function (e) {
                                                    console.log(
                                                        'Writing error ',
                                                        e
                                                    );
                                                };

                                            // If data object is not passed in,
                                            // create a new Blob instead.
                                            if (!binary) {
                                                binary =
                                                    new Blob(
                                                        [
                                                            'missing data',
                                                        ],
                                                        {
                                                            type: 'text/plain',
                                                        }
                                                    );
                                            }
                                            // Write file call
                                            fileWriter.write(
                                                binary
                                            );
                                        }
                                    );
                                },
                                function (errorCreateFile) {
                                    console.error(errorCreateFile);
                                }
                            );
                        },
                        function (errorCreateFS) {
                            console.error(
                                'Error getting filesystem:', errorCreateFS
                            );
                        }
                    );
                });
        }

        function cameraError(message) {
            console.error(
                'Camera error:', message
            );
            if (typeof errCb === 'function') {
                errCb(message);
            }
        }
    },
};

app.initialize();
