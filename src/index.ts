export type TList<T> = null | { value: T; next: TList<T> };

export type IIteratorResult<T> =
  | { done: false; value: T }
  | { done: true; value: undefined };

export interface Iterator<T> {
  next(): IIteratorResult<T>;
}

/**
 * Complexity O(n)
 * Mutable function
 * @param list linked list
 * @param value value to append at the end of the list
 */
export function append<T>(list: TList<T>, value: T) {
  if (!list) {
    return { value, next: null };
  }
  var last = list;
  while (last.next) last = last.next;
  last.next = { value, next: null };
  return list;
}

/**
 * Complexity O(1)
 * Immutable function
 * @param list linked list
 * @param value value to prepend at the beginning of the list
 */
export function prepend<T>(list: TList<T>, value: T) {
  if (!list) {
    return { value, next: null };
  }
  return { value, next: list };
}

/**
 * Complexity O(1)
 * Immutable function
 * Returns empty list
 */
export function empty<T>(): TList<T> {
  return null;
}

/**
 * Removes one occurance of the value in the list. Returns new list
 * Complexity O(n)
 * Mutable function
 * @param list linked list
 * @param value value to be removed
 */
export function remove<T>(list: TList<T>, value: T) {
  if (!list) return null;
  if (list.value === value) return list.next;

  var currentList = list;

  while (currentList.next && currentList.next.value !== value)
    currentList = currentList.next;

  if (!currentList.next) return list;

  currentList.next = currentList.next.next;

  return list;
}

/**
 * Iterates via list
 * Complexity O(n)
 * Immutable function.
 * @param list linked list
 * @param callback callback which will be called with all values within the list
 */
export function iterate<T>(list: TList<T>, callback: (value: T) => void) {
  while (list) {
    callback(list.value);
    list = list.next;
  }
}

/**
 * Checks if list contains the value
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param value value
 * @return true, if list contains value, false, otherwise
 */
export function contains<T>(list: TList<T>, value: T): boolean {
  var res = false;
  let currentNode = list;
  while (currentNode) {
    if (currentNode.value === value) {
      return true;
    }
    currentNode = currentNode.next;
  }
  return res;
}

/**
 * Returns an iterator of the list
 * Complexity O(1)
 * Immutable function
 * @param list linked list
 */
export function iterator<T>(list: TList<T>): Iterator<T> {
  var currentNode = list;
  return {
    next() {
      if (!currentNode) {
        return { done: true, value: undefined };
      }
      var value = currentNode.value;
      currentNode = currentNode.next;
      return {
        value,
        done: false,
      };
    },
  };
}

/**
 * Analogue of reduce of the list
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param f function which take current value and list item and returns new value
 * @param init initial value of the reduce algorithm
 */
export function reduce<T, U>(
  list: TList<T>,
  f: (current: U, item: T) => U,
  init: U
): U {
  var current = init;
  iterate(list, (v) => {
    current = f(current, v);
  });
  return current;
}

/**
 * Returns length of the list
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 */
export function length<T>(list: TList<T>): number {
  var res = 0;
  while (list) {
    res++;
    list = list.next;
  }
  return res;
}

/**
 * Builds linked list from the iterator
 * Complexity O(n)
 * Mutable function.
 * @param iter iterator of values
 */
export function build<T>(iter: Iterator<T>): TList<T> {
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

/**
 * Returns new list with all elements of the passed list parameter transformed via function f
 * Complexity O(n)
 * Immutable function.
 * @param list linked list
 * @param f transform list item to new list item
 */
export function map<T, U>(list: TList<T>, f: (value: T) => U): TList<U> {
  const originalIter = iterator(list);

  const newValuesIter: Iterator<U> = {
    next() {
      var current = originalIter.next();
      if (current.done) {
        return { done: true, value: undefined };
      }
      return { done: false, value: f(current.value) };
    },
  };

  return build(newValuesIter);
}

/**
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 * @param pred if pred(item) returns true, restult will contain item
 */
export function filter<T>(
  list: TList<T>,
  pred: (value: T) => boolean
): TList<T> {
  const oldIterator = iterator(list);
  const newIterator: Iterator<T> = {
    next() {
      var current = oldIterator.next();

      while (!current.done && !pred(current.value))
        current = oldIterator.next();

      if (current.done) {
        return { done: true, value: undefined };
      }

      return { value: current.value, done: false };
    },
  };
  return build(newIterator);
}

/**
 * Transforms list into array
 * Complexity O(n)
 * Immutable function
 * @param list linked list
 */
export function toArray<T>(list: TList<T>): T[] {
  var res: T[] = [];
  iterate(list, (v) => res.push(v));
  return res;
}

/**
 * Transforms array into linked list
 * Complexity O(n)
 * Immutable function
 * @param arr array to be transformed
 */
export function fromArray<T>(arr: T[]): TList<T> {
  if (arr.length <= 0) return null;
  var ind = 0;
  const iter: Iterator<T> = {
    next() {
      if (ind >= arr.length) {
        return { done: true, value: undefined };
      }
      var res: IIteratorResult<T> = { value: arr[ind], done: false };
      ind++;
      return res;
    },
  };
  return build(iter);
}
