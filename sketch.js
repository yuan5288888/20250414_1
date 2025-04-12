let hearts = []; // Array to store heart positions
let portfolioDropdown; // Dropdown menu for "作品集"
let notesDropdown; // Dropdown menu for "筆記"
let introBoxVisible = false; // Track visibility of the introduction box
let quizIframeVisible = false; // 用於追蹤測驗卷 iframe 的顯示狀態

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initial position and spacing
  let xPosition = 10; // Starting x position
  const spacing = 150; // Fixed spacing between most buttons
  const closerSpacing = 100; // Reduced spacing for "筆記" and "測驗卷"
  const portfolioToNotesSpacing = 120; // Reduced spacing between "作品集" and "筆記"

  // Create buttons
  let introButton = createButton('自我介紹');
  introButton.position(xPosition, 10);
  introButton.style('background-color', '#e7ecef'); // Updated color
  introButton.style('font-size', '20px');
  introButton.style('padding', '10px 20px');

  // Show introduction box when "自我介紹" button is clicked
  introButton.mousePressed(() => {
    introBoxVisible = !introBoxVisible; // Toggle visibility
  });

  xPosition += spacing; // Update x position for the next button

  // Create "作品集" button
  let portfolioButton = createButton('作品集');
  portfolioButton.position(xPosition, 10);
  portfolioButton.style('background-color', '#e7ecef'); // Updated color
  portfolioButton.style('font-size', '20px');
  portfolioButton.style('padding', '10px 20px');

  // Create "作品集"按鈕組
  let portfolioButtonGroup = [];
  let portfolioOptions = ['作品一', '作品二', '作品三']; // 定義選項
  let portfolioGroupVisible = false; // 按鈕組是否可見

  // "作品集"按鈕的點擊事件
  portfolioButton.mousePressed(() => {
    portfolioGroupVisible = !portfolioGroupVisible; // 切換按鈕組的顯示狀態
    portfolioButtonGroup.forEach((btn) => {
      if (portfolioGroupVisible) {
        btn.show();
      } else {
        btn.hide();
      }
    });
  });

  // 建立按鈕組
  portfolioOptions.forEach((option, index) => {
    let btn = createButton(option);
    btn.position(xPosition, 50 + index * 40); // 每個按鈕垂直排列
    btn.style('background-color', '#e7ecef');
    btn.style('font-size', '16px');
    btn.style('padding', '5px 10px');
    btn.hide(); // 初始隱藏
    btn.mousePressed(() => {
      console.log('選擇的選項:', option); // 確認選項
      let iframe = select('#portfolioIframe');
      if (!iframe) {
        iframe = createElement('iframe');
        iframe.id('portfolioIframe');
        iframe.style('width', '80%');
        iframe.style('height', '80%');
        iframe.style('position', 'absolute');
        iframe.style('top', '10%');
        iframe.style('left', '10%');
        iframe.style('border', '2px solid #000');
        iframe.parent(document.body);
      }

      // 切換 iframe 的顯示狀態
      if (iframe.style('display') !== 'none' && iframe.attribute('src') === getIframeSrc(option)) {
        iframe.hide(); // 隱藏 iframe
      } else {
        iframe.attribute('src', getIframeSrc(option)); // 設定對應的連結
        iframe.show(); // 顯示 iframe
      }
    });
    portfolioButtonGroup.push(btn); // 將按鈕加入按鈕組
  });

  xPosition += portfolioToNotesSpacing; // Use reduced spacing for the next button

  // Create "筆記" button
  let notesButton = createButton('筆記');
  notesButton.position(xPosition, 10);
  notesButton.style('background-color', '#e7ecef'); // Updated color
  notesButton.style('font-size', '20px');
  notesButton.style('padding', '10px 20px');

  // Create "筆記"按鈕組
  let notesButtonGroup = [];
  let notesOptions = ['筆記一', '筆記二', '筆記三', '期中報告']; // 新增「期中報告」選項
  let notesGroupVisible = false; // 按鈕組是否可見

  // "筆記"按鈕的點擊事件
  notesButton.mousePressed(() => {
    notesGroupVisible = !notesGroupVisible; // 切換按鈕組的顯示狀態
    notesButtonGroup.forEach((btn) => {
      if (notesGroupVisible) {
        btn.show();
      } else {
        btn.hide();
      }
    });
  });

  // 建立按鈕組
  notesOptions.forEach((option, index) => {
    let btn = createButton(option);
    btn.position(xPosition, 50 + index * 40); // 每個按鈕垂直排列
    btn.style('background-color', '#e7ecef');
    btn.style('font-size', '16px');
    btn.style('padding', '5px 10px');
    btn.hide(); // 初始隱藏
    btn.mousePressed(() => {
      console.log('選擇的選項:', option); // 確認選項
      let iframe = select('#notesIframe');
      if (!iframe) {
        // 如果 iframe 不存在，則建立一個新的 iframe
        iframe = createElement('iframe');
        iframe.id('notesIframe');
        iframe.style('width', '80%');
        iframe.style('height', '80%');
        iframe.style('position', 'absolute');
        iframe.style('top', '10%');
        iframe.style('left', '10%');
        iframe.style('border', '2px solid #000');
        iframe.parent(document.body);
      }

      // 切換 iframe 的顯示狀態
      if (iframe.style('display') !== 'none' && iframe.attribute('src') === getNotesIframeSrc(option)) {
        iframe.hide(); // 隱藏 iframe
      } else {
        iframe.attribute('src', getNotesIframeSrc(option)); // 設定對應的連結
        iframe.show(); // 顯示 iframe
      }
    });
    notesButtonGroup.push(btn); // 將按鈕加入按鈕組
  });

  xPosition += closerSpacing; // Use reduced spacing for the next button

  let quizButton = createButton('測驗卷');
  quizButton.position(xPosition, 10);
  quizButton.style('background-color', '#e7ecef'); // Updated color
  quizButton.style('font-size', '20px');
  quizButton.style('padding', '10px 20px');

  quizButton.mousePressed(() => {
    let iframe = select('#quizIframe');
    if (!iframe) {
      // 如果 iframe 不存在，則建立一個新的 iframe
      iframe = createElement('iframe');
      iframe.id('quizIframe');
      iframe.style('width', '80%');
      iframe.style('height', '80%');
      iframe.style('position', 'absolute');
      iframe.style('top', '10%');
      iframe.style('left', '10%');
      iframe.style('border', '2px solid #000');
      iframe.parent(document.body);
    }

    if (quizIframeVisible) {
      // 如果 iframe 已顯示，則隱藏它
      iframe.hide();
    } else {
      // 如果 iframe 隱藏，則顯示並載入連結
      iframe.attribute('src', 'https://yuan5288888.github.io/20250310/');
      iframe.show();
    }

    quizIframeVisible = !quizIframeVisible; // 切換顯示狀態
  });

  xPosition += spacing; // 更新 xPosition，為新按鈕留出間距

  let videoButton = createButton('影片'); // 新增「影片」按鈕
  videoButton.position(xPosition, 10); // 設定按鈕位置
  videoButton.style('background-color', '#e7ecef'); // 按鈕背景顏色
  videoButton.style('font-size', '20px'); // 按鈕字體大小
  videoButton.style('padding', '10px 20px'); // 按鈕內邊距

  // 「影片」按鈕的點擊事件
  videoButton.mousePressed(() => {
    let iframe = select('#videoIframe');
    if (iframe && iframe.style('display') !== 'none') {
      // 如果 iframe 已經顯示，則隱藏它
      iframe.hide();
    } else {
      // 如果 iframe 不存在或隱藏，則顯示它
      if (!iframe) {
        iframe = createElement('iframe');
        iframe.id('videoIframe');
        iframe.style('width', '80%');
        iframe.style('height', '80%');
        iframe.style('position', 'absolute');
        iframe.style('top', '10%');
        iframe.style('left', '10%');
        iframe.style('border', '2px solid #000');
        iframe.parent(document.body);
      }
      iframe.attribute('src', 'https://www.youtube.com/embed/rbxVy9wctyo'); // 更新嵌入影片連結
      iframe.show();
    }
  });

  // Generate initial hearts
  for (let i = 0; i < 100; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 30),
      speed: random(1, 3)
    });
  }
}

function draw() {
  background('#6c584c'); // Change background color to #6c584c

  // Draw and animate hearts
  noStroke();
  fill('#ff6b6b'); // Heart color
  for (let heart of hearts) {
    // Check if the heart is too close to the mouse
    if (dist(heart.x, heart.y, mouseX, mouseY) < heart.size + 50) {
      // Move the heart away from the mouse
      let angle = atan2(heart.y - mouseY, heart.x - mouseX);
      heart.x += cos(angle) * 5;
      heart.y += sin(angle) * 5;
    } else {
      // Normal downward movement
      heart.y += heart.speed;
    }

    // Draw the heart
    drawHeart(heart.x, heart.y, heart.size);

    // Reset heart to top if it goes off-screen
    if (heart.y > height) {
      heart.y = -heart.size;
      heart.x = random(width);
    }
  }

  // Draw introduction box if visible
  if (introBoxVisible) {
    const padding = 30; // 增加框框的內邊距
    const textContent = '嗨大家好，我是袁妤安，\n我是一個很愛笑的人，講話有點大聲所以我朋友常常叫我小聲一點，\n然後我喜歡玩一個遊戲叫夢幻家園。';

    textSize(24);
    const textLines = textContent.split('\n'); // 將文字分成多行
    const textWidthValue = max(...textLines.map(line => textWidth(line))); // 計算最寬的一行文字
    const boxWidth = textWidthValue + padding * 2; // 框框寬度
    const boxHeight = (textAscent() + textDescent()) * textLines.length + padding * 2; // 框框高度
    const boxX = (width - boxWidth) / 2; // 框框水平置中
    const boxY = (height - boxHeight) / 2; // 框框垂直置中

    fill('#e7ecef');
    stroke('#000');
    rect(boxX, boxY, boxWidth, boxHeight, 20); // 繪製圓角矩形
    fill('#000');
    noStroke();
    textAlign(CENTER, CENTER);

    // 繪製每一行文字
    textLines.forEach((line, index) => {
      const lineY = boxY + padding + (textAscent() + textDescent()) * index + (textAscent() / 2);
      text(line, boxX + boxWidth / 2, lineY);
    });
  }
}

// Function to draw a heart shape
function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

// Add event listener for "作品集" dropdown
portfolioDropdown.changed(() => {
  const selectedOption = portfolioDropdown.value();
  console.log('選擇的選項:', selectedOption); // 確認選項
  if (selectedOption === '作品一') {
    console.log('選擇了作品一');
    let iframe = select('#portfolioIframe');
    if (!iframe) {
      console.log('建立 iframe');
      iframe = createElement('iframe');
      iframe.id('portfolioIframe');
      iframe.style('width', '80%');
      iframe.style('height', '80%');
      iframe.style('position', 'absolute');
      iframe.style('top', '10%');
      iframe.style('left', '10%');
      iframe.style('border', '2px solid #000');
      iframe.parent(document.body);
    }
    iframe.attribute('src', 'https://yuan5288888.github.io/20250303_1/');
    console.log('iframe src 設定為:', iframe.attribute('src'));
    iframe.show();
  } else {
    let iframe = select('#portfolioIframe');
    if (iframe) {
      console.log('隱藏 iframe');
      iframe.hide();
    }
  }
});

// Hide iframe when clicking outside or selecting other options
function mousePressed() {
  const iframe = select('#portfolioIframe');
  if (iframe && !portfolioDropdown.elt.contains(event.target)) {
    iframe.hide();
  }
}

// Helper function to返回對應的 iframe 連結
function getIframeSrc(option) {
  if (option === '作品一') {
    return 'https://yuan5288888.github.io/20250303_1/';
  } else if (option === '作品二') {
    return 'https://yuan5288888.github.io/20250310/';
  } else if (option === '作品三') {
    return 'https://yuan5288888.github.io/20250317_5/';
  }
  return '';
}

// Helper function to返回對應的 iframe 連結
function getNotesIframeSrc(option) {
  if (option === '筆記一') {
    return 'https://hackmd.io/@Yuan0528/rk4qvXI01e'; // 筆記一的連結
  } else if (option === '筆記二') {
    return 'https://hackmd.io/@Yuan0528/S1svsXIC1g'; // 筆記二的連結
  } else if (option === '筆記三') {
    return 'https://hackmd.io/@Yuan0528/HkEjjQIC1l'; // 筆記三的連結
  } else if (option === '期中報告') {
    return 'https://hackmd.io/@Yuan0528/S15_F_P01l'; // 期中報告的連結
  }
  return '';
}
