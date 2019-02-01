let FunctionalJs = {};

FunctionalJs.partialFunction = function(func, ...args) {
    return (...additionalArgs) => (func.call(null, ...args, ...additionalArgs));
}

FunctionalJs.curry = (f) => {
        const func = f;
        const ARGS_LENGTH = f.length;
        let args = [];
    
        if(ARGS_LENGTH === 0){
            return func();
        }
    
        return function diveInto(...x) {
            args.push(...x);
            if(args.length === ARGS_LENGTH){
                return func(...args);
            }
            return diveInto;
        }
  
}

FunctionalJs.linearFold = (array, callback, initialValue) => {
    let index = 0;
    let previousValue = null;

    if(initialValue === undefined && array.length === 0) {
        throw new TypeError('LinearFold of empty array with no initial value');
    }
    else if(initialValue === undefined && array.length < 2) {
        return array[0];
    }
    
    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    if(initialValue !== undefined) {
        previousValue = initialValue;
    } else {
        previousValue = array[0];
        index++;
    }

    for(; index < array.length; index++) {
        previousValue = callback(previousValue, array[index], index, array);
    }

    return previousValue;   
}

FunctionalJs.linearUnfold = (callback, initialValue) => {
    let resultSequence = [];
    let currentState = initialValue;

    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    while(true) {
        let [nextElement, nextState] = callback(currentState);

        if(isFalsy(nextElement)) {
            break;
        }
        resultSequence.push(nextElement);

        if(isFalsy(nextState)) {
            break;
        }
        currentState = nextState;
    }

    return resultSequence;

    function isFalsy(value) {
        if(value === undefined || value === null || !value || value === '' || value === ``) {
            return true;
        }
        return false;
    }
    
}

FunctionalJs.map = (array, callback) => {
    let resultArray = [];

    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    for(let index = 0; index < array.length; index++) {
        resultArray.push(callback(array[index], index, array));
    }

    return resultArray;   
}

FunctionalJs.filter = (array, callback) => {
    let resultArray = [];

    if(typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    for(let index = 0; index < array.length; index++) {
        let operationResult = callback(array[index], index, array);

        if(operationResult) {
            resultArray.push(array[index]);
        }
    }

    return resultArray;   
}

FunctionalJs.avgOfEvenNumbers = function (array) {
    if(!(array instanceof Array)) {
        return 0;
    }
    let evenArray = this.filter(array, number => number % 2 === 0);
    if(evenArray.length === 0) {
        return 0;
    }
    return this.linearFold(evenArray, (previous, current) => previous + current) / evenArray.length;
}

FunctionalJs.sumOfRandomNumbers = function () {
    let array = [];
    let i;

    for(i = 0; i < 10; i++){
        array.push(generateRandomNumber(0, 10));
    }

    return this.linearFold(array, (sum, number) => sum + number);

    function generateRandomNumber(min, max) 
    {
        return Math.random() * (max-min) + min ;
    }    
}

FunctionalJs.first = (array, condition) => {
    let validValue;
    if(!(array instanceof Array)) {
        return undefined;
    }

    if(typeof condition !== 'function') {
        throw new TypeError('Given condition argument is not a function');
    }

    for(let i = 0; i < array.length; i++) {
        if(condition(array[i], i, array)) {
            validValue = array[i];
            break;
        }
    }

    return validValue;
}

FunctionalJs.lazy = (func, ...parameters) => {
    return () => {
        return func.call(null, ...parameters);
    }
}

FunctionalJs.memoize = (fn) => {
    let savedResults = new Map();
    let memoized =  function (argument) {
        
      if (savedResults.has(argument)) {
        return savedResults.get(argument);
      }
      else {
        let result = fn(argument);
        savedResults.set(argument, result);
        memoized.savedResultsCount++;
        return result;
      }
    }
    memoized.savedResultsCount = 0;
    return memoized;
}