

function MakeImmutable(obj, setter) {
  const obj_type = obj.constructor.name
  if (obj_type === 'Array') {
    return ImmutableList(obj, setter)
  } else if (obj_type == 'Object') {
    return ImmutableDict(obj, setter)
  } else {
    return obj
  }
}

function EvalValueFuncIfCan(value, old_value) {
  if (typeof value == 'function') {
    if (old_value.constructor.name != 'Object' && old_value.constructor.name != 'Array') {
      return value(old_value)
    } else {
      throw "function can be passed in setter, only for mutating data types"
    }
  }
  return value
}

class ImmutableList {
  constructor(list, parent_setter) {
    this.list = list
    this.parent_setter = parent_setter
  }
  set(index, value) {
    value = EvalValueFuncIfCan(value, this.data[index])
    let list_copy = [...this.data]
    list_copy[index] = value
    this.parent_setter(list_copy)
    return list_copy
  }
  push(value) {
    let list_copy = [...this.data]
    list_copy.push(value)
    this.parent_setter(list_copy)
    return list_copy
  }
  setter(index) {
    return (event => this.set(index, event.target.value)).bind(this)
  }
  get(index) {
    let obj = this.list[index]
    return MakeImmutable(obj, (new_copy => this.set(index, new_copy)).bind(this))
  }
}

class ImmutableDict {
  constructor(dict, parent_setter) {
    this.dict = dict
    this.parent_setter = parent_setter
  }
  set(key, value) {
    value = EvalValueFuncIfCan(value, this.dict[key])
    let dict_copy = {...this.dict}
    dict_copy[key] = value
    this.parent_setter(dict_copy)
    return dict_copy
  }
  setter(key) {
    return function(event) {
      this.set(key, event.target.value)
    }.bind(this)
  }
  get(key) {
    return MakeImmutable(this.dict[key], (new_copy => this.set(key, new_copy)).bind(this))
  }
}

class DictState {
  constructor(dict_input) {
    this.main_dict = {}
    this.setter_dict = {}
    for (var k in dict_input) {
      const [value, setValue] = React.useState(dict_input[k])
      this.main_dict[k] = value
      this.setter_dict[k] = setValue
    }
  }
  get(key) {
    return MakeImmutable(this.main_dict[key], this.setter_dict[key])
  }
  set(key, value) {
    value = EvalValueFuncIfCan(value, this.main_dict[key])
    this.setter_dict[key](value)
  }
  setter(key) {
    return function(event) {
      this.set(key, event.target.value);
    }.bind(this)
  }
}

function useDictState(dict_input) {
  return new DictState(dict_input)
}

function DefaultPrevented(func) {
  return (event => {
    event.preventDefault()
    func(event)
  })
}
