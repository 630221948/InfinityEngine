var StateMachine = (function () {
    //public isArrived: boolean = false;
    function StateMachine(stage, idleanim, PlayerContainer, walkanim) {
        this.timeOnEnterFrame = 0;
        this.RatioX = 0;
        this.RatioY = 0;
        this.stage = stage;
        this.idleanim = idleanim;
        this.walkanim = walkanim;
        this.PlayerContainer = PlayerContainer;
        this.standstate = new Standstate(this);
        this.movestate = new Movestate(this);
        this.currentState = this.standstate;
        this.currentState.onEnter();
    }
    StateMachine.prototype.setState = function (s) {
        console.log("当前状态：" + this.currentState.getStateName());
        console.log("即将进入状态：" + s);
        if (this.currentState.getStateName() != s) {
            this.currentState.onExit();
            //this.currentState.setStateName(s);
            this.currentState.onEnter();
        }
    };
    return StateMachine;
}());
var Standstate = (function () {
    function Standstate(mac) {
        this.s = "stand";
        this.mac = mac;
    }
    Standstate.prototype.getStateName = function () {
        return this.s;
    };
    Standstate.prototype.setStateName = function (Statename) {
        this.s = Statename;
    };
    Standstate.prototype.onEnter = function () {
        console.log("进入stand");
        //this.mac.PlayerContainer.addChild(this.mac.idleanim);
        this.mac.idleanim.alpha = 1;
        //this.mac.idleanim.gotoAndPlay(1,-1);
    };
    Standstate.prototype.onExit = function () {
        this.mac.idleanim.alpha = 0;
        this.mac.currentState = this.mac.movestate;
        console.log("退出stand");
    };
    return Standstate;
}());
var Movestate = (function () {
    //private speed:number = 0.5;
    function Movestate(mac) {
        this.s = "move";
        this.mac = mac;
    }
    Movestate.prototype.getStateName = function () {
        return this.s;
    };
    Movestate.prototype.setStateName = function (Statename) {
        this.s = Statename;
    };
    Movestate.prototype.onEnter = function () {
        this.mac.walkanim.alpha = 1;
        console.log("进入move");
    };
    Movestate.prototype.onExit = function () {
        console.log("退出move");
        this.mac.walkanim.alpha = 0;
        this.mac.currentState = this.mac.standstate;
    };
    return Movestate;
}());
