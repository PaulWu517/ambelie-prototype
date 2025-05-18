// Ambelie Main JavaScript File

// 导航菜单交互 - Mega Menu版本
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单交互 - Mega Menu版本
    const menuItems = document.querySelectorAll('.menu-item');
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    const megaMenus = document.querySelectorAll('.mega-menu');
    const header = document.querySelector('.site-header');
    const logo = document.querySelector('.logo img');
    
    // 向下滚动按钮功能
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const featuredSection = document.querySelector('.featured-items-title');
            if (featuredSection) {
                featuredSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // 如果找不到特定的部分，就滚动一个屏幕高度
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // 调整下拉菜单位置
    const adjustMegaMenuPosition = function() {
        const headerHeight = header.offsetHeight;
        megaMenuContainer.style.top = headerHeight + 'px';
    };
    
    // 初始化时调整
    adjustMegaMenuPosition();
    
    // 窗口大小改变时调整
    window.addEventListener('resize', adjustMegaMenuPosition);
    
    // 创建顶部边框线 - 完全移除这个功能
    const createBorderLine = function() {
        // 不再创建任何边框线
    };
    
    // 初始化时创建边框线 - 这一行也可以忽略
    // createBorderLine();
    
    // 处理菜单项点击和悬停事件
    menuItems.forEach(item => {
        // 获取对应的菜单目标
        const targetId = item.getAttribute('data-target');
        
        // 为所有菜单项添加mouseenter事件
        item.addEventListener('mouseenter', function() {
            // 移除所有活动状态
            menuItems.forEach(mi => mi.classList.remove('active'));
            megaMenus.forEach(mm => mm.classList.remove('active'));
            
            // 如果没有data-target属性，则关闭所有下拉菜单
            if (!targetId) {
                megaMenuContainer.classList.remove('active');
                header.classList.remove('menu-active');
                return;
            }
            
            // 添加当前项目的活动状态
            item.classList.add('active');
            
            // 激活对应的下拉菜单
            const targetMenu = document.getElementById(targetId);
            if (targetMenu) {
                targetMenu.classList.add('active');
                megaMenuContainer.classList.add('active');
                // 添加menu-active类到header，确保导航栏在下拉菜单显示时保持可见
                header.classList.add('menu-active');
                // 再次确保菜单位置正确
                adjustMegaMenuPosition();
            }
        });
    });
    
    // 给megaMenuContainer添加mouseenter事件，确保header保持menu-active状态
    megaMenuContainer.addEventListener('mouseenter', function() {
        header.classList.add('menu-active');
    });
    
    // 鼠标离开整个头部区域时关闭下拉菜单
    header.addEventListener('mouseleave', function() {
        // 延迟执行，以避免闪烁
        setTimeout(() => {
            if (!megaMenuContainer.matches(':hover')) {
                megaMenuContainer.classList.remove('active');
                menuItems.forEach(mi => mi.classList.remove('active'));
                megaMenus.forEach(mm => mm.classList.remove('active'));
                // 移除menu-active类
                header.classList.remove('menu-active');
            }
        }, 100);
    });
    
    // 鼠标离开下拉菜单区域时关闭
    megaMenuContainer.addEventListener('mouseleave', function() {
        megaMenuContainer.classList.remove('active');
        menuItems.forEach(mi => mi.classList.remove('active'));
        megaMenus.forEach(mm => mm.classList.remove('active'));
        // 移除menu-active类
        header.classList.remove('menu-active');
    });
    
    // 鼠标进入主内容区域时关闭下拉菜单
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.addEventListener('mouseenter', function() {
            megaMenuContainer.classList.remove('active');
            menuItems.forEach(mi => mi.classList.remove('active'));
            megaMenus.forEach(mm => mm.classList.remove('active'));
            header.classList.remove('menu-active');
        });
    }
    
    // 自动识别深色背景区域
    function setupColorDetectors() {
        // 自动添加颜色探测器到可能的深色背景区域
        const potentialDarkAreas = [
            '.hero-section', // 首屏大图区域
            '.hero-visual',
            '.about-us-section', // 绿色背景区域
            '[style*="background-color: var(--brand-green)"]', // 使用品牌绿色的元素
            '[style*="background-color: var(--brand-red)"]', // 使用品牌红色的元素
            '[style*="background-color: var(--brand-black)"]', // 使用品牌黑色的元素
            '[style*="background-color: #7E7A20"]', // 绿色背景
            '[style*="background-color: #880913"]', // 红色背景
            '[style*="background-color: #231815"]', // 黑色背景
            '[class*="dark-bg"]', // 带有dark-bg类名的元素
            '[class*="dark-background"]', // 带有dark-background类名的元素
            'img[src*=".jpg"]', // 图片区域可能是深色的
            'img[src*=".png"]'
        ];
        
        // 查找所有潜在的深色区域
        const darkAreaSelectors = potentialDarkAreas.join(',');
        const possibleDarkAreas = document.querySelectorAll(darkAreaSelectors);
        
        // 为每个可能的深色区域添加一个探测器元素
        possibleDarkAreas.forEach((area, index) => {
            // 为元素添加data-color-detector属性以便识别
            area.setAttribute('data-color-detector', 'area-' + index);
        });
        
        // 返回找到的所有潜在深色区域
        return possibleDarkAreas;
    }
    
    // 使用IntersectionObserver监视logo与深色背景区域的交叉
    function setupLogoColorObserver() {
        const potentialDarkAreas = setupColorDetectors();
        
        // 创建一个用于检测logo位置的元素
        const logoDetector = document.createElement('div');
        logoDetector.className = 'logo-position-detector';
        logoDetector.style.cssText = 'position: fixed; width: 40px; height: 40px; top: 20px; left: 50%; transform: translateX(-50%); z-index: -1; pointer-events: none;';
        document.body.appendChild(logoDetector);
        
        // 创建观察者监视logo探测器与各区域的交叉
        const observer = new IntersectionObserver((entries) => {
            if (!header.classList.contains('scrolled')) return;
            
            // 检查是否有深色区域与logo探测器相交
            let isOverDarkArea = false;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 这里我们假设所有监视的区域都是深色的
                    // 在实际应用中，可以根据区域的具体背景颜色来决定
                    isOverDarkArea = true;
                }
            });
            
            // 根据检测结果更新logo颜色
            if (isOverDarkArea) {
                logo.classList.add('logo-white');
            } else {
                logo.classList.remove('logo-white');
            }
        }, {
            threshold: [0.1, 0.5], // 当10%和50%交叉时触发
            rootMargin: '-10px' // 略微缩小检测范围
        });
        
        // 观察所有潜在的深色区域
        potentialDarkAreas.forEach(area => {
            observer.observe(area);
        });
    }
    
    // 滚动效果处理
    let lastScrollTop = 0;
    const scrollThreshold = 100; // 滚动多少像素后触发
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 如果向下滚动超过阈值，添加scrolled类
        if (scrollTop > scrollThreshold) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
                // 初始化时默认使用黑色logo
                logo.classList.remove('logo-white');
            }
        } else {
            // 如果回到顶部附近，移除scrolled类
            header.classList.remove('scrolled');
            // 恢复原始logo
            logo.classList.remove('logo-white');
        }
        
        // 更新最后的滚动位置
        lastScrollTop = scrollTop;
    });
    
    // 初始化logo颜色观察者
    setupLogoColorObserver();
    
    // 展示区域滚动按钮
    const nextBtn = document.querySelector('.exhibitions-next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const gallery = document.querySelector('.exhibitions-gallery');
            gallery.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        });
    }
    
    // 预加载悬停图片
    preloadHoverImages();
    
// 使用IntersectionObserver API检测元素进入视口
    // About Us区域的动画将只通过IntersectionObserver在滚动到视野时触发
    // 处理通用的animate-on-scroll元素
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, ' + 
        '.slide-from-left, ' + 
        '.slide-from-right, ' + 
        '.exhibition-title, ' + 
        '.exhibition-date, ' + 
        '.exhibition-description, ' + 
        '.view-more-link, ' + 
        '.exhibition-main-image, ' + 
        '.exhibition-content, ' + 
        '.about-us-title, ' + 
        '.about-us-content p, ' +
        '.about-logo'
    );

    console.log('Found ' + animatedElements.length + ' animated elements'); // 调试使用

    // 创建观察器实例
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素进入视口，添加动画类
                // 为About Us区域元素设置小延迟，创造更自然的动画效果
                const target = entry.target;
                
                if (target.classList.contains('delay-100')) {
                    setTimeout(() => { target.classList.add('animated'); }, 50);
                } else if (target.classList.contains('delay-200')) {
                    setTimeout(() => { target.classList.add('animated'); }, 100);
                } else if (target.classList.contains('delay-300')) {
                    setTimeout(() => { target.classList.add('animated'); }, 150);
                } else if (target.classList.contains('delay-400')) {
                    setTimeout(() => { target.classList.add('animated'); }, 200);
                } else if (target.classList.contains('delay-500')) {
                    setTimeout(() => { target.classList.add('animated'); }, 250);
                } else {
                    // 对于没有特定延迟类的元素，立即添加动画类
                    target.classList.add('animated');
                }
                
                console.log('Animated element:', target); // 调试使用

                // 一旦动画触发，不再观察该元素
                observer.unobserve(target);
            }
        });
    }, {
        // 配置项：当元素进入视口15%时触发
        threshold: 0.15,
        // 根元素的外边距，使元素在真正进入视口前就开始准备动画
        rootMargin: '0px 0px -100px 0px'
    });

    // 观察所有动画元素
    animatedElements.forEach(el => {
        observer.observe(el);
    });
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

// 预加载悬停图片
function preloadHoverImages() {
    console.log('Preloading hover images...');
    const hoverImages = document.querySelectorAll('.hover-image');
    
    if (hoverImages.length > 0) {
        console.log(`Found ${hoverImages.length} hover images to preload`);
        hoverImages.forEach(img => {
            // 强制浏览器缓存图片
            const imgSrc = img.getAttribute('src');
            if (imgSrc) {
                const preloadLink = document.createElement('link');
                preloadLink.href = imgSrc;
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                document.head.appendChild(preloadLink);
                
                // 也可以创建一个预加载图像
                const preloadImg = new Image();
                preloadImg.src = imgSrc;
            }
        });
    } else {
        console.log('No hover images found for preloading');
    }
}

// 轮播图自动切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有轮播图片
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return; // 如果没有找到轮播图片则退出
    
    let currentSlide = 0;
    
    // 轮播图切换函数
    function nextSlide() {
        // 移除当前图片的active类
        slides[currentSlide].classList.remove('active');
        
        // 计算下一张图片的索引
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 给下一张图片添加active类
        slides[currentSlide].classList.add('active');
    }
    
    // 设置定时器，每8秒切换一次图片
    setInterval(nextSlide, 8000);
}); 