const fnTextPopup = () => {
    var arr = new Array("sakura", "嘤", "嘤嘤", "嘤嘤嘤", "嘤嘤嘤嘤")
    var index = 0

    return (
        <div>
            <script>
                var fnTextPopup = function () {
                    // arr参数是必须的

                    document.documentElement.addEventListener('click', function (event) {
                        var x = event.pageX, y = event.pageY;
                        var eleText = document.createElement('span');
                        eleText.className = 'text-popup';
                        this.appendChild(eleText);
                        if (arr[index]) {
                            eleText.innerHTML = arr[index];
                        } else {
                            index = 0;
                            eleText.innerHTML = arr[0];
                        }
                        // 动画结束后删除自己
                        eleText.addEventListener('animationend', function () {
                            eleText.parentNode.removeChild(eleText);
                        });
                        // 位置
                        eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
                        eleText.style.top = (y - eleText.clientHeight) + 'px';
                        // index递增
                        index++;
                    })
                };
            </script>
        </div>
    )
}


export default fnTextPopup