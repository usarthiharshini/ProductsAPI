const { default: axios } = require('axios');

const allFun = async(req,res)=>{
   const month_name = req.param.month;
   


   const statistics_url = `https://distinct-hosiery-tuna.cyclic.app/statistics?month=${month_name}`
   const barchart_url = `https://distinct-hosiery-tuna.cyclic.app/barchart?month=${month_name}`
   const piechart_url = `https://distinct-hosiery-tuna.cyclic.app/piechart?month=${month_name}`


   const statistics_data = await axios.get(statistics_url)
   const barchart_data = await axios.get(barchart_url)
   const piechart_data = await axios.get(piechart_url)


 

res.send(
    { month : month_name,
     statistics:   statistics_data.data.statistics  ,
    barchart:    barchart_data.data.barchart,
    piechart:    piechart_data.data.piechart
}
)

}

module.exports = allFun;