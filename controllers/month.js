

const getNumberFromMonth = (month)=>{
    return new Date(`${month} 1 2023`).getMonth()+1;
  }
  module.exports = getNumberFromMonth