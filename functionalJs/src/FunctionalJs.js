const FunctionalJs = {};

FunctionalJs.partialFunction = function (func, ...args) {
    return (...additionalArgs) => func.call(null, ...args, ...additionalArgs);
};

FunctionalJs.curry = func => {
    const argsLength = func.length;

    return function curryProxy(...args) {
        if (args.length >= argsLength) {
            return func(...args);
        }
        return function diveInto(...additionalArgs) {
            const newArgs = [...args, ...additionalArgs];
            return curryProxy(...newArgs);
        };
    };
};

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

    function linearFoldRecursive([firstValue, ...array], callback, accumulator) {
        if (accumulator === undefined) {
            return linearFoldRecursive(array, callback, firstValue);
        }
        if (firstValue !== undefined || array.length > 0) {
            const newAccumulator = callback(accumulator, firstValue);
            return linearFoldRecursive(array, callback, newAccumulator);
        }
        return accumulator;
    }

    return linearFoldRecursive(array, callback, initialValue);
};

FunctionalJs.linearUnfold = (callback, initialValue) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function linearUnfoldRecursive(callback, accumulator) {
        const [nextElement, nextState] = callback(accumulator);
        if (!nextElement) {
            return [];
        }
        if (!nextState) {
            return [nextElement];
        }
        return [nextElement, ...linearUnfoldRecursive(callback, nextState)];
    }

    return linearUnfoldRecursive(callback, initialValue);
};

FunctionalJs.map = (array, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function mapRecursive([firstValue, ...array], callback) {
        if (firstValue === undefined && array.length === 0) {
            return [];
        }
        return [callback(firstValue), ...mapRecursive(array, callback)];
    }

    return mapRecursive(array, callback);
};

FunctionalJs.filter = (array, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Given callback argument is not a function');
    }

    function filterRecursive([firstValue, ...array], callback) {
        if (firstValue === undefined && array.length === 0) {
            return [];
        }
        if (callback(firstValue)) {
            return [firstValue, ...filterRecursive(array, callback)];
        }
        return [...filterRecursive(array, callback)];
    }

    return filterRecursive(array, callback);
};

FunctionalJs.avgOfEvenNumbers = function (array) {
    if (!(array instanceof Array)) {
        return 0;
    }

    const evenArray = this.filter(array, number => number % 2 === 0);
    return (this.linearFold(evenArray, (previous, current) => previous + +current, 1) - 1) / (evenArray.length <= 0 ? 1 : evenArray.length);
};
FunctionalJs.sumOfRandomNumbers = function () {
    const array = this.linearUnfold(x => {
        if (x > 0) {
            return [Math.random() * (10 - 1) + 1, --x];
        }
    }, 10);

    return this.linearFold(array, (sum, number) => sum + number);
};

FunctionalJs.first = (array, condition) => {
    if (!(array instanceof Array)) {
        return undefined;
    }

    if (typeof condition !== 'function') {
        throw new TypeError('Given condition argument is not a function');
    }

    function firstRecursive([firstValue, ...array], condition) {
        if (firstValue !== undefined || array.length > 0) {
            const result = condition(firstValue) ?
                () => firstValue :
                () => firstRecursive(array, condition);
            return result();
        }
        return undefined;
    }

    return firstRecursive(array, condition);
};

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
};

FunctionalJs.memoize = fn => {
    const savedResults = new Map();

    const memoized = function (argument) {
        if (savedResults.has(argument)) {
            return savedResults.get(argument);
        }
        const result = fn(argument);
        savedResults.set(argument, result);
        return result;
    };

    return memoized;
};

export default FunctionalJs;