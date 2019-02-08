let FunctionalJs = {};

FunctionalJs.partialFunction = function(func, ...args) {
    return (...additionalArgs) => (func.call(null, ...args, ...additionalArgs));
}

FunctionalJs.curry = (f) => {
    const func = f;
    const ARGS_LENGTH = f.length;    
    if (ARGS_LENGTH === 0) {
        return func();
    }
    return function curryProxy(...args) {
        if (args.length >= ARGS_LENGTH) {
            return func(...args);
        }
        return function diveInto(...additionalArgs) {
           let newArgs =  [...args, ...additionalArgs];
            return curryProxy(...newArgs);
        }           
    }
}

FunctionalJs.linearFold = (array, callback, initialValue) => {

    if (initialValue === undefined && array.length === 0) {
        throw new TypeError('LinearFold of empty array with no initial value');
    }
    if (initialValue === undefined && array.length < 2) {
        return array[0];
    }
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }
    
    function linearFoldRecursive (array, callback, initialValue) {
        let index = 0;
        if (initialValue === undefined) {
            initialValue = array[0];
            index++;
        }
        if (array.length > 0) {
            let newArray;
            index === 0 ? [, ...newArray] = array : [, , ...newArray] = array;
            let newInitialValue = callback(initialValue, array[index]);
            return linearFoldRecursive(newArray, callback, newInitialValue);
        }
        return initialValue;
    }
    return linearFoldRecursive(array, callback, initialValue);
}

FunctionalJs.linearUnfold = (callback, initialValue) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function linearUnfoldRecursive(callback, initialValue) {
        let [nextElement, nextState] = callback(initialValue);
        if (!nextElement) {
            return [];
        }
        if (!nextState) {
            return [nextElement];
        }
        return [nextElement, ...linearUnfoldRecursive(callback, nextState)];
    }
    return linearUnfoldRecursive(callback, initialValue);   
}

FunctionalJs.map = (array, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function mapRecursive (array, callback) {
        if (array.length > 0) {
            let [, ...newArray] = array;
            return [callback(array[0]), ...mapRecursive(newArray, callback)];
        }
        return [];
    }
    return mapRecursive(array, callback);
}

FunctionalJs.filter = (array, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function filterRecursive(array, callback) {
        if (array.length > 0) {
            let newArray;
            [, ...newArray] = array;
            if (callback(array[0])) {
                return [array[0], ...filterRecursive(newArray, callback)];
            }
            return [...filterRecursive(newArray, callback)];
        }
        return [];
    }
    return [...filterRecursive(array, callback)];
}

FunctionalJs.avgOfEvenNumbers = function (array) {
    if (!(array instanceof Array)) {
        return 0;
    }
    let evenArray = this.filter(array, number => number % 2 === 0);
    return this.linearFold(evenArray, (previous, current) => previous + current) / evenArray.length;
}

FunctionalJs.sumOfRandomNumbers = function () {
    let array = this.linearUnfold((x) => {
        if (x > 0) {
            return [Math.random() * (10-1) + 1, --x];
        }
    }, 10);
    
    return this.linearFold(array, (sum, number) => sum + number);
}

FunctionalJs.first = (array, condition) => {
    if (!(array instanceof Array)) {
        return undefined;
    }
    if (typeof condition !== 'function') {
        throw new TypeError('Given condition argument is not a function');
    }

    function firstRecursive(array, condition) {
        if (array.length > 0) {
            if (condition(array[0])) {
                return array[0];
            }
            let newArray;
            [, ...newArray] = array;
            return firstRecursive(newArray, condition);
        }
        return undefined;
    }
    return firstRecursive(array, condition)
}

FunctionalJs.lazy = (func, ...parameters) => {
    let isExecuted = false;
    let savedResult;
    return () => {
        if (isExecuted === false) {
        savedResult = func(...parameters);
        isExecuted = true;
        }
        return savedResult;
    };
}

FunctionalJs.memoize = (fn) => {
    let savedResults = new Map();
    let memoized =  function (argument) {
        if (savedResults.has(argument)) {
            return savedResults.get(argument);
        }
        let result = fn(argument);
        savedResults.set(argument, result);
        return result;
    }
    return memoized;
}

export default FunctionalJs;