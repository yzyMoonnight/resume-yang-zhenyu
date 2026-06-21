let audioContext;
let analyser;
let dataArray;
let canvas;
let ctx;
let animationId;
let source;

// 初始化Canvas
function initVisualizer() {
    canvas = document.getElementById('visualizer');
    ctx = canvas.getContext('2d');

    // 设置初始画面
    drawInitialScreen();
}

// 绘制初始画面
function drawInitialScreen() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制文字
    ctx.fillStyle = '#4facfe';
    ctx.font = 'bold 24px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.fillText('🎵 请上传音频文件开始可视化', canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = '#00f2fe';
    ctx.font = '16px Microsoft YaHei';
    ctx.fillText('支持 MP3、WAV、OGG 等格式', canvas.width / 2, canvas.height / 2 + 30);
}

// 初始化音频上下文
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
}

// 连接音频源
function connectAudioSource(audioElement) {
    if (!source) {
        source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
    }
}

// 绘制可视化
function drawVisualizer() {
    animationId = requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    // 清空画布
    ctx.fillStyle = 'rgba(26, 26, 46, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        // 创建渐变色
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, '#4facfe');
        gradient.addColorStop(0.5, '#00f2fe');
        gradient.addColorStop(1, '#667eea');

        // 绘制柱状图
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        // 绘制顶部光点
        ctx.beginPath();
        ctx.arc(x + barWidth / 2, canvas.height - barHeight, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        x += barWidth + 1;
    }

    // 绘制波形图
    drawWaveform();
}

// 绘制波形图
function drawWaveform() {
    const waveformData = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(waveformData);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();

    const sliceWidth = canvas.width / waveformData.length;
    let x = 0;

    for (let i = 0; i < waveformData.length; i++) {
        const v = waveformData[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.stroke();
}

// 修改main.js中的loadAudio函数，添加可视化支持
const originalLoadAudio = window.loadAudio;
window.loadAudio = function() {
    const audioInput = document.getElementById('audioInput');
    const file = audioInput.files[0];

    if (!file) {
        alert('请先选择一个音频文件！');
        return;
    }

    const audioURL = URL.createObjectURL(file);
    bgMusic.src = audioURL;
    bgMusic.load();

    // 初始化音频上下文和可视化
    initAudioContext();

    bgMusic.addEventListener('canplay', function() {
        connectAudioSource(bgMusic);

        bgMusic.play().then(() => {
            updatePlayButton(true);
            isPlaying = true;
            drawVisualizer();
        }).catch(error => {
            console.log('音频播放失败:', error);
        });
    }, { once: true });

    alert('音频加载成功：' + file.name + '\n开始音乐可视化！');
};

// 页面加载完成后初始化Canvas
document.addEventListener('DOMContentLoaded', initVisualizer);
