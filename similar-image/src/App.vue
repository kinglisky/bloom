<template>
    <main class="similar-images" :style="imageStyles">
        <div class="header">
            <button class="header-item upload">
                <label for="upload">图片上传</label>
                <input
                    multiple
                    id="upload-btn"
                    type="file"
                    accept="image/*"
                    @change="updateImageUrls"
                />
            </button>
            <div class="header-item size">
                <span>图片尺寸</span>
                <input
                    type="range"
                    placeholder="图片尺寸"
                    min="8"
                    max="256"
                    step="4"
                    v-model="imageSize"
                />
                <span>{{ imageSize }}px</span>
            </div>
        </div>
        <template v-if="imageUrls.length">
            <div class="panel">
                <span class="title">原始图片</span>
                <div class="contents">
                    <img
                        class="content-item"
                        :src="imageUrls[0]"
                        :ref="(el) => (imageRefs[0] = el)"
                    />
                    <img
                        class="content-item"
                        :src="imageUrls[1]"
                        :ref="(el) => (imageRefs[1] = el)"
                    />
                </div>
            </div>

            <!-- 灰度输出 -->
            <div class="panel">
                <span class="title">
                    <button @click="setGrayOutput">灰度</button>
                </span>
                <div class="contents">
                    <canvas
                        class="content-item"
                        :width="imageSize"
                        :height="imageSize"
                        :ref="(el) => (grayCavans[0] = el)"
                    />
                    <canvas
                        class="content-item"
                        :width="imageSize"
                        :height="imageSize"
                        :ref="(el) => (grayCavans[1] = el)"
                    />
                </div>
            </div>

            <!-- 二值化 -->
            <div v-if="hasGrayOutput" class="panel">
                <div class="title">
                    <button @click="setAverageOutput">average</button>
                    <button @click="setOtsuOutput">otsu</button>
                    <span>二值化</span>
                </div>
                <div class="contents">
                    <canvas
                        class="content-item"
                        :width="imageSize"
                        :height="imageSize"
                        :ref="(el) => (extremumCanvas[0] = el)"
                    />
                    <canvas
                        class="content-item"
                        :width="imageSize"
                        :height="imageSize"
                        :ref="(el) => (extremumCanvas[1] = el)"
                    />
                </div>
            </div>

            <!-- 特征值比较 -->
            <div v-if="hashData.length" class="panel">
                <div class="title">特征值比较</div>
                <div class="contents">
                    <textarea
                        class="content-item keep-size"
                        readonly
                        :width="imageSize"
                        :height="imageSize"
                        :value="hashData[0]"
                    />
                    <textarea
                        class="content-item keep-size"
                        readonly
                        :width="imageSize"
                        :height="imageSize"
                        :value="hashData[1]"
                    />
                </div>
                <div class="contents">
                    <h2 class="compare-info">
                        {{ compareHashInfo }}
                    </h2>
                </div>
            </div>

            <!-- 颜色向量比较 -->
            <div v-if="imageUrls.length" class="panel">
                <div class="title">
                    <button @click="createColorHistogram">颜色向量比较</button>
                </div>
                <div class="contents">
                    <textarea
                        class="content-item keep-size"
                        readonly
                        :width="imageSize"
                        :height="imageSize"
                        :value="colorsList[0]"
                    />
                    <textarea
                        class="content-item keep-size"
                        readonly
                        :width="imageSize"
                        :height="imageSize"
                        :value="colorsList[1]"
                    />
                </div>
                <div class="contents">
                    <h2 class="compare-info">
                        {{ compareColorInfo }}
                    </h2>
                </div>
            </div>
        </template>
    </main>
</template>

<script>
import { ref, computed, watch } from 'vue';
import defaultImage1 from './assets/0.jpeg';
import defaultImage2 from './assets/1.jpeg';

const DEFAULT_IMAGE_URLS = [defaultImage1, defaultImage2];

const useImages = () => {
    const imageSize = ref(64);
    const imageStyles = computed(() => {
        return {
            '--width': `${imageSize.value}px`,
            '--height': `${imageSize.value}px`,
        };
    });
    const imageRefs = ref([]);
    const imageUrls = ref([...DEFAULT_IMAGE_URLS]);

    const updateImageUrls = (event) => {
        let urls = [...event.target.files]
            .slice(0, 2)
            .map((file) => URL.createObjectURL(file));
        if (urls.length < 2) {
            urls = [...urls, ...DEFAULT_IMAGE_URLS].slice(0, 2);
        }
        imageUrls.value = urls;
    };

    return {
        imageSize,
        imageStyles,
        imageRefs,
        imageUrls,
        updateImageUrls,
    };
};

// 灰度输出
const useGrayOutput = ({ imageRefs, imageSize }) => {
    const grayCavans = ref([]);
    const hasGrayOutput = ref(false);
    const calculateGray = (r, g, b) =>
        parseInt(r * 0.299 + g * 0.587 + b * 0.114);

    const imageToGray = (canvas) => {
        const ctx = canvas.getContext('2d');
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < data.width; x++) {
            for (let y = 0; y < data.height; y++) {
                const idx = (x + y * data.width) * 4;
                // The RGB values
                const r = data.data[idx + 0];
                const g = data.data[idx + 1];
                const b = data.data[idx + 2];

                //更新图像数据
                const gray = calculateGray(r, g, b);
                data.data[idx + 0] = gray;
                data.data[idx + 1] = gray;
                data.data[idx + 2] = gray;
            }
        }
        ctx.putImageData(data, 0, 0);
    };

    const setGrayOutput = () => {
        const [image1, image2] = imageRefs.value;
        const [canvas1, canvas2] = grayCavans.value;
        const ctx1 = canvas1.getContext('2d');
        const ctx2 = canvas2.getContext('2d');
        ctx1.drawImage(
            image1,
            0,
            0,
            image1.naturalWidth,
            image1.naturalHeight,
            0,
            0,
            imageSize.value,
            imageSize.value
        );
        ctx2.drawImage(
            image2,
            0,
            0,
            image2.naturalWidth,
            image2.naturalHeight,
            0,
            0,
            imageSize.value,
            imageSize.value
        );
        imageToGray(canvas1);
        imageToGray(canvas2);
        hasGrayOutput.value = true;
    };
    return {
        grayCavans,
        hasGrayOutput,
        setGrayOutput,
    };
};

// 极值化输出
const useExtremumOutput = ({ grayCavans }) => {
    const extremumCanvas = ref([]);
    const hashData = ref([]);

    // 像素平均值去图片阈值
    const average = (imageData) => {
        let sum = 0;
        for (let i = 0; i < imageData.length - 1; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            sum += r + g + b;
        }
        return Math.round(sum / imageData.length);
    };

    // 大津法取图片阈值
    const otsu = (imageData) => {
        let ptr = 0;
        let histData = Array(256).fill(0); // 记录0-256每个灰度值的数量，初始值为0
        let total = imageData.length;

        while (ptr < total) {
            let h = imageData[ptr++];
            histData[h]++;
        }

        let sum = 0; // 总数(灰度值x数量)
        for (let i = 0; i < 256; i++) {
            sum += i * histData[i];
        }

        let wB = 0; // 背景（小于阈值）的数量
        let wF = 0; // 前景（大于阈值）的数量
        let sumB = 0; // 背景图像（灰度x数量）总和
        let varMax = 0; // 存储最大类间方差值
        let threshold = 0; // 阈值

        for (let t = 0; t < 256; t++) {
            wB += histData[t]; // 背景（小于阈值）的数量累加
            if (wB === 0) continue;
            wF = total - wB; // 前景（大于阈值）的数量累加
            if (wF === 0) break;

            sumB += t * histData[t]; // 背景（灰度x数量）累加

            let mB = sumB / wB; // 背景（小于阈值）的平均灰度
            let mF = (sum - sumB) / wF; // 前景（大于阈值）的平均灰度

            let varBetween = wB * wF * (mB - mF) ** 2; // 类间方差

            if (varBetween > varMax) {
                varMax = varBetween;
                threshold = t;
            }
        }

        return threshold;
    };

    const imageBinaryzationOutput = (canvas, imageData, threshold) => {
        const { width, height, data } = imageData;
        const hash = [];
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const idx = (x + y * canvas.width) * 4;
                const v = data[idx + 0] > threshold ? 255 : 0;
                data[idx] = v;
                data[idx + 1] = v;
                data[idx + 2] = v;
                hash.push(v > 0 ? 1 : 0);
                // data[idx + 3] = data[idx + 3];
            }
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
        return hash;
    };

    const getCanvasImageData = () => {
        const [grayCanvas1, grayCanvas2] = grayCavans.value;
        const ctx1 = grayCanvas1.getContext('2d');
        const ctx2 = grayCanvas2.getContext('2d');
        const imageData1 = ctx1.getImageData(
            0,
            0,
            grayCanvas1.width,
            grayCanvas1.height
        );
        const imageData2 = ctx2.getImageData(
            0,
            0,
            grayCanvas2.width,
            grayCanvas2.height
        );
        return [imageData1, imageData2];
    };

    const setAverageOutput = () => {
        const [imageData1, imageData2] = getCanvasImageData();
        const threshold1 = average(imageData1.data);
        const threshold2 = average(imageData2.data);
        const [extremumCanvas1, extremumCanvas2] = extremumCanvas.value;
        const hash1 = imageBinaryzationOutput(
            extremumCanvas1,
            imageData1,
            threshold1
        );
        const hash2 = imageBinaryzationOutput(
            extremumCanvas2,
            imageData2,
            threshold2
        );
        hashData.value = [hash1, hash2];
    };

    const setOtsuOutput = () => {
        const [imageData1, imageData2] = getCanvasImageData();
        const threshold1 = otsu(imageData1.data);
        const threshold2 = otsu(imageData2.data);
        const [extremumCanvas1, extremumCanvas2] = extremumCanvas.value;
        const hash1 = imageBinaryzationOutput(
            extremumCanvas1,
            imageData1,
            threshold1
        );
        const hash2 = imageBinaryzationOutput(
            extremumCanvas2,
            imageData2,
            threshold2
        );
        hashData.value = [hash1, hash2];
    };

    return {
        extremumCanvas,
        setAverageOutput,
        setOtsuOutput,
        hashData,
    };
};

const useImageHash = (hashData) => {
    const compareHashInfo = ref('');

    watch(hashData, (data) => {
        if (!data.length) return;
        const [hash1, hash2] = data;
        let count = 0;
        hash1.forEach((it, index) => {
            count += it ^ hash2[index];
        });

        compareHashInfo.value = `差异: ${count}, 相似度: ${
            ((hash1.length - count) / hash1.length) * 100
        }%`;
        console.log(compareHashInfo.value);
    });
    return {
        compareHashInfo,
    };
};

const useColorHistogram = ({ imageRefs, imageSize }) => {
    const compareColorInfo = ref('');
    const colorsList = ref([]);

    const createCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.width = imageSize.value;
        canvas.height = imageSize.value;
        return canvas;
    };

    const getImageData = () => {
        const canvas1 = createCanvas();
        const canvas2 = createCanvas();
        const [image1, image2] = imageRefs.value;
        const ctx1 = canvas1.getContext('2d');
        const ctx2 = canvas2.getContext('2d');
        ctx1.drawImage(
            image1,
            0,
            0,
            image1.naturalWidth,
            image1.naturalHeight,
            0,
            0,
            imageSize.value,
            imageSize.value
        );
        ctx2.drawImage(
            image2,
            0,
            0,
            image2.naturalWidth,
            image2.naturalHeight,
            0,
            0,
            imageSize.value,
            imageSize.value
        );
        const imageData1 = ctx1.getImageData(
            0,
            0,
            canvas1.width,
            canvas1.height
        );
        const imageData2 = ctx2.getImageData(
            0,
            0,
            canvas2.width,
            canvas2.height
        );
        return [imageData1, imageData2];
    };

    const getColors = (data, chunk = 4) => {
        const chunkSize = 256 / chunk;
        const halfSize = chunkSize / 2;
        const colors = Array.from({ length: Math.pow(chunk, 3) }).fill(0);
        for (let x = 0; x < data.width; x++) {
            for (let y = 0; y < data.height; y++) {
                const idx = (x + y * data.width) * 4;
                // The RGB values
                const r =
                    Math.round((data.data[idx + 0] + halfSize) / chunkSize) - 1;
                const g =
                    Math.round((data.data[idx + 1] + halfSize) / chunkSize) - 1;
                const b =
                    Math.round((data.data[idx + 2] + halfSize) / chunkSize) - 1;
                const index = r * Math.pow(chunk, 2) + g * chunk + b;
                colors[index] += 1;
            }
        }
        return colors;
    };

    const calculateCosine = (d1, d2) => {
        let numerator = 0;
        let denominatorA = 0;
        let denominatorB = 0;
        for (let i = 0; i < d1.length; i++) {
            numerator += d1[i] * d2[i];
            denominatorA += Math.pow(d1[i], 2);
            denominatorB += Math.pow(d2[i], 2);
        }
        return numerator / (Math.sqrt(denominatorA) * Math.sqrt(denominatorB));
    };

    const createColorHistogram = () => {
        const [imageData1, imageData2] = getImageData();
        const colors1 = getColors(imageData1);
        const colors2 = getColors(imageData2);
        colorsList.value = [colors1, colors2];
        const cosine = calculateCosine(colors1, colors2);
        compareColorInfo.value = `颜色向量相似度为：${cosine * 100}%`;
    };

    return {
        compareColorInfo,
        colorsList,
        createColorHistogram,
    };
};

export default {
    name: 'App',

    setup() {
        const images = useImages();
        const grayOutput = useGrayOutput(images);
        const extremumOutput = useExtremumOutput(grayOutput);
        const imageHash = useImageHash(extremumOutput.hashData);
        const colorHistogra = useColorHistogram(images);

        const reset = () => {
            grayOutput.hasGrayOutput.value = false;
            extremumOutput.hashData.value = [];
            colorHistogra.colorsList.value = [];
            colorHistogra.compareColorInfo.value = '';
        };

        watch(images.imageUrls, reset);
        watch(images.imageSize, reset);

        return {
            ...images,
            ...grayOutput,
            ...extremumOutput,
            ...colorHistogra,
            ...imageHash,
        };
    },
};
</script>

<style lang="scss">
.similar-images {
    button {
        padding: 8px 16px;
        font-size: 14px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
    }
    .header {
        display: flex;
        align-items: center;
        padding: 16px;
    }

    .header-item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;

        & + .header-item {
            margin-left: 8px;
        }

        &.upload {
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

        &.size {
            input {
                margin: 0 8px;
            }
        }
    }
    .panel {
        padding: 0 16px;
        margin: 24px 0;
    }

    .title {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        * + * {
            margin-left: 8px;
        }
    }

    .contents {
        display: flex;
        align-items: center;

        .content-item {
            display: block;
            width: var(--width);
            height: var(--height);
            resize: none;
            border: 1px solid #eee;

            & + .content-item {
                margin-left: 16px;
            }

            &.keep-size {
                width: 256px;
                height: 128px;
            }
        }
    }

    .compare-info {
        margin-top: 8px;
        color: #f00;
        font-size: 16px;
    }
}
</style>
