// TypeScript file
namespace infinity.RES {

    var imageConfigList: imageConfig[] = [];

    var imageResourceList: imageResource[] = [];

    export type imageConfig = {
        name: string,
        url: string,
        width: number,
        height: number;
    }

    export class imageResource {

        public name: string;
        public bitmapData: HTMLImageElement;
        public url: string;
        public width: number;
        public height: number;
        public isLoaded: boolean;

        public constructor() {
            this.isLoaded = false;
        }

        public load() {
            if (this.isLoaded == true) {
                //console.log("已加载")
                return this.bitmapData;
            } else {
                var realImageResource = document.createElement("img");
                realImageResource.src = this.url;
                realImageResource.onload = () => {
                    console.log("加载中")
                    this.bitmapData = realImageResource;
                    this.isLoaded = true;
                    //return this.bitmapData;
                }
            }

        }
    }

    export function loadRes(name: string) {
        var _imageResource = getRes(name);
        _imageResource.load();
        //return _imageResource.load();
    }

    export function getRes(name: string) {
        var index: number = 0;
        for (let _imageResource of imageResourceList) {
            if (_imageResource.name == name) {
                index++;
                return _imageResource;
            } else if (index == imageResourceList.length - 1) {
                var tempImageResource = new imageResource()
                tempImageResource.name = name;
                imageResourceList.push(tempImageResource);
                console.log("没有找到相对应的图片，已生成一个空的图片代理。")
                return tempImageResource;
            }
        }
    }

    export function loadImageConfig(configList: imageConfig[]) {
        imageConfigList = configList;
        for (let _imageConfig of imageConfigList) {
            var _imageResource = new imageResource();
            _imageResource.name = _imageConfig.name;
            _imageResource.url = _imageConfig.url;
            _imageResource.width = _imageConfig.width;
            _imageResource.height = _imageConfig.height;
            imageResourceList.push(_imageResource);
        }
    }

}