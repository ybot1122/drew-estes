const objectToArray = (data) => {
  const result = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      result.push(data[key]); 
    }
  }
  return result;
}

export default objectToArray;
