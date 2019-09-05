// author: 1076
// license: MIT
// source: https://github.com/the1076/loud-array
const privateKey = { id: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) )};
export default class LoudArray extends Array
{
    constructor(listeners, ...fromValues)
    {
        super(...fromValues);
        this._private = new WeakMap();
        this._private.set(privateKey, { listeners: listeners || [] });

        //handle listeners when methods that change the array are called (list sourced from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_2)
        const mutatorMethods = 'copyWithin fill pop push reverse shift sort splice unshift'.split(' ');
        const privateData = this._private.get(privateKey);
        for(let i = 0; i < mutatorMethods.length; i++)
        {
            let method = mutatorMethods[i];
            privateData[method] = this[method].bind(this);
            this[method] = (...args) =>
            {
                let listeners = privateData.listeners.filter((value) =>
                {
                    if(method === 'copyWithin' && value.event.indexOf('copy-within') > -1)
                    {
                        return true;
                    }

                    let event = value.event.toLowerCase();
                    return (event.indexOf(method) > -1) || event.indexOf('any') > -1 || event.indexOf('all') > -1;
                });

                _dispatchEvents(this, listeners, 'before', args);
                let returnValue = privateData[method](...args);
                _dispatchEvents(this, listeners, 'after', args);
                return returnValue;
            }
        }
    }

    addEventListener(event, handler)
    {
        let listener = event;
        if(!(event instanceof ArrayListener))
        {
            listener = new ArrayListener(event, handler);
        }

        const privateData = this._private.get(privateKey);
        let listenerIndex = _array_findListener(this, listener.event, listener.handler);
        if(listenerIndex > -1)
        {
            return privateData.listeners[listenerIndex];
        }


        privateData.listeners.push(listener);
        return listener;
    }
    removeEventListener(event, handler)
    {
        let listener = event;
        if(!(event instanceof ArrayListener))
        {
            listener = new ArrayListener(event, handler);
        }

        let listenerIndex = _array_findListener(this, listener.event, listener.handler);
        if(listenerIndex == -1)
        {
            return;
        }

        const privateData = this._private.get(privateKey);
        privateData.listeners.splice(listenerIndex, 1);
    }
}
export class ArrayListener
{
    constructor(event, handler)
    {
        this.event = event
        this.handler = handler;
    }
}
export class ArrayEvent //String enum uses getters because Firefox doesn't play nice with static properties yet.
{       
    static get BeforeAll() { return 'before-all'; }
    static get BeforeCopyWithin () { return 'before-copy-within'; }
    static get BeforeFill () { return 'before-fill'; }
    static get BeforePop () { return 'before-pop'; }
    static get BeforePush () { return 'before-push'; }
    static get BeforeReverse () { return 'before-reverse'; }
    static get BeforeShift () { return 'before-shift'; }
    static get BeforeSort () { return 'before-sort'; }
    static get BeforeSplice () { return 'before-splice'; }
    static get BeforeUnshift () { return 'before-unshift'; }

    static get AfterAll() { return 'after-all'; }
    static get AfterCopyWithin () { return 'after-copy-within'; }
    static get AfterFill () { return 'after-fill'; }
    static get AfterPop () { return 'after-pop'; }
    static get AfterPush () { return 'after-push'; }
    static get AfterReverse () { return 'after-reverse'; }
    static get AfterShift () { return 'after-shift'; }
    static get AfterSort () { return 'after-sort'; }
    static get AfterSplice () { return 'after-splice'; }
    static get AfterUnshift () { return 'after-unshift'; }
}

function _array_findListener(target, event, handler)
{
    let index = -1;
    const privateData = target._private.get(privateKey);
    for(let i = 0; i < privateData.listeners.length; i++)
    {
        let listener = privateData.listeners[i];
        
        let listenerEvent = listener.event.toLowerCase();
        if(listenerEvent == event && listener.handler == handler)
        {
            index = i;
            break;
        }
    }
    return index;
}
function _dispatchEvents(target, listeners, stage, args)
{
    for(let i = 0; i < listeners.length; i++)
    {
        let listener = listeners[i];
        if(listener.event.toLowerCase().indexOf(stage) > -1)
        {
            listener.handler(target, ...args);
        }
    }
}