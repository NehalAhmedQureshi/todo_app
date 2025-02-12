export function handleCardAdder(e, list,setTextField,textField,setList){
    e.preventDefault();
    if (textField[list]) {
      setList((prev) => ({
        ...prev,
        [list]: [...prev[list], textField[list]],
      }));

      setTextField({}); // Reset input field
    }
  };