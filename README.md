# ab-mutable-list

## API

### `append<T>(list: TList<T>, value: T)`

Complexity O(n). Mutates list argument.

```javascript
var list = fromArray([1, 2, 3]);
var newList = append(list, 4);
console.log(toArray(newList)); // [1,2,3,4]
```

### `prepend<T>(list: TList<T>, value: T)`

Complexity O(1). Immutable function

```javascript
var list = fromArray([1, 2, 3]);
var newList = prepend(list, 0);
console.log(toArray(newList)); // [0,1,2,3]
```

### `empty<T>(): TList<T>`

Returns empty list.

Complexity O(1). Immutable function.

### `remove<T>(list: TList<T>, value: T)`

Complexity O(n). Mutates list argument.

Return list with removed value.

```javascript
var list = fromArray([1, 2, 2, 2, 3]);
var newList = remove(list, 2);
console.log(toArray(newList)); // [1,2,2,3]
```

### `iterate<T>(list: TList<T>, callback: (value: T) => void)`

Complexity O(n). Immutable function.

```javascript
var list = fromArray([1, 2, 3]);

iterate(list, console.log);
// 1
// 2
// 3
```

### `contains<T>(list: TList<T>, value: T): boolean`

Returns true if value is contained in the list.

Complexity O(n). Immutable function

```javascript
var list = fromArray([1, 2, 3]);
contains(list, 1); // true
contains(list, 4); // false
```

### `iterator<T>(list: TList<T>): Iterator<T>`

Returns an iterator of the list.

Complexity O(1). Immutable function

```javascript
var list = fromArray([1, 2, 3]);
for (const item of iterator(list)) {
  console.log(item);
}
// 1
// 2
// 3
```

### `reduce<T, U>(list: TList<T>, f: (current: U, item: T) => U, init: U): U`

Works the same way as array reduce method. Except of init value is required.

Complexity O(n). Immutable function

```javascript
var list = fromArray([1, 2, 3]);
reduce(list, (a, b) => a + b, 0); // 6

reduce(list, (a, b) => a + b); // WRONG!
```

### `length<T>(list: TList<T>): number`

Returns length of the list.

Complexity O(n). Immutable function.

```javascript
var list = fromArray([1, 2, 3]);
length(list); // 3
```

### `build<T>(iter: Iterator<T>): TList<T>`

Builds new list from the iterator object.

Complexity O(n). Calls iter.next().

```javascript
const iter = {
  current: 0,
  next() {
    if (this.current > 10) {
      return { done: true, value: undefined };
    }
    this.current += 1;
    return { done: true, value: this.current };
  },
};

toArray(build(iter)); // [1,2,3,4,5,6,7,8,9,10]
```

### `map<T, U>(list: TList<T>, f: (value: T) => U): TList<U>`

Returns new list with all elements of the passed list parameter transformed via function f.

Complexity O(n). Immutable function.

```javascript
toArray(map(fromArray([1, 2, 3]), (x) => x * 10)); // [10, 20, 30]
```

### `filter<T>(list: TList<T>, pred: (value: T) => boolean): TList<T>`

Creates new list with removed values for which pred(value) return false.

Complexity O(n). Immutable function.

```javascript
toArray(
    filter(fromArray([1,2,3]), x => x % 2 === 1
) // [1, 3]
```

### `toArray<T>(list: TList<T>): T[]`

Transforms list to array.

```javascript
toArray(append(empty, 1)); // [1]
```

### `fromArray<T>(arr: T[]): TList<T>`

Transforms array to list

```javascript
fromArray([1, 2, 3]);
// { value: 1, next: { value: 2, next: { value: 3, next: null }}}
```
