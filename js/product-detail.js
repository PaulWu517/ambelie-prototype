// 产品详情页脚本 - 简化版 - v1.0.9
document.addEventListener('DOMContentLoaded', function() {
    console.log('产品详情页脚本加载 v1.0.9');
    
    // 获取图片数量
    const mainImages = document.querySelectorAll('.main-image img');
    console.log('检测到图片数量：', mainImages.length);
    
    // 图片轮播功能
    setupGallery();
    
    // AR查看功能
    setupAR();
});

// 设置轮播图功能
function setupGallery() {
    // 获取必要元素
    const mainImages = document.querySelectorAll('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');
    
    console.log('轮播元素：', {
        'mainImages': mainImages.length,
        'thumbnails': thumbnails.length,
        'prevBtn': prevBtn,
        'nextBtn': nextBtn
    });
    
    // 如果没有找到必要元素，则退出
    if (!mainImages.length || !thumbnails.length) {
        console.error('找不到图片元素，退出初始化');
        return;
    }
    
    // 初始状态
    let currentIndex = 0;
    
    // 显示初始图片
    showImage(0);
    
    // 显示特定索引的图片
    function showImage(index) {
        // 防止索引越界
        if (index < 0) index = mainImages.length - 1;
        if (index >= mainImages.length) index = 0;
        
        console.log('切换到图片', index);
        
        // 更新当前索引
        currentIndex = index;
        
        // 移除所有active类
        mainImages.forEach(img => img.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
        // 添加active类到当前图片
        mainImages[index].classList.add('active');
        
        // 如果有对应的缩略图，也添加active类
        if (thumbnails[index]) {
            thumbnails[index].classList.add('active');
        }
    }
    
    // 上一张图片
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            console.log('点击上一张');
            showImage(currentIndex - 1);
        };
    }
    
    // 下一张图片
    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            console.log('点击下一张');
            showImage(currentIndex + 1);
        };
    }
    
    // 缩略图点击
    thumbnails.forEach((thumb, idx) => {
        thumb.onclick = function() {
            console.log('点击缩略图', idx);
            showImage(idx);
        };
    });
    
    // 点击图片放大功能
    mainImages.forEach(img => {
        img.onclick = function() {
            console.log('点击放大图片:', img.src);
            
            // 创建全屏覆盖层
            const overlay = document.createElement('div');
            overlay.className = 'fullscreen-image-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: zoom-out;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // 创建大图容器
            const imgContainer = document.createElement('div');
            imgContainer.className = 'fullscreen-image-container';
            imgContainer.style.cssText = `
                width: 90%;
                height: 80%;
                max-width: 1200px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            `;
        
            // 创建所有大图，但只显示当前的
            const fullscreenImages = [];
            mainImages.forEach((mainImg, idx) => {
                console.log('准备全屏图片:', idx, mainImg.src);
                
                const fsImg = document.createElement('img');
                fsImg.src = mainImg.src;
                fsImg.alt = mainImg.alt;
                fsImg.style.cssText = `
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.95);
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    opacity: 0;
                    display: none;
                    cursor: zoom-out;
                `;
                
                if (idx === currentIndex) {
                    console.log('激活当前图片:', idx);
                    fsImg.style.opacity = '1';
                    fsImg.style.display = 'block';
                }
                
                imgContainer.appendChild(fsImg);
                fullscreenImages.push(fsImg);
            });
            
            // 创建左右导航按钮
            const prevFsBtn = document.createElement('button');
            prevFsBtn.className = 'gallery-nav prev-button fullscreen-nav';
            prevFsBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevFsBtn.style.cssText = `
                position: absolute;
                top: 50%;
                left: 60px;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: white;
                font-size: 18px;
                transition: background-color 0.3s ease;
                z-index: 10001;
            `;
            
            const nextFsBtn = document.createElement('button');
            nextFsBtn.className = 'gallery-nav next-button fullscreen-nav';
            nextFsBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextFsBtn.style.cssText = `
                position: absolute;
                top: 50%;
                right: 60px;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: white;
                font-size: 18px;
                transition: background-color 0.3s ease;
                z-index: 10001;
            `;
            
            // 悬停效果
            prevFsBtn.onmouseover = function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            };
            prevFsBtn.onmouseout = function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            };
            
            nextFsBtn.onmouseover = function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            };
            nextFsBtn.onmouseout = function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            };
            
            // 创建关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.className = 'fullscreen-close-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: -40px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
            
            // 当前全屏索引
            let fullscreenIndex = currentIndex;
            
            // 切换全屏图片的函数
            const showFullscreenImage = (index) => {
                // 确保索引在有效范围内
                if (index < 0) index = fullscreenImages.length - 1;
                if (index >= fullscreenImages.length) index = 0;
                
                console.log('切换全屏图片:', fullscreenIndex, '->', index);
                
                // 隐藏当前图片
                fullscreenImages[fullscreenIndex].style.opacity = '0';
                setTimeout(() => {
                    fullscreenImages[fullscreenIndex].style.display = 'none';
                    
                    // 显示新图片
                    fullscreenIndex = index;
                    fullscreenImages[fullscreenIndex].style.display = 'block';
                    
                    // 触发重绘然后显示
                    setTimeout(() => {
                        fullscreenImages[fullscreenIndex].style.opacity = '1';
                        fullscreenImages[fullscreenIndex].style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 10);
                }, 300);
            };
            
            // 为左右按钮添加事件处理
            prevFsBtn.onclick = function(e) {
                console.log('点击全屏左箭头');
                e.stopPropagation(); // 阻止事件冒泡
                showFullscreenImage(fullscreenIndex - 1);
            };
            
            nextFsBtn.onclick = function(e) {
                console.log('点击全屏右箭头');
                e.stopPropagation(); // 阻止事件冒泡
                showFullscreenImage(fullscreenIndex + 1);
            };
            
            // 组装DOM结构
            imgContainer.appendChild(closeBtn);
            overlay.appendChild(imgContainer);
            overlay.appendChild(prevFsBtn);
            overlay.appendChild(nextFsBtn);
            document.body.appendChild(overlay);
            
            // 触发重绘并显示
            setTimeout(() => {
                console.log('显示全屏覆盖层');
                overlay.style.opacity = '1';
                fullscreenImages[fullscreenIndex].style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            
            // 关闭功能
            const closeOverlay = () => {
                console.log('关闭全屏浏览');
                
                // 同步显示当前全屏正在查看的图片
                if (fullscreenIndex !== currentIndex) {
                    console.log('同步全屏索引到主展示区:', fullscreenIndex);
                    showImage(fullscreenIndex);
                }
                
                overlay.style.opacity = '0';
                fullscreenImages.forEach(img => {
                    img.style.transform = 'translate(-50%, -50%) scale(0.95)';
                });
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            };
            
            // 为每张全屏图片添加点击事件，点击图片时关闭全屏浏览
            fullscreenImages.forEach(fsImg => {
                fsImg.onclick = function(e) {
                    console.log('点击全屏图片关闭');
                    e.stopPropagation(); // 阻止事件冒泡到overlay
                    closeOverlay();
                };
            });
            
            // 点击关闭按钮
            closeBtn.onclick = function(e) {
                console.log('点击关闭按钮');
                e.stopPropagation(); // 阻止事件冒泡
                closeOverlay();
            };
            
            // 点击背景也关闭
            overlay.onclick = function(e) {
                if (e.target === overlay) {
                    closeOverlay();
                }
            };
            
            // 添加键盘导航
            document.addEventListener('keydown', function keyNav(e) {
                switch (e.key) {
                    case 'Escape':
                        closeOverlay();
                        document.removeEventListener('keydown', keyNav);
                        break;
                    case 'ArrowLeft':
                        showFullscreenImage(fullscreenIndex - 1);
                        break;
                    case 'ArrowRight':
                        showFullscreenImage(fullscreenIndex + 1);
                        break;
                }
            });
        };
    });
}

// 设置AR查看功能
function setupAR() {
    const arButton = document.getElementById('ar-button');
    const qrModal = document.getElementById('qr-modal');
    const closeBtn = document.querySelector('.qr-close');

    if (!arButton || !qrModal || !closeBtn) return;
    
    // 打开模态框
    arButton.onclick = function() {
            qrModal.style.display = 'block';
        setTimeout(() => qrModal.classList.add('show'), 10);
    };

    // 关闭模态框
    closeBtn.onclick = function() {
        qrModal.classList.remove('show');
        setTimeout(() => qrModal.style.display = 'none', 300);
    };
    
    // 点击背景也关闭
    qrModal.onclick = function(e) {
        if (e.target === qrModal) {
            qrModal.classList.remove('show');
            setTimeout(() => qrModal.style.display = 'none', 300);
            }
    };
} 