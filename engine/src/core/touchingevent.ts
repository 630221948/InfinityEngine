// TypeScript file

class TouchingEvent {

    public touchingEventType: infinity.TouchingEventType;

    public react: (e?: MouseEvent) => void;

    public useCapture: boolean = false;

    constructor(touchingEvent: infinity.TouchingEventType, react: (e?: MouseEvent) => void, useCapture?: boolean) {
        this.touchingEventType = touchingEvent;
        this.react = react;
        if (useCapture) {
            this.useCapture = useCapture;
        }
    }

}

namespace infinity {

    export enum TouchingEventType {
        MOUSE_DOWN = 0,
        MOUSE_UP = 1,
        MOUSE_CLICK = 3,
        MOUSE_MOVE = 2
    }

}
