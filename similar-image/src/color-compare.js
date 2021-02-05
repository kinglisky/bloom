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

    const getImageData = (image) => {
        const { naturalWidth: width, naturalHeight: height } = image;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, width, height);
    };

    const getColorsIndexs = (imageData) => {
        const { width, height, data } = imageData;
        const indexs = Array.from({ length: 64 }).fill(0);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const idx = (x + y * width) * 4;
                const r = Math.round((data[idx + 0] + 32) / 64) - 1;
                const g = Math.round((data[idx + 1] + 32) / 64) - 1;
                const b = Math.round((data[idx + 2] + 32) / 64) - 1;
                const index = r * 16 + g * 4 + b;
                indexs[index] += 1;
            }
        }
        return indexs;
    };

    const calculateCosine = (vector1, vector2) => {
        let a = 0;
        let b = 0;
        let c = 0;
        for (let i = 0; i < vector1.length; i++) {
            a += vector1[i] * vector2[i];
            b += Math.pow(vector1[i], 2);
            c += Math.pow(vector2[i], 2);
        }
        return a / (Math.sqrt(b) * Math.sqrt(c));
    };

    const image1 = await loadImage('https://xxx.com/pic0.jpeg');
    const image2 = await loadImage('https://xxx.com/pic2.jpeg');
    const imageData1 = getImageData(image1);
    const imageData2 = getImageData(image2);
    const vector1 = getColorsIndexs(imageData1);
    const vector2 = getColorsIndexs(imageData2);
    const cosine = calculateCosine(vector1, vector2);
    console.log('相似度为', cosine);
})();
