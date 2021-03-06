var utils = {

    /**
     * Sort given array by provided rule in comparator function
     * @param {Array} list
     * @param {Function} comparator
     */

    sort:function (list, comparator) {
        if (!utils.isArray(list)){
            return false;
        }

        var count = list.length;
        var item;

        for (var i = 0; i < count-1; i++) {
            for (var j = 0; j < count-1-i; j++) {
                if (comparator && comparator(list[j], list[j + 1]) ||
            !comparator && list[j] > list[j+1]) {
                    item = list[j+1];
                    list[j+1] = list[j];
                    list[j] = item;
                }
            }
        }

        return list;
    },

    /**
     * Make first letter of given string upper case
     * @param {String} string
     * @return {String} capitalized string
     */

    capitalize:function (string) {
        if(!utils.isString(string)) {
            return false;
        }
        var lowerCase = string.toLowerCase();
        return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
    },

    /**
     * Camelize given string or array of string
     * @param {Array|String} sequence
     * @return {String} capitalized string
     */

    camelize:function (sequence) {

        var string = '';
        if (!utils.isArray(sequence) && !utils.isString(sequence)) {
            return false;
        }
        if (this.isArray(sequence)) {
            for (var i = 0; i < sequence.length; i++) {
                if ((typeof sequence[i]) === 'object') {
                    var newArr = sequence[i];
                    string += utils.camelize(newArr);
                }
                else {
                    sequence[i] = sequence[i].replace(/\W/, '');
                    sequence[i] = sequence[i].replace(/[0-9]]/);

                    string += utils.capitalize(sequence[i]);
                }
            }
        }
        else if (this.isString(sequence)) {
            var newArr = sequence.split(' ');
            string += utils.camelize(newArr);
        }
        return string;
    },


    /**
     * Cut of any count of spaces from the beginning and from the end of the string
     * @param {String} str
     * @return {String}
     */

    trim:function (str) {
        if(!utils.isString(str)) {
            return false;
        }
        return str.replace(/ +/g,"");
    },

    /**
     * Reverses a specified list.
     * @param {Array} list - a list to be reversed, may be empty.
     * @return {Array} - the same instance of list but reverted
     */

    reverse:function (list) {
        if(!this.isArray(list)) {
            return false;
        }
        for (var i = 0; i < list.length / 2; i++) {
            var newArr = list[i];
            list[i] = list[list.length - 1 - i];
            list[list.length - 1 - i] = newArr;
        }
        return list;
    },

    /**
     *  Change each list's element by applying handler
     *  @params {Array|Object} list - input sequence
     *  @params {Function} iterator  - some rule which changes each element
     *  @return {Array} new list with changes elements
     */


    map: function (list, iterator) {
        if(!utils.isObject(list) && !utils.isArray(list)) {
            return false;
        }
        for (var j = 0; j < list.length; j++) {
            if (typeof list[j] === 'string') {
                return false;
            }
        }
        if (utils.isObject(list)) {
            var newObj = {};

            for (var someProperty in list) {
                if (list.hasOwnProperty(someProperty)) {
                    newObj[someProperty] = iterator(list[someProperty]);
                }
            }

            return newObj;
        } else if (utils.isArray(list)) {
            var newArr = [];

            for (var i = 0; i < list.length; i++) {
                newArr.push(iterator(list[i]));
            }
            return newArr;
        }
    },


    /**
     * Group some input sequence of element by some rule
     * @param {Array} list - input sequence
     * @param {Function} iterator -  provide group id for each element
     * @return {Object} object of group id properties which point to arrays of element from input sequence
     */

    groupBy:function (list, iterator) {
        if(!utils.isArray(list)) {
            return false;
        }
        var results = {};
        for (var i = 0; i < list.length; i++) {
            if(typeof list[i] === 'string') {
                return false;
            }
            var key = iterator(list[i]);
            if (results.hasOwnProperty(key)) {
                results[key].push(list[i]);
            } else {
                results[key] = [list[i]];
            }
        }
        return results;
    },


    /**
     * Creates a version of the function that can only be called one time.
     * Repeated calls to the modified function will have no effect.
     * @param {Function} func - your target function
     * @return {Function} new  function which could be invoked only once
     */

    once: function(func){
        var executed = false;
        return function() {
            if (!executed) {
                executed = true;
                return func.apply(this, arguments)
            }
        }
    },

    /**
     * Creates and returns a new debounced version of the passed function
     * which will postpone its execution until after wait milliseconds
     * have elapsed since the last time it was invoked.
     * @param {Function} func - your target function
     * @param {Number} wait -  milliseconds have elapsed since the last time it was invoked
     * @return {Function} new debounced version of the passed function
     */

    debounce: function(func, wait){
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    same: function(listOne, listTwo) {
        var arrays = utils.isArray(listOne) && utils.isArray(listTwo);
        var objects = (!utils.isArray(listOne) &&  typeof listOne === 'object') && (!utils.isArray(listTwo) &&  typeof listTwo === 'object');
        var firstObjKeys = objects ? Object.keys(listOne) : listOne;
        var secondObjKeys = objects ? Object.keys(listTwo) : listTwo;
        var currentKey;

        if ((!arrays && !objects) || (firstObjKeys.length !== secondObjKeys.length)) {
            return false;
        }
        if (objects) {
            for (var i = 0; i < firstObjKeys.length; i++) {
                currentKey = firstObjKeys[i];
                if(typeof listOne[currentKey] === 'object' && typeof listTwo[currentKey] === 'object'){
                    if(!utils.same(listOne[currentKey], listTwo[currentKey])){
                        return false;
                    }
                }else if (secondObjKeys.indexOf(currentKey) == -1 || listOne[currentKey] !== listTwo[currentKey]) {
                    //console.log('simple equal')
                    return false;
                }
            }
        } else if (arrays) {
            for (var i = 0; i < listOne.length; i++) {

                if(typeof listOne[i] === 'object' && typeof listTwo[i] === 'object'){
                    if(!utils.deepEqual(listOne[i], listTwo[i])){
                        return false;
                    }
                }else if(listOne[i] !== listTwo[i]) {
                    return false;
                }
            }
        }

        return true;
    },

    isArray: function(obj) {
        return Object.prototype.toString.call(obj).toUpperCase() === '[OBJECT ARRAY]';
    },

    isObject: function(obj) {
        return Object.prototype.toString.call(obj).toUpperCase() === '[OBJECT OBJECT]';
    },

    isString: function(obj) {
        return Object.prototype.toString.call(obj).toUpperCase() === '[OBJECT STRING]';
    }

};

module.exports = utils;