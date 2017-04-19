var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var infinity;
(function (infinity) {
    var RES;
    (function (RES) {
        var imageConfigList = [];
        var imageResourceList = [];
        var imageResource = (function () {
            function imageResource() {
                this.isLoaded = false;
            }
            imageResource.prototype.load = function () {
                var _this = this;
                if (this.isLoaded == true) {
                    //console.log("已加载")
                    return this.bitmapData;
                }
                else {
                    var realImageResource = document.createElement("img");
                    realImageResource.src = this.url;
                    realImageResource.onload = function () {
                        console.log("加载中");
                        _this.bitmapData = realImageResource;
                        _this.isLoaded = true;
                        //return this.bitmapData;
                    };
                }
            };
            return imageResource;
        }());
        RES.imageResource = imageResource;
        function loadRes(name) {
            var _imageResource = getRes(name);
            _imageResource.load();
            //return _imageResource.load();
        }
        RES.loadRes = loadRes;
        function getRes(name) {
            var index = 0;
            for (var _i = 0, imageResourceList_1 = imageResourceList; _i < imageResourceList_1.length; _i++) {
                var _imageResource = imageResourceList_1[_i];
                if (_imageResource.name == name) {
                    index++;
                    return _imageResource;
                }
                else if (index == imageResourceList.length - 1) {
                    var tempImageResource = new imageResource();
                    tempImageResource.name = name;
                    imageResourceList.push(tempImageResource);
                    console.log("没有找到相对应的图片，已生成一个空的图片代理。");
                    return tempImageResource;
                }
            }
        }
        RES.getRes = getRes;
        function loadImageConfig(configList) {
            imageConfigList = configList;
            for (var _i = 0, imageConfigList_1 = imageConfigList; _i < imageConfigList_1.length; _i++) {
                var _imageConfig = imageConfigList_1[_i];
                var _imageResource = new imageResource();
                _imageResource.name = _imageConfig.name;
                _imageResource.url = _imageConfig.url;
                _imageResource.width = _imageConfig.width;
                _imageResource.height = _imageConfig.height;
                imageResourceList.push(_imageResource);
            }
        }
        RES.loadImageConfig = loadImageConfig;
    })(RES = infinity.RES || (infinity.RES = {}));
})(infinity || (infinity = {}));
var infinity;
(function (infinity) {
    var res;
    (function (res) {
        res.imageConfigList = [];
        var ImageProcessor = (function () {
            function ImageProcessor() {
            }
            ImageProcessor.prototype.load = function (url, callback) {
                var image = document.createElement("img");
                image.src = url;
                image.onload = function () {
                    console.log(image.src);
                    callback(image);
                };
            };
            return ImageProcessor;
        }());
        res.ImageProcessor = ImageProcessor;
        var TextProcessor = (function () {
            function TextProcessor() {
            }
            TextProcessor.prototype.load = function (url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open("get", url);
                xhr.send();
                xhr.onload = function () {
                    callback(xhr.responseText);
                };
            };
            return TextProcessor;
        }());
        res.TextProcessor = TextProcessor;
        var cache = {};
        function load(url, callback) {
            var type = getTypeByUrl(url);
            var processor = createProcessorByType(type);
            if (processor != null) {
                processor.load(url, function (data) {
                    cache[url] = data;
                    callback(data);
                });
            }
        }
        res.load = load;
        function get(url) {
            return cache[url];
        }
        res.get = get;
        var getTypeByUrl = function (url) {
            if (url.indexOf(".png") >= 0) {
                return "image";
            }
            else if (url.indexOf(".jpg") >= 0) {
                return "image";
            }
            else if (url.indexOf(".mp3") >= 0) {
                return "sound";
            }
            else if (url.indexOf(".json") >= 0) {
                return "text";
            }
        };
        function createProcessorByType(type) {
            var processor = hashMap[type];
            return processor;
        }
        var hashMap = {
            //"sound": new SoundProcessor(),
            "image": new ImageProcessor(),
            "text": new TextProcessor()
        };
    })(res = infinity.res || (infinity.res = {}));
})(infinity || (infinity = {}));
// TypeScript file
// TypeScript file
var DisplayObject = (function () {
    // public abstract drawIt(context: CanvasRenderingContext2D);
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.globalAlpha = 1;
        this.alpha = 1;
        this.childrenList = [];
        this.localEventList = [];
        this.touchEnable = false;
        this.globalMatrix = new math.Matrix();
        this.localMatrix = new math.Matrix();
        console.log("已创建显示对象");
    }
    ;
    // public getGlobalMatrix() {
    //     return this.globalMatrix
    // }
    // public get localMatrix() {                                                                 //控制平移旋转
    //     var tempMatrix = new math.Matrix();
    //     tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
    //     return tempMatrix;
    // }
    DisplayObject.prototype.update = function () {
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            //console.log('not a root!')
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        }
        else {
            //console.log('a root');
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, new math.Matrix(1, 0, 0, 1, 0, 0));
        }
        if (this.parent) {
            this.globalAlpha = this.alpha * this.parent.globalAlpha;
        }
        else {
            this.globalAlpha = this.alpha;
        }
    };
    DisplayObject.prototype.addEventListener = function (touchingEventType, react, useCapture) {
        var listener;
        if (useCapture) {
            listener = new TouchingEvent(touchingEventType, react, useCapture);
        }
        else {
            listener = new TouchingEvent(touchingEventType, react);
        }
        this.localEventList.push(listener);
    };
    DisplayObject.prototype.removeEventListener = function () {
    };
    DisplayObject.prototype.dispatchEvent = function (touchingEventType) {
        for (var i = 0; i < this.localEventList.length; i++) {
            if (touchingEventType == this.localEventList[i].touchingEventType) {
                if (this.localEventList[i].useCapture) {
                    EventController.getInstance().toDoEventList.unshift(this.localEventList[i]);
                }
                else {
                    EventController.getInstance().toDoEventList.push(this.localEventList[i]);
                }
            }
        }
    };
    return DisplayObject;
}());
// TypeScript file
var infinity;
(function (infinity) {
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(x, y) {
            var _this = _super.call(this) || this;
            //public isLoaded = false;
            _this.scaleX = 1;
            _this.scaleY = 1;
            _this.type = "Bitmap";
            _this.x = x;
            _this.y = y;
            return _this;
            //this.img = document.createElement('img');
        }
        Bitmap.prototype.hitTest = function (x, y) {
            var rect = new math.Rectangle(0, 0, 332, 208); //以矩形为坐标系进行判断，原点应为0，0
            var point = new math.Point(x, y);
            var invertMatrix = math.invertMatrix(this.localMatrix);
            var pointBaseOnThis = math.pointAppendMatrix(point, invertMatrix);
            var resultPoint = rect.isPointInRectangle(pointBaseOnThis);
            if (resultPoint) {
                return this;
            }
            else {
                return null;
            }
        };
        return Bitmap;
    }(DisplayObject));
    infinity.Bitmap = Bitmap;
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(data) {
            var _this = _super.call(this, 0, 0) || this;
            _this.advancedTime = 0;
            _this.TOTAL_FRAME = 0;
            _this.ticker = function (deltaTime) {
                // this.removeChild();
                _this.advancedTime += deltaTime;
                if (_this.advancedTime >= MovieClip.FRAME_TIME * _this.TOTAL_FRAME) {
                    _this.advancedTime -= MovieClip.FRAME_TIME * _this.TOTAL_FRAME;
                }
                _this.currentFrameIndex = Math.floor(_this.advancedTime / MovieClip.FRAME_TIME);
                //console.log("当前为第" + this.currentFrameIndex + "帧");
                // if (this.currentFrameIndex > MovieClip.TOTAL_FRAME - 1) {
                //     this.currentFrameIndex = 0;
                // }
                var data = _this.data;
                var frameData = data.frames[_this.currentFrameIndex];
                _this.img = infinity.RES.getRes(frameData.name);
                infinity.RES.loadRes(frameData.name);
            };
            _this.TOTAL_FRAME = data.totalFrame;
            _this.setMovieClipData(data);
            _this.play();
            return _this;
        }
        MovieClip.prototype.play = function () {
            infinity.Ticker.getInstance().register(this.ticker);
        };
        MovieClip.prototype.stop = function () {
            infinity.Ticker.getInstance().unregister(this.ticker);
        };
        MovieClip.prototype.setMovieClipData = function (data) {
            this.data = data;
            this.currentFrameIndex = 0;
            // 创建 / 更新 
        };
        return MovieClip;
    }(Bitmap));
    MovieClip.FRAME_TIME = 70;
    infinity.MovieClip = MovieClip;
})(infinity || (infinity = {}));
// TypeScript file
var infinity;
(function (infinity) {
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField(content, x, y) {
            var _this = _super.call(this) || this;
            _this.type = "TextField";
            _this.content = content;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        // public drawIt(context: CanvasRenderingContext2D) {
        //     this.globalAlpha = this.parent.globalAlpha * this.alpha;
        //     this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        //     context.globalAlpha = this.globalAlpha * this.alpha;
        //     context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        //     context.fillText(this.content, 0, 0);
        // }
        TextField.prototype.hitTest = function (x, y) {
            return this;
        };
        return TextField;
    }(DisplayObject));
    infinity.TextField = TextField;
})(infinity || (infinity = {}));
// TypeScript file
var infinity;
(function (infinity) {
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            var _this = _super.call(this) || this;
            _this.type = "DisplayObjectContainer";
            return _this;
            //this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
        }
        // public getGlobalMatrix() {                                    ///////////////////////////////////
        //     if (this.parent) {
        //         //console.log('not a root!')
        //         return math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        //     } else {
        //         //console.log('a root');
        //         return math.matrixAppendMatrix(this.localMatrix, new math.Matrix(1, 0, 0, 1, 0, 0));
        //     }
        // }
        DisplayObjectContainer.prototype.addChild = function (displayObject) {
            displayObject.parent = this;
            this.childrenList.push(displayObject);
        };
        // public drawIt(context: CanvasRenderingContext2D) {
        //     for (var a of this.childrenList) {
        //         a.drawIt(context);
        //     }
        // }
        DisplayObjectContainer.prototype.update = function () {
            _super.prototype.update.call(this);
            for (var _i = 0, _a = this.childrenList; _i < _a.length; _i++) {
                var child = _a[_i];
                child.update();
            }
        };
        DisplayObjectContainer.prototype.hitTest = function (x, y) {
            for (var i = this.childrenList.length - 1; i >= 0; i--) {
                var child = this.childrenList[i];
                var point = new math.Point(x, y);
                var invertMatrix = math.invertMatrix(this.localMatrix);
                var pointBaseOnThis = math.pointAppendMatrix(point, invertMatrix);
                var hitTestResult = child.hitTest(pointBaseOnThis.x, pointBaseOnThis.y);
                if (hitTestResult) {
                    return hitTestResult;
                }
            }
            return null;
        };
        return DisplayObjectContainer;
    }(DisplayObject));
    infinity.DisplayObjectContainer = DisplayObjectContainer;
})(infinity || (infinity = {}));
// TypeScript file
var EventController = (function () {
    function EventController() {
        this.eventDispacherList = [];
        this.toDoEventList = [];
    }
    EventController.getInstance = function () {
        if (!EventController.instance) {
            EventController.instance = new EventController();
        }
        return EventController.instance;
    };
    EventController.prototype.executeEvent = function (e) {
        for (var _i = 0, _a = EventController.getInstance().toDoEventList; _i < _a.length; _i++) {
            var i = _a[_i];
            i.react(e);
        }
        EventController.getInstance().toDoEventList = [];
    };
    return EventController;
}());
// TypeScript file
var TouchingEvent = (function () {
    function TouchingEvent(touchingEvent, react, useCapture) {
        this.useCapture = false;
        this.touchingEventType = touchingEvent;
        this.react = react;
        if (useCapture) {
            this.useCapture = useCapture;
        }
    }
    return TouchingEvent;
}());
var infinity;
(function (infinity) {
    var TouchingEventType;
    (function (TouchingEventType) {
        TouchingEventType[TouchingEventType["MOUSE_DOWN"] = 0] = "MOUSE_DOWN";
        TouchingEventType[TouchingEventType["MOUSE_UP"] = 1] = "MOUSE_UP";
        TouchingEventType[TouchingEventType["MOUSE_CLICK"] = 3] = "MOUSE_CLICK";
        TouchingEventType[TouchingEventType["MOUSE_MOVE"] = 2] = "MOUSE_MOVE";
    })(TouchingEventType = infinity.TouchingEventType || (infinity.TouchingEventType = {}));
})(infinity || (infinity = {}));
var math;
(function (math) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    math.Point = Point;
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rectangle.prototype.isPointInRectangle = function (point) {
            if (point.x - this.x <= this.width &&
                point.y - this.y <= this.height &&
                point.x >= this.x && point.y >= this.y) {
                return point;
            }
            else {
                return null;
            }
        };
        return Rectangle;
    }());
    math.Rectangle = Rectangle;
    function isPointInRectangle(point, rectangle) {
    }
    math.isPointInRectangle = isPointInRectangle;
    function pointAppendMatrix(point, m) {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);
    }
    math.pointAppendMatrix = pointAppendMatrix;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m) {
        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;
        var determinant = a * d - b * c;
        var result = new Matrix(1, 0, 0, 1, 0, 0);
        if (determinant == 0) {
            throw new Error("no invert");
        }
        determinant = 1 / determinant;
        var k = result.a = d * determinant;
        b = result.b = -b * determinant;
        c = result.c = -c * determinant;
        d = result.d = a * determinant;
        result.tx = -(k * tx + c * ty);
        result.ty = -(b * tx + d * ty);
        return result;
    }
    math.invertMatrix = invertMatrix;
    function matrixAppendMatrix(m1, m2) {
        var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }
    math.matrixAppendMatrix = matrixAppendMatrix;
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    var Matrix = (function () {
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
            this.tx = x;
            this.ty = y;
            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;
            var u = Math.cos(skewX);
            var v = Math.sin(skewX);
            this.a = Math.cos(skewY) * scaleX;
            this.b = Math.sin(skewY) * scaleX;
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        return Matrix;
    }());
    math.Matrix = Matrix;
})(math || (math = {}));
// TypeScript file
var infinity;
(function (infinity) {
    var Ticker = (function () {
        function Ticker() {
            this.listeners = [];
        }
        Ticker.getInstance = function () {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        };
        Ticker.prototype.register = function (listener) {
            this.listeners.push(listener);
        };
        Ticker.prototype.unregister = function (listener) {
            var tempListeners = this.listeners;
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var currentListener = _a[_i];
                if (currentListener == listener) {
                    var currentListenerIndex = this.listeners.indexOf(currentListener);
                    tempListeners = this.listeners.slice(0, currentListenerIndex);
                    break;
                }
            }
            this.listeners = tempListeners;
        };
        Ticker.prototype.notify = function (deltaTime) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(deltaTime);
            }
        };
        return Ticker;
    }());
    infinity.Ticker = Ticker;
})(infinity || (infinity = {}));
// TypeScript file
var infinity;
(function (infinity) {
    infinity.run = function (canvas) {
        var stage = new infinity.DisplayObjectContainer();
        var context2D = canvas.getContext("2d");
        var renderer = new CanvasRenderer(stage, context2D);
        var lastNow = Date.now();
        var frameHandler = function () {
            var now = Date.now();
            var deltaTime = now - lastNow;
            infinity.Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            //context2D.save();
            //stage.drawIt(context2D);
            stage.update();
            renderer.render();
            //context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        };
        window.requestAnimationFrame(frameHandler);
        var react = function (e, touchingEventType) {
            var x = e.offsetX;
            var y = e.offsetY;
            var target = stage.hitTest(x, y);
            var currentTarget = target;
            var testToDoEventList = [];
            if (currentTarget) {
                currentTarget.dispatchEvent(touchingEventType);
                while (currentTarget.parent) {
                    currentTarget = currentTarget.parent;
                    currentTarget.dispatchEvent(touchingEventType);
                }
                EventController.getInstance().executeEvent(e);
                testToDoEventList = EventController.getInstance().toDoEventList;
            }
            else {
                console.log("Nothings Touched!");
            }
        };
        window.onmousedown = function (e) {
            react(e, infinity.TouchingEventType.MOUSE_DOWN);
            console.log(e.offsetX + "    " + e.offsetY);
            // stage.hitTest(100, 100);
        };
        return stage;
    };
    var CanvasRenderer = (function () {
        function CanvasRenderer(stage, context2D) {
            this.stage = stage;
            this.context2D = context2D;
        }
        CanvasRenderer.prototype.render = function () {
            var stage = this.stage;
            var context2D = this.context2D;
            this.renderContainer(stage);
        };
        CanvasRenderer.prototype.renderContainer = function (stage) {
            for (var _i = 0, _a = stage.childrenList; _i < _a.length; _i++) {
                var child = _a[_i];
                this.context2D.globalAlpha = child.globalAlpha;
                var m = child.globalMatrix;
                this.context2D.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                if (child.type == "DisplayObjectContainer") {
                    this.renderContainer(child);
                }
                else if (child.type == "Bitmap") {
                    this.renderBitmap(child);
                }
                else if (child.type == "TextField") {
                    this.renderTextField(child);
                }
            }
        };
        CanvasRenderer.prototype.renderBitmap = function (bitmap) {
            // if (bitmap.isLoaded == true) {
            //     console.log("已加载")
            //     this.context2D.drawImage(bitmap.img, 0, 0);
            // } else {
            //     // bitmap.img.src = 'Bitmap.jpg'///////////////////////
            //     bitmap.img.onload = () => {
            //         console.log("加载中")
            //         this.context2D.drawImage(bitmap.img, 0, 0);
            //         bitmap.isLoaded = true;
            //     }
            // }
            if (bitmap.img.isLoaded == true) {
                this.context2D.drawImage(bitmap.img.bitmapData, 0, 0);
            }
        };
        CanvasRenderer.prototype.renderTextField = function (textField) {
            this.context2D.fillText(textField.content, 0, 0);
        };
        return CanvasRenderer;
    }());
})(infinity || (infinity = {}));
