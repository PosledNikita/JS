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
    
    function linearFoldRecursive (array, callback, index, initialValue, previousValue) {
        if (index === 0) {
            if (initialValue !== undefined) {
                previousValue = initialValue;
            } else {
                previousValue = array[0];
                index++;
            }
        }
        previousValue = callback(previousValue, array[index], index, array);
        if (index < array.length - 1) {
          return linearFoldRecursive(array, callback, ++index, initialValue, previousValue );
        }
        return previousValue;
    }
    return linearFoldRecursive(array, callback, 0, initialValue);
}

FunctionalJs.linearUnfold = (callback, initialValue) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function linearUnfoldRecursive(callback, initialValue, resultSequence = []) {
        let [nextElement, nextState] = callback(initialValue);
        if (!nextElement) {
            return resultSequence;
        }
        resultSequence.push(nextElement);
        if (!nextState) {
            return resultSequence;
        }
        return linearUnfoldRecursive(callback, nextState, resultSequence);
    }
    return linearUnfoldRecursive(callback, initialValue);   
}

FunctionalJs.map = (array, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function mapRecursive (array, callback, resultArray = [], index = 0) {
        if (index < array.length) {
            resultArray.push(callback(array[index], index, array));
            return mapRecursive(array, callback, resultArray, ++index);
        }
        return resultArray;
    }
    return mapRecursive(array, callback);
}

FunctionalJs.filter = (array, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function filterRecursive(array, callback, resultArray = [], index = 0) {
        if (index < array.length) {
            if (callback(array[index], index, array)) {
                resultArray.push(array[index]);
            }
            return filterRecursive(array, callback, resultArray, ++index);
        }
        return resultArray;
    }
    return filterRecursive(array, callback);
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

    function firstRecursive(array, condition, index = 0) {
        if (index < array.length) {
            if (condition(array[index], index, array)) {
                return array[index];
            }
            return firstRecursive(array, condition, ++index);
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