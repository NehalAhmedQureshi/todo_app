export const handleChange = (event,setTextField) => {
    const { name, value } = event.target;
    setTextField((prev) => ({ ...prev, [name]: value }));
  };