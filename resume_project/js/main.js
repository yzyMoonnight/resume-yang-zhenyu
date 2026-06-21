// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('杨振宇的个人简历网站已加载');

    // 加载动画
    handleLoadingAnimation();

    // 平滑滚动
    setupSmoothScrolling();

    // 导航栏滚动效果
    setupNavbarScroll();

    // 自动播放音乐
    setupAutoPlayMusic();
});

// 处理加载动画
function handleLoadingAnimation() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById('progress-fill');

    // 模拟加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // 隐藏加载屏幕
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 200);
}

// 设置平滑滚动
function setupSmoothScrolling() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 设置导航栏滚动效果
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 高亮当前section
        highlightCurrentSection();
    });
}

// 高亮当前section
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// 设置自动播放音乐
function setupAutoPlayMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicStatus = document.getElementById('musicStatus');

    // 设置音量
    bgMusic.volume = 0.5;

    // 尝试自动播放
    bgMusic.play().then(() => {
        console.log('音乐自动播放成功');
        updatePlayButton(true);
        if (musicStatus) {
            musicStatus.textContent = '♪ 正在播放';
            musicStatus.style.color = '#48bb78';
        }
    }).catch(error => {
        console.log('自动播放被阻止:', error);
        if (musicStatus) {
            musicStatus.textContent = '点击播放按钮开始';
            musicStatus.style.color = '#ed8936';
        }
        showPlayHint();
    });
}

// 更新播放按钮状态
function updatePlayButton(isPlaying) {
    const playBtn = document.getElementById('playBtn');
    const musicStatus = document.getElementById('musicStatus');

    if (playBtn) {
        const icon = playBtn.querySelector('i');
        const text = playBtn.querySelector('span');

        if (isPlaying) {
            icon.className = 'fas fa-pause';
            text.textContent = '暂停音乐';
            if (musicStatus) {
                musicStatus.textContent = '♪ 正在播放';
                musicStatus.style.color = '#48bb78';
            }
        } else {
            icon.className = 'fas fa-play';
            text.textContent = '播放音乐';
            if (musicStatus) {
                musicStatus.textContent = '已暂停';
                musicStatus.style.color = '#e53e3e';
            }
        }
    }
}

// 调节音量
function changeVolume(value) {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = value;
    console.log('音量调整为:', value);
}

// 显示播放提示
function showPlayHint() {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
    `;
    hint.innerHTML = `
        <i class="fas fa-music"></i> 
        点击任意位置开始播放背景音乐
    `;

    document.body.appendChild(hint);

    // 点击后移除提示并播放音乐
    document.addEventListener('click', function() {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play().then(() => {
            updatePlayButton(true);
        });
        hint.remove();
    }, { once: true });
}

// 音乐控制函数
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        updatePlayButton(false);
        isPlaying = false;
    } else {
        bgMusic.play().then(() => {
            updatePlayButton(true);
            isPlaying = true;
        }).catch(error => {
            console.log('音频播放失败:', error);
            alert('音频文件加载失败，请检查audio文件夹中是否有background-music.mp3文件');
        });
    }
}

// 删除loadAudio函数，不再需要上传音频功能
// Deleted:function loadAudio() {
// Deleted:    const audioInput = document.getElementById('audioInput');
// Deleted:    const file = audioInput.files[0];
// Deleted:
// Deleted:    if (!file) {
// Deleted:        alert('请先选择一个音频文件！');
// Deleted:        return;
// Deleted:    }
// Deleted:
// Deleted:    const audioURL = URL.createObjectURL(file);
// Deleted:    bgMusic.src = audioURL;
// Deleted:    bgMusic.load();
// Deleted:
// Deleted:    bgMusic.play().then(() => {
// Deleted:        updatePlayButton(true);
// Deleted:        isPlaying = true;
// Deleted:    }).catch(error => {
// Deleted:        console.log('音频播放失败:', error);
// Deleted:    });
// Deleted:
// Deleted:    alert('音频加载成功：' + file.name);
// Deleted:}


// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
