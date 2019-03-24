$(document).ready(function () {
    const Store = require('electron-store');
    const store = new Store();//设置数据保存
    var hideOrNot = store.get('hideOrNot');
    if (hideOrNot == 'undefined' || !hideOrNot) {
        store.set('hideOrNot', 'neverOut');
        hideOrNot = 'neverOut';
    } else if (hideOrNot == 'neverOut') {
        $("#bar").attr("id", "barNeverOut");
    }
});//设置是否要自动隐藏标题栏按钮

function minimize() {
    var ipc = require('electron').ipcRenderer;
    ipc.send('window-min');
}//最小化窗口，使用ipcRenderer方案

function newAboutWin() {
    const { BrowserWindow } = require('electron').remote;
    let aboutWin = new BrowserWindow({ width: 256, height: 320, resizable: false, frame: false, show: false, center: true, titleBarStyle: 'customButtonsOnHover' });
    aboutWin.loadFile("about.html");
    //在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件。在此事件后显示窗口将没有视觉闪烁
    aboutWin.once('ready-to-show', () => {
        aboutWin.show()
    })
}//打开关于页面