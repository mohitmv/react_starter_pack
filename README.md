## React Starter pack

A collection of react utilities, helpful for react beginners before they dive deep.

[Checkout this tutorial](https://github.com/tinytrashbin/react_and_angularjs_short_notes/blob/master/README.md) to see how this library makes it super easy to learn and build with React.

`useDictState` is the most useful utility implemented by this library. See [example-8](https://github.com/tinytrashbin/react_and_angularjs_short_notes/blob/master/README.md#8-usedictstate-hook), [example-9](https://github.com/tinytrashbin/react_and_angularjs_short_notes/blob/master/README.md#9-usedictstate-hook-and-input), [example-10](https://github.com/tinytrashbin/react_and_angularjs_short_notes/blob/master/README.md#10-complex-and-nested-usedictstate-hook) in the tutorial above to understand it's usage. `useDictState` is a wrapper over React's `useState` hook, which enables developers to maintain very complex and nested states, without having to worry about state-mutation mistakes.

1). Declare state like this:

```JSX
const state = useDictState({
    name: "A",
    tasks: [{name: "Task1"}, {name: "Task2"}]
})
```

2). Mutate it like this:

```JSX
// 1.
state.get("tasks").get(0).set("name", "Task1 New Name");

// 2.
state.get("tasks").push({name: "Task 3"})
```

3). Access it like this:

```JSX
<div>Name = {state.get("name")}</div>
```

### Other useful utilities:

1). `useExecOnce`, `useEffectOnChange`

2). `api(...)` for making API call.

3). A few more. [Learn about them here](https://github.com/tinytrashbin/react_and_angularjs_short_notes/blob/master/README.md).


### See a complex example:

See [live demo](https://mohitmv.github.io/react_starter_pack/) of `main2.jsx` for an comprehensive example.
