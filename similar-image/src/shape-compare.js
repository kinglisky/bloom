(async function () {
    // canvas drawImage 有跨域限制，先加载图片转 blob url 使用
    const loadImage = (url) => {
        return fetch(url)
            .then(res => res.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(blobUrl => {

                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = (e) => reject(e);
                    img.src = blobUrl;
                });
            });
    };

    const drawToCanvas = (image) => {
        const { naturalWidth: width, naturalHeight: height } = image;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return canvas;
    }

    const canvasToGray = (canvas) => {
        const ctx = canvas.getContext('2d');
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const calculateGray = (r, g, b) => parseInt(r * 0.299 + g * 0.587 + b * 0.114);
        const grayData = [];
        for (let x = 0; x < data.width; x++) {
            for (let y = 0; y < data.height; y++) {
                const idx = (x + y * data.width) * 4;
                const r = data.data[idx + 0];
                const g = data.data[idx + 1];
                const b = data.data[idx + 2];
                const gray = calculateGray(r, g, b);
                data.data[idx + 0] = gray;
                data.data[idx + 1] = gray;
                data.data[idx + 2] = gray;
                data.data[idx + 3] = 255;
                grayData.push(gray);
            }
        }
        ctx.putImageData(data, 0, 0);
        return grayData;
    };

    const getImageData = (canvas) => {
        const ctx = canvas.getContext('2d');
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    // 像素平均值图片阈值
    const average = (data) => {
        let sum = 0;
        // 因为是灰度图片，取第一通道的值就好
        for (let i = 0; i < data.length - 1; i += 4) {
            sum += data[i];
        }
        return Math.round(sum / (data.length / 4));
    };

    // 大津法取图片阈值
    const otsu = (data) => {
        let ptr = 0;
        let histData = Array(256).fill(0); // 记录0-256每个灰度值的数量，初始值为0
        let total = data.length;

        while (ptr < total) {
            let h = data[ptr++];
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

    const binaryzationOutput = (imageData, threshold) => {
        const { width, height, data } = imageData;
        const hash = [];
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const idx = (x + y * width) * 4;
                const avg = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                const v = avg > threshold ? 1 : 0;
                hash.push(v);
            }
        }
        return hash;
    }

    const hammingDistance = (hash1, hash2) => {
        let count = 0;
        hash1.forEach((it, index) => {
            count += it ^ hash2[index];
        });
        return count;
    };

    const image1 = await loadImage('https://erii.oss-cn-beijing.aliyuncs.com/demo0.jpeg');
    const image2 = await loadImage('https://erii.oss-cn-beijing.aliyuncs.com/demo1.jpeg');
    const canvas1 = drawToCanvas(image1);
    const canvas2 = drawToCanvas(image2);
    const grayData1 = canvasToGray(canvas1);
    const grayData2 = canvasToGray(canvas2);
    const threshold1 = otsu(grayData1);
    const threshold2 = otsu(grayData2);
    const hash1 = binaryzationOutput(getImageData(canvas1), threshold1);
    const hash2 = binaryzationOutput(getImageData(canvas2), threshold2);
    const distance = hammingDistance(hash1, hash2);

    console.log(`相似度为：${(hash1.length - distance) / hash1.length * 100}%`);
})();