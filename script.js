
const windows = {
    1: document.getElementById('draggable-window1'),
    2: document.getElementById('draggable-window2'),
    3: document.getElementById('draggable-window3'),
    4: document.getElementById('draggable-window4')
};

const buttons = {
    1: document.getElementById('open-btn'),
    2: document.getElementById('open-btn2'),
    3: document.getElementById('open-btn3'),
    4: document.getElementById('open-btn4')
};

const themeToggleBtn = document.getElementById('theme-toggle');
const resizers = document.querySelectorAll('.resizer');
const horizontalResizers = document.querySelectorAll('.resizer-horizontal');

let active = false;
let offset = [0, 0];
let initialMousePos = [0, 0];
let isResizing = false;
let startX, startY, startWidth, startHeight;
let isHorizontalResizing = false;
let currentlyDragging = null;
let highestZIndex = 1000; 

const openWindow = (key) => {
    const windowToShow = windows[key];
    windowToShow.classList.remove('hidden');
    windowToShow.classList.add('show');
    windowToShow.style.left = `${30 + (key - 1) * 60}px`;
    windowToShow.style.top = `${30 + (key - 1) * 60}px`;
    windowToShow.style.zIndex = 1000 + key;
};

Object.keys(buttons).forEach(key => {
    buttons[key].addEventListener('click', () => openWindow(key));
});

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        const windowToHide = document.querySelector(targetId);
        windowToHide.classList.remove('show');
        setTimeout(() => {
            windowToHide.classList.add('hidden');
        }, 300);
    });
});

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '☀️' : '🌙';
});

document.querySelectorAll('.draggable').forEach(dragItem => {
    dragItem.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resizer')) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(dragItem).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(dragItem).height, 10);
            return;
        }
        if (e.target.classList.contains('resizer-horizontal')) {
            isHorizontalResizing = true;
            startX = e.clientX;
            startWidth = parseInt(document.defaultView.getComputedStyle(dragItem).width, 10);
            return;
        }
        active = true;
        currentlyDragging = dragItem;
        initialMousePos = [e.clientX, e.clientY];
        offset = [
            dragItem.offsetLeft - initialMousePos[0],
            dragItem.offsetTop - initialMousePos[1]
        ];
        currentlyDragging.style.zIndex = ++highestZIndex;
    });

    document.addEventListener('mousemove', (e) => {
        if (active && currentlyDragging) {
            currentlyDragging.style.left = (e.clientX + offset[0]) + 'px';
            currentlyDragging.style.top = (e.clientY + offset[1]) + 'px';
        }
        if (isResizing && currentlyDragging) {
            currentlyDragging.style.width = (startWidth + e.clientX - startX) + 'px';
            currentlyDragging.style.height = (startHeight + e.clientY - startY) + 'px';
        }
        if (isHorizontalResizing && currentlyDragging) {
            currentlyDragging.style.width = (startWidth + e.clientX - startX) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        active = false;
        isResizing = false;
        isHorizontalResizing = false;
        currentlyDragging = null;
    });
  
});

function togglePlayPause() {
    var audio = document.getElementById('bgm');
    var button = document.getElementById('playPauseButton');

    if (audio.paused) {
      audio.play();
      button.textContent = 'Pause';
    } else {
      audio.pause();
      button.textContent = 'Play';
    }
  }

// masaya ka na?

 
  
