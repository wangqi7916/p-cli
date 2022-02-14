// 发布订阅者模式
class EventEmitter{
    constructor(){
        this.EventList = {}
    }

    // 订阅
    on(key, fn){
        if(!this.EventList[key]) {
            this.EventList[key] = [fn]
        } else {
            this.EventList[key].push(fn)
        }
    }

    // 发布
    emit(key, ...args){
        if(this.EventList[key]) {
            this.EventList[key].forEach(fn => fn.apply(this, args))
        }
    }

    // 移除某个事件的一个监听者
    off(key, fn) {
        const callBacks = this.EventList[key] || []
        const newCallBacks = callBacks.filter(callBack => callBack != fn)
        this.EventList[key] = newCallBacks
    }

    // 单次订阅
    once(key, fn) {
        function f(){
            fn()
            this.off(key, f)
        }
        this.on(key, f)
    }
}

export default new EventEmitter()