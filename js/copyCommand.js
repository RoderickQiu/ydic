function copySuccess() {
    var copySuccessAlert = document.createElement("span");
    document.getElementById("body").appendChild(copySuccessAlert);
    copySuccessAlert.innerText = "复制成功";
    copySuccessAlert.id = "copySuccessAlert";
    copySuccessAlert.animate([
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 }
    ],
        {
            duration: 1000,
            iterations: 2
        });//动画
    setTimeout(function () { copySuccessAlert.parentElement.removeChild(copySuccessAlert); }, 1000);//当动画播完后，销毁物体

}

document.onmouseup = function () {
    if (window.getSelection() != "" && window.getSelection() != " ") {
        if (document.execCommand("Copy")) {
            copySuccess();//如果成功复制，显示弹窗
        }
    }
};