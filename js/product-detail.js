// 产品详情页脚本

document.addEventListener('DOMContentLoaded', function() {
    // 获取产品图片容器和信息容器
    const imagesContainer = document.querySelector('.product-images');
    const infoContainer = document.querySelector('.product-info-sticky');
    
    // 获取所有产品图片
    const productImages = document.querySelectorAll('.product-image');
    
    // 如果没有图片，则退出
    if (!productImages.length) return;
    
    // 最后一张图片
    const lastImage = productImages[productImages.length - 1];
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        // 计算最后一张图片的位置
        const lastImageRect = lastImage.getBoundingClientRect();
        const lastImageBottom = lastImageRect.bottom;
        
        // 窗口高度
        const windowHeight = window.innerHeight;
        
        // 如果最后一张图片的底部进入可视区域
        if (lastImageBottom <= windowHeight) {
            // 解除右侧内容的sticky定位，使其可以随页面滚动
            infoContainer.style.position = 'relative';
            infoContainer.style.top = `${imagesContainer.clientHeight - infoContainer.clientHeight}px`;
        } else {
            // 恢复sticky定位
            infoContainer.style.position = 'sticky';
            infoContainer.style.top = '120px';
        }
    });
    
    // 预加载所有图片以改善体验
    function preloadImages() {
        productImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    // 调用预加载函数
    preloadImages();
    
    // 初始检查最后一张图片位置（如果页面已经滚动）
    window.dispatchEvent(new Event('scroll'));

    // AR模态框功能
    const arButton = document.getElementById('ar-button');
    const qrModal = document.getElementById('qr-modal');
    const closeBtn = document.querySelector('.qr-close');

    // 点击AR按钮显示二维码
    if (arButton && qrModal) {
        arButton.addEventListener('click', function() {
            qrModal.style.display = 'block';
            // 使用setTimeout延迟添加show类，以便触发过渡效果
            setTimeout(() => {
                qrModal.classList.add('show');
            }, 10);
        });
    }

    // 点击关闭按钮隐藏二维码
    if (closeBtn && qrModal) {
        closeBtn.addEventListener('click', function() {
            qrModal.classList.remove('show');
            // 等待过渡效果完成后隐藏模态框
            setTimeout(() => {
                qrModal.style.display = 'none';
            }, 300);
        });
    }

    // 点击模态框背景也可关闭
    if (qrModal) {
        qrModal.addEventListener('click', function(event) {
            if (event.target === qrModal) {
                qrModal.classList.remove('show');
                setTimeout(() => {
                    qrModal.style.display = 'none';
                }, 300);
            }
        });
    }
}); 