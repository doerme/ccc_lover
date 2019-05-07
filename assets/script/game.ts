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

    @property({
        type: cc.Node
    })
    boy_left_head: cc.Node = null;

    @property({
        type: cc.Node
    })
    boy_right_head: cc.Node = null;

    @property({
        type: cc.Node
    })
    boy_mask: cc.Node = null;

    @property({
        type: cc.Node
    })
    girl_left_head: cc.Node = null;

    @property({
        type: cc.Node
    })
    girl_right_head: cc.Node = null;

    @property({
        type: cc.Node
    })
    girl_mask: cc.Node = null;

    @property({
        type: cc.Node
    })
    curtain_block: cc.Node = null;

    @property({
        type: cc.Node
    })
    mycoin: cc.Node = null;

    @property({
        type: cc.Node
    })
    confirm_block: cc.Node = null;

    @property({
        type: cc.Node
    })
    award_block: cc.Node = null;

    @property({
        type: cc.Node
    })
    award_tips: cc.Node = null;

    @property({
        type: cc.Node
    })
    oops_tips: cc.Node = null;

    @property({
        type: cc.Node
    })
    coin_bt: Array<cc.Node> = []

    @property({
        type: cc.SpriteFrame
    })
    girl_good: cc.SpriteFrame = null;

    @property({
        type: cc.SpriteFrame
    })
    girl_bad: cc.SpriteFrame = null;

    @property({
        type: cc.SpriteFrame
    })
    boy_good: cc.SpriteFrame = null;

    @property({
        type: cc.SpriteFrame
    })
    boy_bad: cc.SpriteFrame = null;

    
    @property
    text: string = 'hello';

    // 当前选择性别
    curselectsex: string

    // 当前回合胜利值 1.左 2.右
    curwin: number

    // 当前下注金额
    curcoinnum: number = 1

    // 我的金币
    minecoinnum: number = 1000

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.mycoin.getComponent(cc.Label).string = this.minecoinnum.toString()
    }

    // update (dt) {}

    // 选择下注金额
    selectCoinNum(e:any, customEventData: string): void {
        console.log(e, customEventData)
        const selindex = customEventData === '1' ? 0 : customEventData === '10' ? 1 : 2
        this.curcoinnum = Number(customEventData)
        this.coin_bt.forEach(item => {
            item.opacity = 128
        })
        this.coin_bt[selindex].opacity = 255
    }

    // 选择性别
    selectSex (e:any, customEventData: string): void {
        console.log(e, customEventData)
        this.curselectsex = customEventData
        this.sex_select_page.active = false
        this.gameInit(this.curselectsex)
    }

    // 游戏开始
    gameInit (selectSex: string):void {
        this.curtain_block.getComponent(cc.Animation).play('curtain_up');
        if(selectSex === '1') {
            this.cur_sex_boy.active = true
            this.ui_girl.active = true
        }else{
            this.cur_sex_girl.active = true
            this.cur_sex_color.color = new cc.Color(208,47,106) //(208,47,106)
            this.ui_boy.active = true
        }

        this.curwin = Math.round(Math.random()) + 1
        this.gameSelectInit(this.curwin)
    }

    // 游戏选择初始化
    gameSelectInit (winnum: number): void {
        if(winnum === 1) {
            // 左赢
            this.girl_left_head.getComponent(cc.Sprite).spriteFrame = this.girl_good
            this.girl_right_head.getComponent(cc.Sprite).spriteFrame = this.girl_bad
            this.boy_left_head.getComponent(cc.Sprite).spriteFrame = this.boy_good
            this.boy_right_head.getComponent(cc.Sprite).spriteFrame = this.boy_bad
        } else {
            // 右赢
            this.girl_left_head.getComponent(cc.Sprite).spriteFrame = this.girl_bad
            this.girl_right_head.getComponent(cc.Sprite).spriteFrame = this.girl_good
            this.boy_left_head.getComponent(cc.Sprite).spriteFrame = this.boy_bad
            this.boy_right_head.getComponent(cc.Sprite).spriteFrame = this.boy_good
        }
        this.confirm_block.active=true
    }

    // 游戏重置
    gameReset(): void {
        this.curtain_block.getComponent(cc.Animation).play('curtain_down');
        this.scheduleOnce(() => {
            this.cur_sex_boy.active = false
            this.ui_girl.active = false
            this.cur_sex_girl.active = false
            this.ui_boy.active = false
            this.boy_mask.active = true
            this.girl_mask.active = true
            this.award_block.active = false
            this.oops_tips.active = false
            this.gameInit(this.curselectsex)
        }, 2)
    }

    // 揭开
    hideMask(e:any, customEventData: string): void {
        console.log(customEventData)
        this.confirm_block.active=false
        if(customEventData === this.curwin.toString()){
            this.minecoinnum += this.curcoinnum 
            this.award_block.active = true
            this.award_tips.getComponent(cc.Label).string = this.curcoinnum.toString()
        } else {
            this.minecoinnum -= this.curcoinnum 
            this.oops_tips.active = true
        }
        this.mycoin.getComponent(cc.Label).string = this.minecoinnum.toString()
        this.boy_mask.active = false
        this.girl_mask.active = false
        this.scheduleOnce(() => {
            this.gameReset();
        }, 3)
    }

    // 打开协议
    openPrivacy (): void{
        this.privacy_block.active = true
    }

    // 关闭协议
    closePrivacy (): void{
        this.privacy_block.active = false        
    }

    // 返回性别选择
    backToSex () : void {
        this.sex_select_page.active = true
    }
}
