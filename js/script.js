// Ambelie Main JavaScript File

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