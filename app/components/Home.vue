<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

        <GridLayout>
            <ListView
                v-if="loaded"
                for="item in itemList"
                separatorColor="transparent"
            >
                <v-template>
                    <StackLayout>
                        <NSImg
                            :src="image(item)"
                            width="150"
                            height="250"
                            roundAsCircle="true"
                            stretch="aspectFill"
                            placeholderImageUri="res://map_thumbnail_fallback"
                            failureImageUri="res://map_thumbnail_fallback"
                        />
                    </StackLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
  import * as fs from '@nativescript/core/file-system';

  export default {
    data() {
        return {
            loaded: false,
            itemList: [],
        }
    },

    mounted () {
        this.itemList = this.createRandomNumbers(100)

        setTimeout(() => {
            this.loaded = true
        }, 500)
    },

    methods: {
        createRandomNumbers (max) {
            for (var a=[],i=0;i<max;++i) a[i]=i;

            return this.shuffle(a);
        },
        shuffle(array) {
            var tmp, current, top = array.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        },
        image (item) {
            return `https://robohash.org/${item}${Date.now()}`
        }
    }
  };
</script>
