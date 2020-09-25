<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

        <GridLayout>
            <RadListView
                for="item in itemList"
                separatorColor="transparent"
            >
                <v-template>
                    <StackLayout>
                        <NSImg
                            :src="item" 
                            width="150" 
                            height="250"
                            roundAsCircle="true"
                            stretch="aspectFill"
                            placeholderImageUri="res://map_thumbnail_fallback"
                            failureImageUri="res://map_thumbnail_fallback"
                        />
                    </StackLayout>
                </v-template>
            </RadListView>
        </GridLayout>
    </Page>
</template>

<script>
    import * as fs from '@nativescript/core/file-system';

    import { ObservableArray, Http as http } from '@nativescript/core';

  export default {
    data() {
        return {
            allUrls: [
                "https://images.unsplash.com/photo-1455098934982-64c622c5e066",
                "https://images.unsplash.com/photo-1456318019777-ccdc4d5b2396",
                "https://images.unsplash.com/photo-1458724338480-79bc7a8352e4",
                "https://unsplash.com/photos/iCSKALuNuWg/download?w=640/iCSKALuNuWg",
                "https://unsplash.com/photos/QqewKdbSFJg/download?w=640/QqewKdbSFJg",
                "https://unsplash.com/photos/WG-pGdDEfro/download?w=640/WG-pGdDEfro",
                "https://unsplash.com/photos/Ne5A2HLuUCc/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/F2UPfeJ6xNM/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/1_tNKG1HClg/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/wRtQUJkZkiA/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/Tk-CdTA5h6g/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/zMjuhZzrWbA/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/1YWMQgcok64/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/vpwFCBTERaY/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/SXe1Dg3s1y4/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/knokYCzmF6o/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/V82p_mPUtWk/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/J9BJy8XZTz0/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/h24GS_aZKus/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/ITL3sz8YQNg/download?w=640/Ne5A2HLuUCc",
                "https://unsplash.com/photos/3i1HlTReH3E/download?w=640/Ne5A2HLuUCc",
            ],
            itemList: new ObservableArray([]),
        }
    },
    created() {
        var docFolder = this.getDocumentsProjectsFolder();

        var items = [];
        var downloaded = 0;
        this.allUrls.forEach((itemURL, index) => {
            const thumbnailUrl = fs.path.join(docFolder._path, index + '.jpg');

            this.downloadImage(itemURL, thumbnailUrl)
                .then(() => {
                    downloaded++;
                    let source = NSURL.alloc().initFileURLWithPath(thumbnailUrl);

                    items.push(source.toString());

                    if (downloaded === this.allUrls.length) {
                        this.itemList.push(items);
                    }
                });
        });
    },
    methods: {
        downloadImage(imageUrl, destinationPath) {
            return http.getImage({
                url: imageUrl,
                method: 'GET'
            })
            .then((imageSource) => {
                return new Promise((resolve, reject) => {
                    const saved = imageSource.saveToFile(destinationPath, "jpg");
                    if (saved) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        },

        /**
         * Get documents base folder
         *
         * @return FolderEntity
         */
        getDocumentsFolder() {
            return fs.knownFolders.documents();
        },

        /**
         * Get top level folder with name
         *
         * @param  string name Folder name
         * @return FolderEntity
         */
        getDocumentsFolderWithName(name) {
            const folderPath = fs.path.normalize(this.getDocumentsFolder().path + '/' + name + '/');
            const folder = fs.Folder.fromPath(folderPath);

            return folder;
        },

        /**
         * Get documents projects base folder
         *
         * @return FolderEntity
         */
        getDocumentsProjectsFolder() {
            return this.getDocumentsFolderWithName('projects');
        },
    }
  };
</script>
