// TypeScript file

namespace infinity {

    export class Bitmap extends DisplayObject {
        // public img: HTMLImageElement;
        public img: RES.imageResource;
        //public isLoaded = false;
        public scaleX = 1;
        public scaleY = 1;

        constructor(x, y) {
            super();
            this.type = "Bitmap"
            this.x = x;
            this.y = y;
            //this.img = document.createElement('img');
        }

        public hitTest(x, y) {
            var rect = new math.Rectangle(0, 0, 332, 208)                    //以矩形为坐标系进行判断，原点应为0，0
            var point = new math.Point(x, y);
            var invertMatrix = math.invertMatrix(this.localMatrix);
            var pointBaseOnThis = math.pointAppendMatrix(point, invertMatrix);
            var resultPoint = rect.isPointInRectangle(pointBaseOnThis);
            if (resultPoint) {
                return this;
            } else {
                return null;
            }
        }
    }

    export type MovieClipData = {

        name: string,
        totalFrame:number,
        frames: MovieClipFrameData[]
    }

    export type MovieClipFrameData = {
        "name": string;
    }

    export class MovieClip extends Bitmap {

        private advancedTime: number = 0;

        private static FRAME_TIME = 70;

        private TOTAL_FRAME = 0;

        private currentFrameIndex: number;

        private data: MovieClipData;

        constructor(data: MovieClipData) {
            super(0, 0);
            this.TOTAL_FRAME = data.totalFrame;
            this.setMovieClipData(data);
            this.play();
        }

        ticker = (deltaTime) => {
            // this.removeChild();
            this.advancedTime += deltaTime;
            if (this.advancedTime >= MovieClip.FRAME_TIME * this.TOTAL_FRAME) {
                this.advancedTime -= MovieClip.FRAME_TIME * this.TOTAL_FRAME;
            }
            this.currentFrameIndex = Math.floor(this.advancedTime / MovieClip.FRAME_TIME);

            //console.log("当前为第" + this.currentFrameIndex + "帧");
            // if (this.currentFrameIndex > MovieClip.TOTAL_FRAME - 1) {
            //     this.currentFrameIndex = 0;
            // }

            let data = this.data;

            let frameData = data.frames[this.currentFrameIndex];
            this.img = infinity.RES.getRes(frameData.name);
            infinity.RES.loadRes(frameData.name);

        }

        play() {
            Ticker.getInstance().register(this.ticker);
        }

        stop() {
            Ticker.getInstance().unregister(this.ticker)
        }

        setMovieClipData(data: MovieClipData) {
            this.data = data;
            this.currentFrameIndex = 0;
            // 创建 / 更新 

        }
    }
}