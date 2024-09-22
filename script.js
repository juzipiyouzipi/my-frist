let currentIndex = 0;
let slides = document.querySelectorAll(".carousel-slide img");
let dotsContainer = document.querySelector(".dots-container");
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const slideContainer = document.querySelector('.carousel-slide');
let isTransitioning = false; // 用于防止动画未结束前点击按钮
let slideWidth = slides[0].clientWidth;

// 动态生成圆点
function createDots() {
    slides.forEach((_, index) => {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => currentSlide(index + 1));
        dotsContainer.appendChild(dot);
    });
}

// 调用函数，创建圆点
createDots();

let dots = document.querySelectorAll(".dot");

// 显示当前的幻灯片
function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    //执行轮播图片滑动效果
    let offset = -currentIndex * slideWidth; // 每张图片宽度为图片的实际宽度
    slideContainer.style.transform = `translateX(${offset}px)`;

    // 清除所有圆点的 active 类，并为当前显示的图片圆点添加 active 类
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

next.addEventListener('click', () => {
    if (!isTransitioning) {
        isTransitioning = true;
        showSlide(currentIndex + 1);
        // 等待 CSS 动画结束后，解锁点击
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // 500ms 与 CSS 动画时间一致
    }
});

// 上一张幻灯片
prev.addEventListener('click', () => {
    if (!isTransitioning) {
        isTransitioning = true;
        showSlide(currentIndex - 1);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
});

// 窗口大小改变时，更新每张图片的宽度
// window.addEventListener('resize', () => {
//     slideWidth = slides[0].clientWidth;
//     showSlide(currentIndex); // 保持当前显示的图片
// });


function currentSlide(index) {
    showSlide(index - 1);
}

setInterval(() => {
    showSlide(currentIndex + 1);
}, 4000); // 每4秒切换到下一张图片

// 初始状态
showSlide(currentIndex);