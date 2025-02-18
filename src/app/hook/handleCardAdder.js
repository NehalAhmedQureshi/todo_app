export function handleCardAdder(e, list,setTextField,textField,setList,select,lists,setError){
  lists[list]?.map((list , index)=>{
    let {name} = list
    if (name === textField[list]){
      setError((prev)=> ({...prev , card :'Card already exists.'}))
      return
    }
  })
    e.preventDefault();
    if (textField[list]) {
      setList((prev) => ({
        ...prev,
        [list]: [...prev[list], {name:textField[list],priority:select}],
      }));

      setTextField({}); // Reset input field
    }
  };