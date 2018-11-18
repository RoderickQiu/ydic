function minimize() {
    var ipc = require('electron').ipcRenderer;
    ipc.send('window-min');
}//最小化窗口，使用ipcRenderer方案

function newAboutWin() {
    const { BrowserWindow } = require('electron').remote;
    let aboutWin = new BrowserWindow({ width: 256, height: 256, resizable: false, frame: false, show: false, center: true, titleBarStyle: 'customButtonsOnHover'});
    aboutWin.loadFile("about.html");
    //在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件。在此事件后显示窗口将没有视觉闪烁
    aboutWin.once('ready-to-show', () => {
        aboutWin.show()
    })
}//打开关于页面