// Ambelie Main JavaScript File

// 首页轮播功能
window.addEventListener('DOMContentLoaded', function() {
    // 获取轮播元素
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        // 显示指定索引的幻灯片
        function showSlide(index) {
            // 确保索引在有效范围内
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            // 更新当前索引
            currentIndex = index;
            
            // 更新所有幻灯片状态
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentIndex);
            });
            
            // 更新指示器状态
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }

        // 下一张幻灯片
        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        // 上一张幻灯片
        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        // 启动自动播放
        function startAutoSlide() {
            stopAutoSlide(); // 先停止之前的计时器
            slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
        }

        // 停止自动播放
        function stopAutoSlide() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }

        // 设置按钮点击事件
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startAutoSlide(); // 重置自动播放计时器
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startAutoSlide(); // 重置自动播放计时器
            });
        }

        // 设置指示器点击事件
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                showSlide(index);
                startAutoSlide(); // 重置自动播放计时器
            });
        });

        // 鼠标悬停时暂停自动播放
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', stopAutoSlide);
            heroSlider.addEventListener('mouseleave', startAutoSlide);
        }

        // 启动初始自动播放
        startAutoSlide();
    }
});

// 展览区块轮播功能
window.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.querySelector('.exhibitions-next-btn');
    const gallery = document.querySelector('.exhibitions-gallery');
    if (nextBtn && gallery) {
        const item = gallery.querySelector('.exhibition-item');
        const items = gallery.querySelectorAll('.exhibition-item');
        nextBtn.addEventListener('click', function() {
            if (item) {
                const itemWidth = item.offsetWidth + 40; // 图片宽+gap
                // 判断是否已经到最后一张或更右
                if (gallery.scrollLeft + gallery.offsetWidth >= gallery.scrollWidth - 1) {
                    // 平滑地将第一张滚动到视野中
                    gallery.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    gallery.scrollBy({ left: itemWidth, behavior: 'smooth' });
                }
            }
        });
    }
});

// Future interactive scripts will go here 