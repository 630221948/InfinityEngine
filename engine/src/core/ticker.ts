// TypeScript file
namespace infinity {

    export type Ticker_Listener_Type = (deltaTime: number) => void;

    export class Ticker {

        private static instance: Ticker;

        static getInstance() {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        }

        listeners: Ticker_Listener_Type[] = [];

        register(listener: Ticker_Listener_Type) {
            this.listeners.push(listener);
        }

        unregister(listener: Ticker_Listener_Type) {
            var tempListeners = this.listeners;
            for (var currentListener of this.listeners) {
                if (currentListener == listener) {
                    var currentListenerIndex = this.listeners.indexOf(currentListener);
                    tempListeners = this.listeners.slice(0, currentListenerIndex);
                    break;
                }
            }
            this.listeners = tempListeners;
        }

        notify(deltaTime: number) {
            for (let listener of this.listeners) {
                listener(deltaTime);
            }
        }

    }

}