export declare type TList<T> = null | {
    value: T;
    next: TList<T>;
};
export declare type IIteratorResult<T> = {
    done: false;
    value: T;
} | {
    done: true;
    value: undefined;
};
export interface Iterator<T> {
    next(): IIteratorResult<T>;
}
/**
 * Complexity O(n)
 * Mutable function
 * @param list linked list
 * @param value value to append at the end of the list
 */
export declare function append<T>(list: TList<T>, value: T): {
    value: T;
    next: any;
};
/**
 * Complexity O(1)
 * Immutable function
 * @param list linked list
 * @param value value to prepend at the beginning of the list
 */
export declare function prepend<T>(list: TList<T>, value: T): {
    value: T;
    next: {
        value: T;
        next: any;
    };
};
/**
 * Complexity O(1)
 * Immutable function
 * Returns empty list
 */
export declare function empty<T>(): TList<T>;
/**
 * Removes one occurance of the value in the list. Returns new list
 * Complexity O(n)
 * Mutable function
 * @param list linked list
 * @param value value to be removed
 */
export declare function remove<T>(list: TList<T>, value: T): {
    value: T;
    next: any;
};
/**
 * Iterates via list
 * Complexity O(n)
 * Immutable function.
 * @param list linked list
 * @param callback callback which will be called with all values within the list
 */
export declare function iterate<T>(list: TList<T>, callback: (value: T) => void): void;
/**
 * Checks if list contains the value
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param value value
 * @return true, if list contains value, false, otherwise
 */
export declare function contains<T>(list: TList<T>, value: T): boolean;
/**
 * Returns an iterator of the list
 * Complexity O(1)
 * Immutable function
 * @param list linked list
 */
export declare function iterator<T>(list: TList<T>): Iterator<T>;
/**
 * Analogue of reduce of the list
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param f function which take current value and list item and returns new value
 * @param init initial value of the reduce algorithm
 */
export declare function reduce<T, U>(list: TList<T>, f: (current: U, item: T) => U, init: U): U;
/**
 * Returns length of the list
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 */
export declare function length<T>(list: TList<T>): number;
/**
 * Builds linked list from the iterator
 * Complexity O(n)
 * Mutable function.
 * @param iter iterator of values
 */
export declare function build<T>(iter: Iterator<T>): TList<T>;
/**
 * Returns new list with all elements of the passed list parameter transformed via function f
 * Complexity O(n)
 * Immutable function.
 * @param list linked list
 * @param f transform list item to new list item
 */
export declare function map<T, U>(list: TList<T>, f: (value: T) => U): TList<U>;
/**
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param pred if pred(item) returns true, restult will contain item
 */
export declare function filter<T>(list: TList<T>, pred: (value: T) => boolean): TList<T>;
/**
 * Transforms list into array
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 */
export declare function toArray<T>(list: TList<T>): T[];
