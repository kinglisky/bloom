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