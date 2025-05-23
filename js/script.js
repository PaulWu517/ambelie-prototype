// Ambelie Main JavaScript File

// 导航菜单交互 - Mega Menu版本
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单交互 - Mega Menu版本
    const menuItems = document.querySelectorAll('.menu-item');
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    const megaMenus = document.querySelectorAll('.mega-menu');
    const header = document.querySelector('.site-header');
    const logo = document.querySelector('.logo img');
    
    // 新增：处理一级菜单与二级菜单的交互
    const primaryCategories = document.querySelectorAll('.primary-category');
    const menuSections = document.querySelectorAll('.menu-section');
    
    let closeMenuTimeout; // 用于延迟关闭菜单的计时器
    
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
        // 使用clientHeight而不是offsetHeight，避免计算外边距
        megaMenuContainer.style.top = headerHeight + 'px';
        // 设置负的上边距，确保紧贴页眉
        megaMenuContainer.style.marginTop = '0';
    };
    
    // 初始化时调整
    adjustMegaMenuPosition();
    
    // 窗口大小改变时调整
    window.addEventListener('resize', adjustMegaMenuPosition);
    
    // DOM加载完成后再次调整，确保位置正确
    window.addEventListener('load', adjustMegaMenuPosition);
    
    // 创建顶部边框线 - 完全移除这个功能
    const createBorderLine = function() {
        // 不再创建任何边框线
    };
    
    // 初始化：确保一开始不显示任何二级菜单
    menuSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 修改：为一级菜单类别添加鼠标悬停事件
    if (primaryCategories.length > 0) {
        primaryCategories.forEach(category => {
            category.addEventListener('mouseenter', function() {
                // 只有当megaMenuContainer是激活状态时才处理
                if (megaMenuContainer.classList.contains('active')) {
                    // 移除所有活动状态
                    primaryCategories.forEach(pc => pc.classList.remove('active'));
                    menuSections.forEach(ms => ms.classList.remove('active'));
                    
                    // 添加当前项目的活动状态
                    category.classList.add('active');
                    
                    // 添加has-active-primary类到megaMenuContainer
                    megaMenuContainer.classList.add('has-active-primary');
                    
                    // 激活对应的二级菜单区域
                    const categoryId = category.getAttribute('data-category');
                    if (categoryId) {
                        const targetSection = document.querySelector(`.menu-section[data-section="${categoryId}"]`);
                        if (targetSection) {
                            targetSection.classList.add('active');
                        }
                    }
                }
            });
            
            // 添加鼠标离开事件
            category.addEventListener('mouseleave', function() {
                // 延迟执行，避免在移动到相邻一级菜单时闪烁
                // setTimeout(() => {
                //     // 如果没有其他一级菜单项被激活，移除has-active-primary类和所有二级菜单的active类
                //     if (!document.querySelector('.primary-category:hover')) {
                //         megaMenuContainer.classList.remove('has-active-primary'); // Problematic line
                //         menuSections.forEach(ms => ms.classList.remove('active')); // Problematic line
                //     }
                // }, 50);
                // The logic above was causing the secondary menu to disappear when moving from primary to secondary.
                // The main megaMenuContainer's mouseleave event with its timeout is now responsible for closing.
                // Individual primary-category mouseleave should not aggressively close sections if the mouse
                // is still within the broader mega-menu area.
            });
        });
    }
    
    // 处理菜单项点击和悬停事件
    menuItems.forEach(item => {
        // 获取对应的菜单目标
        const targetId = item.getAttribute('data-target');
        
        // 为所有菜单项添加mouseenter事件
        item.addEventListener('mouseenter', function() {
            // 移除所有活动状态
            menuItems.forEach(mi => mi.classList.remove('active'));
            megaMenus.forEach(mm => mm.classList.remove('active'));
            menuSections.forEach(ms => ms.classList.remove('active')); // 确保清除所有二级菜单的活动状态
            primaryCategories.forEach(pc => pc.classList.remove('active')); // 确保清除所有一级菜单的活动状态
            
            // 如果没有data-target属性，则关闭所有下拉菜单
            if (!targetId) {
                megaMenuContainer.classList.remove('active');
                megaMenuContainer.classList.remove('has-active-primary'); // 移除has-active-primary类
                header.classList.remove('menu-active');
                return;
            }
            
            // 添加当前项目的活动状态
            item.classList.add('active');
            
            // 激活对应的下拉菜单
            const targetMenu = document.getElementById(targetId);
            if (targetMenu) {
                targetMenu.classList.add('active');
                megaMenuContainer.classList.add('active'); // 添加active类，使背景显示
                // 添加menu-active类到header，确保导航栏在下拉菜单显示时保持可见
                header.classList.add('menu-active');
                // 再次确保菜单位置正确
                adjustMegaMenuPosition();
                
                // 确保logo为黑色
                logo.classList.remove('logo-white');
                
                // 默认激活第一个一级菜单，但不显示任何二级菜单
                if (primaryCategories.length > 0) {
                    primaryCategories[0].classList.add('active');
                    // 不激活任何二级菜单，只有在鼠标悬停在一级菜单上时才会显示
                }
            }
        });
    });
    
    // 鼠标离开整个头部区域时关闭下拉菜单
    header.addEventListener('mouseleave', function() {
        clearTimeout(closeMenuTimeout); // 清除已有的关闭计时器
        closeMenuTimeout = setTimeout(() => {
            if (!megaMenuContainer.matches(':hover')) { // 检查鼠标是否在megaMenuContainer内
                megaMenuContainer.classList.remove('active');
                menuItems.forEach(mi => mi.classList.remove('active'));
                megaMenus.forEach(mm => mm.classList.remove('active'));
                menuSections.forEach(ms => ms.classList.remove('active'));
                primaryCategories.forEach(pc => pc.classList.remove('active'));
                header.classList.remove('menu-active');
                // 恢复logo颜色（如果需要）
                if (!header.classList.contains('scrolled') && !header.matches(':hover')) {
                    logo.classList.add('logo-white');
                }
            }
        }, 100); // 延迟100毫秒关闭
    });
    
    // 给megaMenuContainer添加mouseleave事件，确保移除所有激活状态
    megaMenuContainer.addEventListener('mouseleave', function() {
        clearTimeout(closeMenuTimeout); // 清除已有的关闭计时器
        closeMenuTimeout = setTimeout(() => {
        megaMenuContainer.classList.remove('active');
            megaMenuContainer.classList.remove('has-active-primary');
        menuItems.forEach(mi => mi.classList.remove('active'));
        megaMenus.forEach(mm => mm.classList.remove('active'));
            menuSections.forEach(ms => ms.classList.remove('active'));
            primaryCategories.forEach(pc => pc.classList.remove('active'));
        header.classList.remove('menu-active');
            // 恢复logo颜色（如果需要）
            if (!header.classList.contains('scrolled') && !header.matches(':hover')) {
                logo.classList.add('logo-white');
            }
        }, 100); // 延迟100毫秒关闭
    });
    
    // 当鼠标进入header或megaMenuContainer时，清除关闭菜单的计时器
    header.addEventListener('mouseenter', function() {
        clearTimeout(closeMenuTimeout);
        // 确保鼠标悬停在页眉上时logo始终为黑色
        logo.classList.remove('logo-white');
    });

    megaMenuContainer.addEventListener('mouseenter', function() {
        clearTimeout(closeMenuTimeout);
        header.classList.add('menu-active'); // 确保header在悬停megaMenu时保持激活
        // 确保logo为黑色
        logo.classList.remove('logo-white');
    });
    
    // 鼠标进入主内容区域时关闭下拉菜单
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.addEventListener('mouseenter', function() {
            megaMenuContainer.classList.remove('active');
            megaMenuContainer.classList.remove('has-active-primary'); // 移除has-active-primary类
            menuItems.forEach(mi => mi.classList.remove('active'));
            megaMenus.forEach(mm => mm.classList.remove('active'));
            menuSections.forEach(ms => ms.classList.remove('active')); // 确保清除所有二级菜单的活动状态
            header.classList.remove('menu-active');
        });
    }
    
    // 滚动效果处理
    let lastScrollTop = 0;
    const scrollThreshold = 100; // 滚动多少像素后触发
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
                // 确保滚动状态下logo是黑色的
                logo.classList.remove('logo-white');
            }
        } else {
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
                // 检查是否应该恢复为白色logo
                if (!header.matches(':hover') && !header.classList.contains('menu-active') && !megaMenuContainer.classList.contains('active')) {
                    logo.classList.add('logo-white');
                }
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
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
        '.about-logo, ' +
        '.past-exhibitions-section .product-item, ' +
        '.past-exhibitions-section .product-title, ' +
        '.past-exhibitions-section .product-period, ' +
        '.past-exhibitions-section .exhibition-date, ' +
        '.video-title, ' +
        '.video-description, ' +
        '.video-button'
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
                    target.classList.add('animated');
                }
                
                // 一旦元素被动画过，不再观察它
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // 相对于视口
        rootMargin: '0px', // 无边距
        threshold: 0.15 // 当15%的元素可见时触发
    });

    // 开始观察所有标记的元素
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // 对已在视口中的元素立即触发动画
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                el.classList.add('animated');
                observer.unobserve(el);
                }
        });
    }, 100);
});

// 预加载悬停图片函数
function preloadHoverImages() {
    const hoverImages = document.querySelectorAll('.hover-image');
        hoverImages.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
                const preloadLink = document.createElement('link');
            preloadLink.href = src;
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                document.head.appendChild(preloadLink);
            }
        });
} 

// 添加轮播功能
if (document.querySelector('.hero-slider')) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;
    
    // 初始化第一个幻灯片为活动状态
    slides[0].classList.add('active');
    
    function nextSlide() {
        // 移除当前幻灯片的活动状态
        slides[currentSlide].classList.remove('active');
        
        // 更新当前幻灯片索引
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // 添加新的活动状态
        slides[currentSlide].classList.add('active');
    }
    
    // 设置定时器，每5秒切换一次幻灯片
    setInterval(nextSlide, 5000);
} 