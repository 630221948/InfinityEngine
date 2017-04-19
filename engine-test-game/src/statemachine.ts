// TypeScript file
interface State {
    getStateName(): String;
    setStateName(Statename: String);
    onEnter();
    onExit();
    //moveFunction(e:infinity.Event);
}

class StateMachine {

    // currentState:State;

    // private s: String;
    public x: number;
    public y: number;
    public stage: infinity.DisplayObjectContainer;
    public idleanim: infinity.MovieClip;
    public walkanim: infinity.MovieClip;
    public currentState: State;
    public PlayerContainer: infinity.DisplayObjectContainer;
    public standstate: Standstate;
    public movestate: Movestate;
    public timeOnEnterFrame: number = 0;
    public RatioX: number = 0;
    public RatioY: number = 0;
    //public isArrived: boolean = false;

    constructor(stage: infinity.DisplayObjectContainer, idleanim: infinity.MovieClip, PlayerContainer: infinity.DisplayObjectContainer, walkanim: infinity.MovieClip) {
        this.stage = stage;
        this.idleanim = idleanim;
        this.walkanim = walkanim;
        this.PlayerContainer = PlayerContainer;
        this.standstate = new Standstate(this);
        this.movestate = new Movestate(this);
        this.currentState = this.standstate;
        this.currentState.onEnter();
    }
    setState(s: String) {
        console.log("当前状态：" + this.currentState.getStateName());
        console.log("即将进入状态：" + s);
        if (this.currentState.getStateName() != s) {
            this.currentState.onExit();
            //this.currentState.setStateName(s);
            this.currentState.onEnter();
        }
    }
}

class Standstate implements State {
    public mac: StateMachine;
    constructor(mac: StateMachine) {
        this.mac = mac;
    }
    s: String = "stand";
    public getStateName(): String {
        return this.s;
    }
    public setStateName(Statename: String) {
        this.s = Statename;
    }
    public onEnter(): void {
        console.log("进入stand");
        //this.mac.PlayerContainer.addChild(this.mac.idleanim);
        this.mac.idleanim.alpha = 1;
        //this.mac.idleanim.gotoAndPlay(1,-1);
    }
    public onExit(): void {
        this.mac.idleanim.alpha = 0;
        this.mac.currentState = this.mac.movestate;
        console.log("退出stand");
    }

    //public moveFunction(e:infinity.Event){};
}

class Movestate implements State {
    public mac: StateMachine;
    //private speed:number = 0.5;
    constructor(mac: StateMachine) {
        this.mac = mac;
    }
    s: String = "move";
    public getStateName(): String {
        return this.s;
    }
    public setStateName(Statename: String) {
        this.s = Statename;
    }
    public onEnter(): void {
        this.mac.walkanim.alpha = 1;
        console.log("进入move");
    }
    public onExit(): void {
        console.log("退出move");
        this.mac.walkanim.alpha = 0;
        this.mac.currentState = this.mac.standstate;
    }

}