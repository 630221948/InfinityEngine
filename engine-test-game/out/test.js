var _MapNodeCache = []; //地图元素数组
var imageConfigList = [];
var index = 0; //表示地图元素数组下标
var canvas = document.getElementById("app");
var stage = infinity.run(canvas); //主舞台的初始化
window.onload = function () {
    infinity.res.load("../resources/GameMap.json", function () {
        var configContent = infinity.res.get("../resources/GameMap.json");
        var configlist = JSON.parse(configContent);
        var nodeCounts = configlist["node_counts"];
        var configArray = configlist["resources"];
        console.log(configlist["node_counts"]);
        onLoadJsonResource(index, nodeCounts, configArray); //当配置文件准备好后，按其加载地图资源
    });
    infinity.res.load("../resources/PlayerWalk.json", function () {
        var configContent = infinity.res.get("../resources/PlayerWalk.json");
        var configlist = JSON.parse(configContent);
        for (var _i = 0, _a = configlist["frames"]; _i < _a.length; _i++) {
            var config = _a[_i];
            imageConfigList.push(config);
        }
        console.log(imageConfigList);
    });
    infinity.res.load("../resources/PlayerIdle.json", function () {
        var configContent = infinity.res.get("../resources/PlayerIdle.json");
        var configlist = JSON.parse(configContent);
        for (var _i = 0, _a = configlist["frames"]; _i < _a.length; _i++) {
            var config = _a[_i];
            imageConfigList.push(config);
        }
        console.log(imageConfigList);
    });
};
function onLoadJsonResource(index, nodeCounts, configArray) {
    if (index < nodeCounts) {
        infinity.res.load(configArray[index].url, function () {
            console.log("当前图片为第" + index + "张");
            _MapNodeCache[index] = new infinity.Bitmap(0, 0);
            _MapNodeCache[index].img = new infinity.RES.imageResource();
            _MapNodeCache[index].img.bitmapData = infinity.res.get(configArray[index].url);
            _MapNodeCache[index].x = configArray[index].x * nodeCounts;
            _MapNodeCache[index].y = configArray[index].y * nodeCounts;
            _MapNodeCache[index].img.url = configArray[index].url;
            console.log("当前图片位置：" + "(" + _MapNodeCache[index].x + "," + _MapNodeCache[index].y + ")");
            _MapNodeCache[index].img.isLoaded = true;
            stage.addChild(_MapNodeCache[index]);
            console.log(index);
            //////////////////////////               //当场景地图加载完成后，执行主场景中的逻辑
            if (index == nodeCounts - 1) {
                creatGameScene();
            }
            //////////////////////////
            index++;
            onLoadJsonResource(index, nodeCounts, configArray);
        });
        console.log(configArray[index].name);
    }
}
function creatGameScene() {
    console.log("Now creating the main scene");
    infinity.RES.loadImageConfig(imageConfigList);
    //创建移动动画
    var PLAYER_WALK_1 = { name: "PLAYER_WALK_1.png" };
    var PLAYER_WALK_2 = { name: "PLAYER_WALK_2.png" };
    var PLAYER_WALK_3 = { name: "PLAYER_WALK_3.png" };
    var PLAYER_WALK_4 = { name: "PLAYER_WALK_4.png" };
    var PLAYER_WALK_5 = { name: "PLAYER_WALK_5.png" };
    var PLAYER_WALK_6 = { name: "PLAYER_WALK_6.png" };
    var playerWalkData = { name: "PLAYER_WALK", totalFrame: 6, frames: [PLAYER_WALK_1, PLAYER_WALK_2, PLAYER_WALK_3, PLAYER_WALK_4, PLAYER_WALK_5, PLAYER_WALK_6] };
    var playerWalkAnim = new infinity.MovieClip(playerWalkData);
    playerWalkAnim.alpha = 0;
    //创建待机动画
    var PLAYER_IDLE_1 = { name: "PLAYER_IDLE_1.png" };
    var PLAYER_IDLE_2 = { name: "PLAYER_IDLE_2.png" };
    var PLAYER_IDLE_3 = { name: "PLAYER_IDLE_3.png" };
    var PLAYER_IDLE_4 = { name: "PLAYER_IDLE_4.png" };
    var PLAYER_IDLE_5 = { name: "PLAYER_IDLE_5.png" };
    var PLAYER_IDLE_6 = { name: "PLAYER_IDLE_6.png" };
    var PLAYER_IDLE_7 = { name: "PLAYER_IDLE_7.png" };
    var PLAYER_IDLE_8 = { name: "PLAYER_IDLE_8.png" };
    var PLAYER_IDLE_9 = { name: "PLAYER_IDLE_9.png" };
    var PLAYER_IDLE_10 = { name: "PLAYER_IDLE_10.png" };
    var PLAYER_IDLE_11 = { name: "PLAYER_IDLE_11.png" };
    var playerIdleData = { name: "PLAYER_IDLE", totalFrame: 11, frames: [PLAYER_IDLE_1, PLAYER_IDLE_2, PLAYER_IDLE_3, PLAYER_IDLE_4, PLAYER_IDLE_5, PLAYER_IDLE_6, PLAYER_IDLE_7, PLAYER_IDLE_8, PLAYER_IDLE_9, PLAYER_IDLE_10, PLAYER_IDLE_11] };
    var playerIdleAnim = new infinity.MovieClip(playerIdleData);
    playerIdleAnim.alpha = 0;
    // var bitmap = new infinity.Bitmap(10, 10);
    // bitmap.img = infinity.RES.getRes("PLAYER_WALK_1.png");
    // infinity.RES.loadRes("PLAYER_WALK_1.png")
    var playerContainer = new infinity.DisplayObjectContainer();
    playerContainer.addChild(playerWalkAnim);
    playerContainer.addChild(playerIdleAnim);
    stage.addChild(playerContainer);
    var speed = 10;
    var gridMap = new GridMap(_MapNodeCache);
    console.log(gridMap.config);
    ///////////////////////////////////////////////////////
    var m = new StateMachine(stage, playerIdleAnim, playerContainer, playerWalkAnim);
    stage.addEventListener(infinity.TouchingEventType.MOUSE_DOWN, function (e) {
        console.log(e.x);
        var astar = new AStar(gridMap);
        var MaxLength = 0;
        var RatioX;
        var RatioY;
        var nodeCounts = gridMap.getNodeCounts();
        var endXPos = Math.floor(e.offsetX / nodeCounts); //终点的x和y值（行和列数）
        var endYPos = Math.floor(e.offsetY / nodeCounts);
        var startXPos = Math.floor(m.PlayerContainer.x / nodeCounts); //起点的x和y值（行和列数）
        var startYPos = Math.floor(m.PlayerContainer.y / nodeCounts);
        console.log("起始坐标：(" + startXPos + "," + startYPos + ")");
        console.log("终点坐标：(" + endXPos + "," + endYPos + ")");
        if (astar.findPath(gridMap.getNode(startXPos, startYPos), gridMap.getNode(endXPos, endYPos))) {
            astar._path.map(function (tile) {
                console.log("x:" + tile.x + ",y:" + tile.y);
            });
        }
        var pathLength = astar._path.length;
        var i = 0;
        m.timeOnEnterFrame = Math.floor(Date.now());
        var pos = astar._path.shift();
        m.setState("move");
        infinity.Ticker.getInstance().register(moveFunction);
        function moveFunction() {
            console.log("============开始移动===========");
            m.x = pos.x * nodeCounts;
            m.y = pos.y * nodeCounts;
            var dx = m.x - m.PlayerContainer.x;
            var dy = m.y - m.PlayerContainer.y;
            MaxLength = Math.pow(dx * dx + dy * dy, 1 / 2);
            if (MaxLength == 0) {
                RatioX = 0;
                RatioY = 0;
            }
            else {
                RatioX = dx / MaxLength;
                RatioY = dy / MaxLength;
            }
            m.RatioX = RatioX;
            m.RatioY = RatioY;
            var now = Math.floor(Date.now());
            var time = m.timeOnEnterFrame;
            var pass = now - time;
            var speed = 0.3;
            //console.log("Ratio=============="+m.RatioX);
            m.PlayerContainer.x += speed * pass * m.RatioX;
            m.PlayerContainer.y += speed * pass * m.RatioY;
            console.log("ContainerCoordinate==============" + m.PlayerContainer.x);
            console.log("TargetCoordinate==============" + m.x);
            m.timeOnEnterFrame = Math.floor(Date.now());
            //console.log(now);
            //console.log(time);
            if (m.PlayerContainer.y - m.y < 6 && m.PlayerContainer.y - m.y > -6 &&
                m.PlayerContainer.x - m.x < 6 && m.PlayerContainer.x - m.x > -6) {
                console.log("Im IN!!!!");
                if (astar._path.length == 0) {
                    infinity.Ticker.getInstance().unregister(moveFunction);
                    //m.PlayerContainer.x = m.x;
                    //m.PlayerContainer.y = m.y;
                    m.setState("stand");
                    console.log("已删除心跳");
                    console.log(infinity.Ticker.getInstance().listeners);
                }
                else {
                    pos = astar._path.shift();
                }
            }
            return false;
            //console.log("ContainerCoordinate=============="+this.mac.PlayerContainer.x);
            //console.log("TargetCoordinate=============="+this.mac.x);        
        }
    });
}
