<template>
    <main
        class="similar-images"
        :style="varStyles"
    >
        <div class="header">
            <button class="btn">
                <label for="upload">图片上传</label>
                <input
                    multiple
                    id="upload-btn"
                    type="file"
                    accept="image/*"
                    @change="updateImageUrls"
                />
            </button>
        </div>
        <template v-if="imageUrls.length">
            <div class="panel">
                <span class="title">原始图片</span>
                <div class="images">
                    <img :src="imageUrls[0]" />
                    <img :src="imageUrls[1]" />
                </div>
            </div>
            <div class="panel">
                <span class="title">difference</span>
                <div class="images">
                    <canvas></canvas>
                </div>
            </div>
        </template>
    </main>
</template>

<script>
import { ref, computed } from 'vue';

const SIZE = 128;

const useImages = () => {
    const imageUrls = ref([]);
    const updateImageUrls = (event) => {
        const urls = [...event.target.files]
            .slice(0, 2)
            .map((file) => URL.createObjectURL(file));
        imageUrls.value = urls;
    };
    return {
        imageUrls,
        updateImageUrls,
    };
}
export default {
    name: 'App',

    setup() {
        const varStyles = computed(() => {
            return {
                '--width': '128px',
                '--height': '128px',
            };
        });

        return {
            varStyles,
            ...useImages(),
        };
    },
};
</script>

<style lang="scss">
.similar-images {
    .header {
        display: flex;
        align-items: center;
        padding: 16px;
    }

    .btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 60px;
        font-size: 14px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;

        input {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            cursor: pointer;
            opacity: 0;
        }
    }
    .panel {
        padding: 0 16px;

        & + .panel {
            margin-top: 24px;
        }
    }

    .title {
        display: block;
        margin-bottom: 8px;
    }

    .images {
        display: flex;
        align-items: center;

        img {
            width: var(--width);
            height: var(--height);
            display: block;

            & + img {
                margin-left: 16px;
            }
        }
    }
}
</style>
