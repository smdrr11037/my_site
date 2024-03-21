// 获取图片元素
var image = document.getElementById('myImage');
// 获取当前脚本所在的路径
var scriptPath = document.currentScript.src;

// 根据脚本路径获取图片所在的路径
var imagePath = scriptPath.substring(0, scriptPath.lastIndexOf("/") + 1);
// 定义初始图片名称和新图片名称
var initialImageName = 'IMG_2840.PNG';
var newImageName = 'IMG_9194.GIF';

// 监听图片点击事件
image.addEventListener('click', function() {
    // 判断当前显示的是哪张图片
    if(image.src != initialImageName){
        image.src = imagePath+newImageName;
        setTimeout(function() {
            image.src = imagePath+initialImageName;
        }, 3000); // 这里的3000是动画播放时间，单位为毫秒，根据实际情况调整

    }
    
});



