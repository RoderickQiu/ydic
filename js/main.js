const { app, BrowserWindow, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 768, height: 300, frame: false, show: false, center: true, hasShadow: true, thickFrame: true, titleBarStyle: 'customButtonsOnHover', webPreferences: { nodeIntegration: true } })//titleBarStyle: customButtonsOnHover, 返回一个隐藏标题栏的全尺寸内容窗口

  // 然后加载应用的 index.html。
  win.loadFile('index.html')

  //在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件。在此事件后显示窗口将没有视觉闪烁
  win.once('ready-to-show', () => {
    win.show();
    //win.webContents.openDevTools()
  })

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', () => {
  createWindow();
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

//登录窗口最小化，通过ipc传递
ipcMain.on('window-min', function () {
  if (win != null) win.minimize();
})

//窗口有道词典尺寸，通过ipc传递
ipcMain.on('window-dict', function () {
  if (win != null) {
    win.setContentSize(768, 300);
    win.center();
  }
})

//窗口韦氏词典尺寸，通过ipc传递
ipcMain.on('window-englishExplains', function () {
  if (win != null) {
    win.setContentSize(768, 450);
    win.center();
  }
})

//窗口设置尺寸，通过ipc传递
ipcMain.on('window-set', function () {
  if (win != null) {
    win.setContentSize(384, 512);
    win.center();
  }
})