export function handleCardAdder(e, list,setTextField,textField,setLists){
    e.preventDefault();
    if (textField[list]) {
      setLists((prev) => ({
        ...prev,
        [list]: [...prev[list], textField[list]],
      }));

      setTextField({}); // Reset input field
    }
  };