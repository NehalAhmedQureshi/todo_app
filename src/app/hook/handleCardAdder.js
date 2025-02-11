export function handleCardAdder(e, list,setTextField,textField,setList){
    console.log("🚀 ~ handleCardAdder ~ setList:", setList)
    console.log("🚀 ~ handleCardAdder ~ textField:", textField)
    console.log("🚀 ~ handleCardAdder ~ list:", list)
    e.preventDefault();
    if (textField[list]) {
      setList((prev) => ({
        ...prev,
        [list]: [...prev[list], textField[list]],
      }));

      setTextField({}); // Reset input field
    }
  };