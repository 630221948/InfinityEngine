// TypeScript file
class GridMap {

    public config = [];
    private nodeCounts: number = 100;
    private stage: any;
    public column: number = 10;
    public row: number = 10;

    public constructor(mapNodeArray: infinity.Bitmap[]) {

        for (var i = 0; i < mapNodeArray.length; i++) {
            var x = mapNodeArray[i].x / this.nodeCounts;
            var y = mapNodeArray[i].y / this.nodeCounts;
            console.log(mapNodeArray[i]);
            if (mapNodeArray[i].img.url == "../resources/Road.png") {
                var node: MapNode = new MapNode(x, y, true);
                this.config.push(node);
            } else {
                var node: MapNode = new MapNode(x, y, false);
                this.config.push(node);
            }

        }


        // this.config = [

        // 	//第一行
        // 	{ node: new MapNode(0, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(1, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 0, false), image: "Wall_png" },
        // 	{ node: new MapNode(3, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(5, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(6, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(8, 0, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 0, true), image: "Road_png" },

        // 	//第二行
        // 	{ node: new MapNode(0, 1, false), image: "Wall_png" },
        // 	{ node: new MapNode(1, 1, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 1, false), image: "Wall_png" },
        // 	{ node: new MapNode(3, 1, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 1, false), image: "Wall_png" },
        // 	{ node: new MapNode(5, 1, false), image: "Wall_png" },
        // 	{ node: new MapNode(6, 1, false), image: "Wall_png" },
        // 	{ node: new MapNode(7, 1, false), image: "Wall_png" },
        // 	{ node: new MapNode(8, 1, false), image: "Wall_png" },
        // 	{ node: new MapNode(9, 1, true), image: "Road_png" },

        // 	//第三行
        // 	{ node: new MapNode(0, 2, false), image: "Wall_png" },
        // 	{ node: new MapNode(1, 2, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 2, false), image: "Wall_png" },
        // 	{ node: new MapNode(3, 2, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 2, true), image: "Road_png" },
        // 	{ node: new MapNode(5, 2, true), image: "Road_png" },
        // 	{ node: new MapNode(6, 2, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 2, true), image: "Road_png" },
        // 	{ node: new MapNode(8, 2, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 2, true), image: "Road_png" },

        // 	//第四行
        // 	{ node: new MapNode(0, 3, false), image: "Wall_png" },
        // 	{ node: new MapNode(1, 3, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 3, false), image: "Wall_png" },
        // 	{ node: new MapNode(3, 3, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 3, true), image: "Road_png" },
        // 	{ node: new MapNode(5, 3, false), image: "Wall_png" },
        // 	{ node: new MapNode(6, 3, false), image: "Wall_png" },
        // 	{ node: new MapNode(7, 3, false), image: "Wall_png" },
        // 	{ node: new MapNode(8, 3, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 3, true), image: "Road_png" },

        // 	//第五行
        // 	{ node: new MapNode(0, 4, false), image: "Wall_png" },
        // 	{ node: new MapNode(1, 4, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 4, false), image: "Wall_png" },
        // 	{ node: new MapNode(3, 4, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 4, true), image: "Road_png" },
        // 	{ node: new MapNode(5, 4, true), image: "Road_png" },
        // 	{ node: new MapNode(6, 4, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 4, false), image: "Wall_png" },
        // 	{ node: new MapNode(8, 4, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 4, false), image: "Wall_png" },

        // 	//第六行
        // 	{ node: new MapNode(0, 5, false), image: "Wall_png" },
        // 	{ node: new MapNode(1, 5, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 5, false), image: "Wall_png" },
        // 	{ node: new MapNode(3, 5, false), image: "Wall_png" },
        // 	{ node: new MapNode(4, 5, false), image: "Wall_png" },
        // 	{ node: new MapNode(5, 5, true), image: "Road_png" },
        // 	{ node: new MapNode(6, 5, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 5, false), image: "Wall_png" },
        // 	{ node: new MapNode(8, 5, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 5, false), image: "Wall_png" },

        // 	//第七行
        // 	{ node: new MapNode(0, 6, false), image: "Wall_png" },
        // 	{ node: new MapNode(1, 6, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 6, true), image: "Road_png" },
        // 	{ node: new MapNode(3, 6, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 6, true), image: "Road_png" },
        // 	{ node: new MapNode(5, 6, true), image: "Road_png" },
        // 	{ node: new MapNode(6, 6, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 6, false), image: "Wall_png" },
        // 	{ node: new MapNode(8, 6, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 6, false), image: "Wall_png" },

        // 	//第八行
        // 	{ node: new MapNode(0, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(1, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(3, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(5, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(6, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 7, false), image: "Wall_png" },
        // 	{ node: new MapNode(8, 7, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 7, true), image: "Road_png" },
        // 	//第九行
        // 	{ node: new MapNode(0, 8, true), image: "Road_png" },
        // 	{ node: new MapNode(1, 8, false), image: "Wall_png" },
        // 	{ node: new MapNode(2, 8, false), image: "Wall_png" },
        // 	{ node: new MapNode(3, 8, false), image: "Wall_png" },
        // 	{ node: new MapNode(4, 8, false), image: "Wall_png" },
        // 	{ node: new MapNode(5, 8, false), image: "Wall_png" },
        // 	{ node: new MapNode(6, 8, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 8, false), image: "Wall_png" },
        // 	{ node: new MapNode(8, 8, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 8, true), image: "Road_png" },

        // 	//第十行
        // 	{ node: new MapNode(0, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(1, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(2, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(3, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(4, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(5, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(6, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(7, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(8, 9, true), image: "Road_png" },
        // 	{ node: new MapNode(9, 9, true), image: "Road_png" },

        // ]

        // this.stage = stage;
        // var container = new infinity.DisplayObjectContainer();
        // for (var i = 0; i < this.config.length; i++) {
        //     var tile = this.config[i];
        //     var bitmap = new infinity.Bitmap(0,0);
        //     bitmap.texture = RES.getRes(tile.image);
        //     bitmap.x = tile.node.x * this.nodeCounts;
        //     bitmap.y = tile.node.y * this.nodeCounts;
        //     bitmap.touchEnabled = tile.node.walkable;            ///////////////////////////
        //     this.stage.addChild(bitmap);
        // }

    }


    public getNodeCounts(): number {

        return this.nodeCounts

    }


    public getNode(x: number, y: number): MapNode {
        var result: MapNode = this.config[y * this.row + x];
        return result;
    }


}