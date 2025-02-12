export const handleChange = (event,setTextField) => {
    const { name, value } = event.target;
    console.log(name , 'name')
    setTextField((prev) => ({ ...prev, [name]: value }));
  };