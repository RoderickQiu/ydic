const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron')
const Store = require('electron-store');
const store = new Store();//设置数据读取

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray = null

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 768, height: 300, frame: false, show: false, center: true, hasShadow: true, thickFrame: true, titleBarStyle: 'customButtonsOnHover', webPreferences: { nodeIntegration: true } })//titleBarStyle: customButtonsOnHover, 返回一个隐藏标题栏的全尺寸内容窗口

  // 然后加载应用的 index.html。
  win.loadFile('index.html')

  //在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件。在此事件后显示窗口将没有视觉闪烁
  win.once('ready-to-show', () => {
    win.show()
    //win.webContents.openDevTools()
  })

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

// 当程序就要结束
app.on('will-quit', () => {
  // 清空所有快捷键
  globalShortcut.unregisterAll()
})



// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', () => {
  createWindow()

  tray = new Tray('./res/icons/iconWin.ico')
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', click: () => { app.quit() } }
  ])
  tray.setToolTip('yDic 你的词典')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })//托盘菜单

  var hideOrShowAcc = store.get('hideOrShowAcc');
  if (hideOrShowAcc == 'undefined' || !hideOrShowAcc) {
    store.set('hideOrShowAcc', 'Y');
    hideOrShowAcc = 'Y';
  }
  globalShortcut.register('CommandOrControl+Alt+Shift+' + hideOrShowAcc, () => {
    win.isVisible() ? win.hide() : win.show()
  })//注册全局快捷键：显示/隐藏
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
  if (win != null) win.minimize()
})

//窗口有道词典尺寸，通过ipc传递
ipcMain.on('window-dict', function () {
  if (win != null) {
    win.setContentSize(768, 300)
    win.center()
  }
})

//窗口韦氏词典尺寸，通过ipc传递
ipcMain.on('window-englishExplains', function () {
  if (win != null) {
    win.setContentSize(768, 450)
    win.center()
  }
})

//返回首页
ipcMain.on('back-home', function () {
  if (win != null) {
    win.loadFile("index.html")
  }
})