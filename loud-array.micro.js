// author: 1076
// license: MIT
// source: https://github.com/the1076/loud-array
export default class LoudArray extends Array
{
    //all possible eventType values: "all", "copy-within", "fill", "pop", "push", "reverse", "shift", "sort", "splice", "unshift";
    constructor(listeners, ...fromValues)
    {
        super(...fromValues);
        this._private = { listeners: listeners || [] };

        //handle listeners when methods that change the array are called (list sourced from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_2)
        const mutatorMethods = 'copyWithin fill pop push reverse shift sort splice unshift'.split(' ');
        for(let i = 0; i < mutatorMethods.length; i++)
        {
            let method = mutatorMethods[i];
            this._private[method] = this[method].bind(this);
            this[method] = (...args) =>
            {
                let listeners = this._private.listeners.filter((value) =>
                {
                    if(method === 'copyWithin' && value.event == 'copy-within')
                    {
                        return true;
                    }

                    let event = value.event.toLowerCase();
                    return (event == method || event == 'any' || event == 'all');
                });

                let returnValue = this._private[method](...args);
                _dispatchEvents(this, listeners, 'after', args);
                return returnValue;
            }
        }
        
        this._private['slice'] = this['slice'].bind(this);
        this['slice'] = (...args) =>
        {
            let returnValue = this._private['slice'](...args);
            returnValue = new Array(...returnValue);
            return returnValue;
        }
    }

    addEventListener(event, handler)
    {
        let listenerIndex = _array_findListener(this, listener.event, listener.handler);
        if(listenerIndex > -1)
        {
            return this._private.listeners[listenerIndex];
        }


        this._private.listeners.push({ event: event, handler: handler });
        return listener;
    }
    removeEventListener(event, handler)
    {
        let listenerIndex = _array_findListener(this, event, handler);
        if(listenerIndex == -1)
        {
            return;
        }

        this._private.listeners.splice(listenerIndex, 1);
    }
}

function _array_findListener(target, event, handler)
{
    let index = -1;
    for(let i = 0; i < target._private.listeners.length; i++)
    {
        let listener = target._private.listeners[i];
        
        let listenerEvent = listener.event.toLowerCase();
        if(listenerEvent == event && listener.handler == handler)
        {
            index = i;
            break;
        }
    }
    return index;
}
function _dispatchEvents(target, listeners, args)
{
    for(let i = 0; i < listeners.length; i++)
    {
        let listener = listeners[i];
        listener.handler(target, ...args);
    }
}