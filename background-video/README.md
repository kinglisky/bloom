ffmpeg -y -i demo.mp4 demo.gif
ffmpeg -y -i demo.mp4 -vf scale=640:-1 -r 12 demo.min.gif

https://baike.baidu.com/item/TS%E6%96%87%E4%BB%B6/9554188
MPEG2-TS 格式的特点就是要求从视频流的任一片段开始都是可以独立解码的

https://github.com/sonysuqin/WasmVideoPlayer ffmepg + wasm 实现，ffmpeg 转 wasm 实现，移动端性能较差
https://github.com/qiaozi-tech/WXInlinePlayer 依赖于 flv， 体积较大
https://github.com/mbebenita/Broadway 作者实现一套安卓端的 h264 解码器（c 语言实现 + Wasm），支持特定编码的 MP4 格式的视频，且支持不完善有黑屏情况，且无法按照视频帧率进行播放（未对视频进行细颗粒度播放）
https://github.com/phoboslab/jsmpeg 作者实现的 mpeg1 的解码器（支持 JavaScript 与 Wasm 版本），只支持 ts 格式（mpeg1 编码）的视频，支持较为稳定，可支持细颗粒度播放

mix-blend-mode
https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode

https://juejin.im/post/5b189712f265da6e235488c1
https://www.jianshu.com/p/f9aef35232c1
https://github.com/Chimeejs/chimee-mobile-player/blob/master/doc/dev.md