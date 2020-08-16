<template>
    <section class="container" :class="{ 'container--mobile': isMobile }" :style="containerStyle">
        <div class="view" :style="viewStyle">
            <img class="view__bg" src="./demo.jpeg" />
            <video
                v-if="useVideo"
                class="view__video"
                muted
                loop
                playsinline
                autoplay="autoplay"
                preload="auto"
                mtt-playsinline="true"
                webkit-playsinline="true"
                x5-video-player-type="h5-page"
                :src="source.sources.mp4"
                :poster="source.sources.poster"
            ></video>
            <canvas v-else ref="canvas" class="view__canvas"></canvas>
            <div class="view__mask">MASK</div>
        </div>
    </section>
</template>

<script>
import Player from 'silent-film-player';
import { isMobile, isIOS, isWeiXin, isWXMP } from './user-agent';

const SOURCE = {
    water: {
        width: 1920,
        height: 1080,
        sources: {
            mp4:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/water.mp4',
            ts:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/water.ts',
            poster:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/water.jpeg',
        },
    },
    petal: {
        width: 1920,
        height: 1080,
        sources: {
            mp4:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/petal.mp4',
            ts:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/petal.ts',
            poster:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/petal.jpeg',
        },
    },
    rain: {
        width: 1920,
        height: 1080,
        sources: {
            mp4:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/rain.mp4',
            ts: 'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/rain.ts',
            poster:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/rain.jpeg',
        },
    },
    'silent-voice': {
        width: 1920,
        height: 1080,
        sources: {
            mp4:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/silent-voice.mp4',
            ts:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/silent-voice.ts',
            poster:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/silent-voice.jpeg',
        },
    },
    firefly: {
        width: 1920,
        height: 1080,
        sources: {
            mp4:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/firefly.mp4',
            ts:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/firefly.ts',
            poster:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/firefly.jpeg',
        },
    },
    fireworks: {
        width: 1920,
        height: 1080,
        sources: {
            mp4:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/fireworks.mp4',
            ts:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/fireworks.ts',
            poster:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/fireworks.jpeg',
        },
    },
    '3-lion': {
        width: 1280,
        height: 720,
        sources: {
            mp4:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/3-lion.mp4',
            ts:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/3-lion.ts',
            poster:
                'https://kinglisky.oss-cn-hangzhou.aliyuncs.com/videos/3-lion.jpeg',
        },
    },
};

const urlParams = new URLSearchParams(location.search);
const sourceName = urlParams.get('source') || 'rain';
const useCanvas = Number(urlParams.get('canvas') || '0');

export default {
    data() {
        return {
            isMobile: isMobile(),
            container: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        };
    },

    computed: {
        useVideo() {
            // PC/iOS 端（非微信环境）使用 video 渲染，其他环境使用 canvas 渲染
            return (
                (!isMobile() || isIOS()) &&
                !isWeiXin() &&
                !isWXMP() &&
                !useCanvas
            );
        },

        source() {
            return SOURCE[sourceName];
        },

        containerStyle() {
            return {
                width: `${this.container.width}px`,
                height: `${this.container.height}px`,
            };
        },

        viewStyle() {
            const { container, source } = this;
            const ratio = container.height / source.height;
            const width = (source.width * ratio) | 0;
            return {
                top: '0px',
                left: `${-(width - container.width) / 2}px`,
                width: `${width}px`,
                height: `${container.height}px`,
            };
        },
    },

    methods: {
        init() {
            if (!this.isMobile) {
                this.container = {
                    width: 360,
                    height: 640,
                };
            }
        },

        initPlayer() {
            if (!this.useVideo) {
                const {
                    source: { sources },
                    $refs: { canvas },
                } = this;
                window.player = new Player(sources.ts, {
                    canvas,
                    loop: true,
                    autoplay: true,
                    poster: sources.poster,
                    disableWebAssembly: true,
                    chunkSize: 1 * 1024 * 1024,
                    videoBufferSize: 512 * 1024,
                });
            }
        },
    },

    created() {
        this.init();
    },

    mounted() {
        this.initPlayer();
    },
};
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}
html,
body {
    width: 100%;
    height: 100%;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-family: -apple-system;
}

.container {
    position: relative;
    overflow: hidden;
    width: 360px;
    height: 640px;

    &--mobile {
        width: 100%;
        height: 100%;
    }
}

.view {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 1px solid #000;

    &__bg {
        height: 100%;
    }

    &__video,
    &__canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;

        mix-blend-mode: screen;
    }

    &__mask {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 100%;
        height: 200px;
        font-size: 80px;
        color: #fff;
    }
}
</style>