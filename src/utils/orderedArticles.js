// returns array of the articles sorted starting with most recent
const _orderedArticles = (data) => {
  let result = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      result.push(data[key]);
    }
  }
  return result.sort((a, b) => {
    return b.published - a.published;
  });
}

export default _orderedArticles;