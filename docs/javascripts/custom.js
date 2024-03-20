$(document).ready(function() {
    // 保存原始图片路径
    var originalImgSrc = "../img/IMG_2840.PNG";
    // 点击图片时切换成动图
    $('img#myImage').click(function() {
        // 替换静态图片为动图
        $(this).attr('src', '../img/IMG_9194.GIF');
        // 动画播放完成后恢复原始图片
        setTimeout(function() {
            $('img#myImage').attr('src', originalImgSrc);
        }, 3000); // 这里的3000是动画播放时间，单位为毫秒，根据实际情况调整
    });
});
