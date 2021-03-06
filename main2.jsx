
function SubForm(props) {
  useExecOnce(() => {
    console.log("Calling SubForm2 API once..")
  })
  const state = props.state
  return (
  <div style={{border: "solid red 1px"}} >
    <div>Key1 = {props.state.get('key1')} </div>
    <input
        value={props.state.get('key1')}
        onChange={props.state.setter('key1')}
      />
    <div>
      <input />
    </div>
    <div>
      <input value={state.get('list').get(0).get('k1').get('a')}
              onChange={state.get('list').get(0).get('k1').setter('a')} />
    </div>
    <div>
      deep-key = {state.get('list').get(0).get('k1').get('a')}
    </div>
  </div>
  );
}

function MyForm2(props) {
  const state = useDictState({
    age: 20,
    list: [3,4,5],
    remaining_age: 80
  })
  useEffectOnChange(() => {
    console.log("List React.useEffect")
  }, [state.get("list")])

  useEffectOnChange(() => {
    console.log("Age React.useEffect")
    state.set("remaining_age", 100 - state.get("age"))
  }, [state.get("age")])

  return (
    <div style={{border: "solid red 1px"}} >
        <div>Stringify = {Stringify(state.get("list"))}</div>
        <div>Age = {state.get('age')} </div>
        <div>Remaining Age = {state.get('remaining_age')} </div>
        <button onClick={()=>state.get("list").push(33)} >state.List.push</button>
        <div>
          <input type="number" value={state.get('age')} onChange={state.setter('age')} />
        </div>
    </div>
  );
}

function MyForm() {
  console.log("MyForm Func Called.")
  const state = useDictState({
    counter: 2,
    name: "Mohit",
    list: [{k1: {a: 11, b: 22}, k2: false}],
    list2: [11, 22, 33, 44],
    list3: [{c: true}, {c: true}, {c: true}],
    key1: "ABC",
    key2: "DEF",
  })

  useExecOnce(() => {
    console.log("Calling MyForm API once..")
    api("/my_name", {}, function(d) {
      console.log(d)
      state.set('name', d.name)
    })
  })

  return (
    <div>
      <div>{state.get('name')}</div>
      <div>{state.get('counter')}</div>
      <label>
        Enter your name:
        <input
          type="text"
          value={state.get('name')}
          onChange={state.setter("name")}
        />
      </label>
      <button onClick={DefaultPrevented(() => state.set('counter', x => x+1))} >Click</button>
      <div>
        <input value={state.get('key1')} onChange={state.setter('key1')} />
      </div>
      <div>
        <input value={state.get('key2')} onChange={state.setter('key2')} />
      </div>
      <div>
        <input value={state.get('list').get(0).get('k1').get('a')}
                onChange={state.get('list').get(0).get('k1').setter('a')} />
      </div>
      <div>
        list.length = {state.get('list').length()}
      </div>
      {
        state.get('list2').map(x => <div>{x}</div>)
      }
      {
        state.get('list3').map(x => (
          <div><button style={{backgroundColor: x.get("c") ? "blue": "red"}} onClick={()=>{x.set("c", !x.get("c"))}} >Click</button></div>
          ))
      }
      <div>
        Key1 = {state.get('key1')}
      </div>
      <div>
        Key2 = {state.get('key2')}
      </div>
      <div>
        deep-key = {state.get('list').get(0).get('k1').get('a')}
      </div>
      {state.get('counter') % 5 !=0 &&
        <SubForm state={state} />
      }
    </div>
  );
}

function Main() {
  return (
    <div>
      {" "}
      <h1>Hello {4 + 5} World!</h1>
      <MyForm2 />
      <MyForm />
    </div>
  );
}

