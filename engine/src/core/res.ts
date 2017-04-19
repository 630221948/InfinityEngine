namespace infinity.res {

	export var imageConfigList: ImageConfig[] = [];

	export type ImageConfig = {
		name: string;
		url: string;
		x:number;
		y:number;
	};

	export interface Processor {
		load(url: string, callback: Function): void;
	}

	export class ImageProcessor implements Processor {

		load(url: string, callback: Function) {
			var image = document.createElement("img");
			image.src = url;
			image.onload = () => {
				console.log(image.src);
				callback(image);
			}
		}

	}

	export class TextProcessor implements Processor {

		load(url: string, callback: (data: any) => void) {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.send();
			xhr.onload = () => {
				callback(xhr.responseText);
			}
		}

	}

	var cache = {};

	export function load(url: string, callback: (data: any) => void) {

		var type = getTypeByUrl(url);
		var processor = createProcessorByType(type);
		if (processor != null) {
			processor.load(url, (data) => {
				cache[url] = data;
				callback(data);
			})
		}

	}

	export function get(url: string): any {
		return cache[url];
	}

	var getTypeByUrl = (url: string): string => {

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

	}

	function createProcessorByType(type: string) {
		var processor: Processor = hashMap[type];
		return processor;
	}

	let hashMap = {
		//"sound": new SoundProcessor(),
		"image": new ImageProcessor(),
		"text": new TextProcessor()
	}

}