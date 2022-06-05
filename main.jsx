
function SubForm(props) {
  React.useEffect(() => {
    console.log("Calling SubForm2 API once..")
  }, [])
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
  </div>
  );
}

function MyForm() {
  console.log("MyForm Func Called.")
  const state = useDictState({
    counter: 2,
    name: "Mohit",
    key1: "ABC",
    key2: "DEF",
  })

  React.useEffect(() => {
    console.log("Calling MyForm API once..")
    api("/my_name", {}, function(d) {
      console.log(d)
      state.set('name', d.name)
    })
  }, [])

  return (
    <form>
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
        Key1 = {state.get('key1')}
      </div>
      <div>
        Key2 = {state.get('key2')}
      </div>
      {state.get('counter') % 5 !=0 &&
        <SubForm state={state} />
      }
    </form>
  );
}

function Main() {
  return (
    <div>
      {" "}
      <h1>Hello {4 + 5} World!</h1>
      <MyForm />
    </div>
  );
}

