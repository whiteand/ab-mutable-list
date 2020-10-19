"use strict";
exports.__esModule = true;
/**
 * Complexity O(n)
 * Mutable function
 * @param list linked list
 * @param value value to append at the end of the list
 */
function append(list, value) {
    if (!list) {
        return { value: value, next: null };
    }
    var last = list;
    while (last.next)
        last = last.next;
    last.next = { value: value, next: null };
    return list;
}
exports.append = append;
/**
 * Complexity O(1)
 * Immutable function
 * @param list linked list
 * @param value value to prepend at the beginning of the list
 */
function prepend(list, value) {
    if (!list) {
        return { value: value, next: null };
    }
    return { value: value, next: list };
}
exports.prepend = prepend;
/**
 * Complexity O(1)
 * Immutable function
 * Returns empty list
 */
function empty() {
    return null;
}
exports.empty = empty;
/**
 * Removes one occurance of the value in the list. Returns new list
 * Complexity O(n)
 * Mutable function
 * @param list linked list
 * @param value value to be removed
 */
function remove(list, value) {
    if (!list)
        return null;
    if (list.value === value)
        return list.next;
    var currentList = list;
    while (currentList.next && currentList.next.value !== value)
        currentList = currentList.next;
    if (!currentList.next)
        return list;
    currentList.next = currentList.next.next;
    return list;
}
exports.remove = remove;
/**
 * Iterates via list
 * Complexity O(n)
 * Immutable function.
 * @param list linked list
 * @param callback callback which will be called with all values within the list
 */
function iterate(list, callback) {
    while (list) {
        callback(list.value);
        list = list.next;
    }
}
exports.iterate = iterate;
/**
 * Checks if list contains the value
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param value value
 * @return true, if list contains value, false, otherwise
 */
function contains(list, value) {
    var res = false;
    var currentNode = list;
    while (currentNode) {
        if (currentNode.value === value) {
            return true;
        }
        currentNode = currentNode.next;
    }
    return res;
}
exports.contains = contains;
/**
 * Returns an iterator of the list
 * Complexity O(1)
 * Immutable function
 * @param list linked list
 */
function iterator(list) {
    var currentNode = list;
    return {
        next: function () {
            if (!currentNode) {
                return { done: true, value: undefined };
            }
            var value = currentNode.value;
            return {
                value: value,
                done: false
            };
        }
    };
}
exports.iterator = iterator;
/**
 * Analogue of reduce of the list
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param f function which take current value and list item and returns new value
 * @param init initial value of the reduce algorithm
 */
function reduce(list, f, init) {
    var current = init;
    iterate(list, function (v) {
        current = f(current, v);
    });
    return current;
}
exports.reduce = reduce;
/**
 * Returns length of the list
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 */
function length(list) {
    var res = 0;
    while (list) {
        res++;
        list = list.next;
    }
    return res;
}
exports.length = length;
/**
 * Builds linked list from the iterator
 * Complexity O(n)
 * Mutable function.
 * @param iter iterator of values
 */
function build(iter) {
    var current = iter.next();
    if (current.done) {
        return null;
    }
    var resList = { value: current.value, next: null };
    var lastNode = resList;
    current = iter.next();
    while (!current.done) {
        lastNode.next = { value: current.value, next: null };
        lastNode = lastNode.next;
        current = iter.next();
    }
    return resList;
}
exports.build = build;
/**
 * Returns new list with all elements of the passed list parameter transformed via function f
 * Complexity O(n)
 * Immutable function.
 * @param list linked list
 * @param f transform list item to new list item
 */
function map(list, f) {
    var originalIter = iterator(list);
    var newValuesIter = {
        next: function () {
            var current = originalIter.next();
            if (current.done) {
                return { done: true, value: undefined };
            }
            return { done: false, value: f(current.value) };
        }
    };
    return build(newValuesIter);
}
exports.map = map;
/**
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param pred if pred(item) returns true, restult will contain item
 */
function filter(list, pred) {
    var oldIterator = iterator(list);
    var newIterator = {
        next: function () {
            var current = oldIterator.next();
            while (!current.done && !pred(current.value))
                current = oldIterator.next();
            if (current.done) {
                return { done: true, value: undefined };
            }
            return { value: current.value, done: false };
        }
    };
    return build(newIterator);
}
exports.filter = filter;
/**
 * Transforms list into array
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 */
function toArray(list) {
    var res = [];
    iterate(list, function (v) { return res.push(v); });
    return res;
}
exports.toArray = toArray;
