// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        type: cc.Node
    })
    privacy_block: cc.Node = null;


    @property({
        type: cc.Node
    })
    sex_select_page: cc.Node = null;

    @property({
        type: cc.Node
    })
    cur_sex_color: cc.Node = null;

    @property({
        type: cc.Node
    })
    cur_sex_boy: cc.Node = null;

    @property({
        type: cc.Node
    })
    cur_sex_girl: cc.Node = null;

    @property({
        type: cc.Node
    })
    ui_boy: cc.Node = null;

    @property({
        type: cc.Node
    })
    ui_girl: cc.Node = null;

    

    @property
    text: string = 'hello';

    // 当前选择性别
    curselectsex: string

    // 当前回合胜利值 1.左 2.右
    curwin: number

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    // 选择性别
    selectSex (e:any, customEventData: string): void {
        console.log(e, customEventData)
        this.curselectsex = customEventData
        this.sex_select_page.active = false
        this.gameInit(this.curselectsex)
    }

    // 游戏开始
    gameInit (selectSex: string):void {
        if(selectSex === '1') {
            this.cur_sex_boy.active = true
            this.ui_boy.active = true
        }else{
            this.cur_sex_girl.active = true
            this.cur_sex_color.color = new cc.Color(208,47,106) //(208,47,106)
            this.ui_girl.active = true
        }

        this.curwin = Math.round(Math.random()) + 1
        this.gameSelectInit(this.curwin)
    }

    // 游戏选择初始化
    gameSelectInit (winnum: number): void {
        if(winnum === 1) {
            // 左赢
        } else {
            // 右赢
        }
    }

    // 打开协议
    openPrivacy (): void{
        this.privacy_block.active = true
    }

    // 关闭协议
    closePrivacy (): void{
        this.privacy_block.active = false        
    }
}
