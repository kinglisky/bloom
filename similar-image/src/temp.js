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

    const getImageData = (image, size = 64) => {
        const { naturalWidth: width, naturalHeight: height } = image;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        ctx.drawImage(image, 0, 0, width, height, 0, 0, size, size);
        return ctx.getImageData(0, 0, width, height);
    };

    const compareImage = (imageData1, imageData2) => {
        const { width, height } = imageData1;
        if (imageData2.width !== width || imageData2.height !== height) {
            return false;
        }
        // 逐个比较每个像素差异
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const idx = (x + y * width) * 4;
                const dr = imageData1.data[idx + 0] - imageData2.data[idx + 0];
                const dg = imageData1.data[idx + 1] - imageData2.data[idx + 1];
                const db = imageData1.data[idx + 2] - imageData2.data[idx + 2];
                const da = imageData1.data[idx + 3] - imageData2.data[idx + 3];
                if (dr || dg || db || da) {
                    console.log({ x, y, dr,  dg,  db,  da });
                    return false;
                }
            }
        }
        return true;
    };

    const image1 = await loadImage('https://xxx.com/pic0.jpeg');
    const image2 = await loadImage('https://xxx.com/pic1.jpeg');
    const isEqual = compareImage(getImageData(image1), getImageData(image2));
    console.log('isEqual', isEqual);
})();
