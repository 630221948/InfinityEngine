// TypeScript file
namespace infinity {
    export var run = (canvas: HTMLCanvasElement) => {

        var stage = new DisplayObjectContainer();
        var context2D = canvas.getContext("2d");
        var renderer = new CanvasRenderer(stage, context2D);
        var lastNow = Date.now();
        var frameHandler = () => {
            var now = Date.now();
            var deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            //context2D.save();
            //stage.drawIt(context2D);
            stage.update();
            renderer.render();
            //context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        }

        window.requestAnimationFrame(frameHandler);

        var react = (e: MouseEvent, touchingEventType: TouchingEventType) => {
            var x = e.offsetX;
            var y = e.offsetY;
            var target = stage.hitTest(x, y);
            var currentTarget = target;
            var testToDoEventList: TouchingEvent[] = [];

            if (currentTarget) {
                currentTarget.dispatchEvent(touchingEventType);
                while (currentTarget.parent) {
                    currentTarget = currentTarget.parent;
                    currentTarget.dispatchEvent(touchingEventType);
                }
                EventController.getInstance().executeEvent(e);
                testToDoEventList = EventController.getInstance().toDoEventList;
            } else {
                console.log("Nothings Touched!")
            }
        }

        window.onmousedown = (e) => {
            react(e, TouchingEventType.MOUSE_DOWN);
            console.log(e.offsetX + "    " + e.offsetY)
            // stage.hitTest(100, 100);
        }

        return stage;

    }

    class CanvasRenderer {

        constructor(private stage: DisplayObjectContainer, private context2D: CanvasRenderingContext2D) {

        }

        render() {
            var stage = this.stage;
            var context2D = this.context2D;
            this.renderContainer(stage);
        }

        renderContainer(stage: DisplayObjectContainer) {
            for (var child of stage.childrenList) {

                this.context2D.globalAlpha = child.globalAlpha;
                var m = child.globalMatrix;
                this.context2D.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                if (child.type == "DisplayObjectContainer") {
                    this.renderContainer(child as DisplayObjectContainer);
                } else if (child.type == "Bitmap") {
                    this.renderBitmap(child as Bitmap);
                } else if (child.type == "TextField") {
                    this.renderTextField(child as TextField);
                }
            }
        }

        renderBitmap(bitmap: Bitmap) {
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

        }

        renderTextField(textField: TextField) {
            this.context2D.fillText(textField.content, 0, 0);
        }

    }


}