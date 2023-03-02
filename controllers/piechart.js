const Product = require('../model')
const getNumberFromMonth = require('./month')


const piechart = async function(req,res){
    const month_name = req.params.month;
    const month_number=  getNumberFromMonth(month_name);
  
  
    const products = await  Product.aggregate(
      [
          {
              $match: {
                $expr: {
                  $eq: [ { $month: "$dateOfSale" },month_number  ]
                }
              }
  
            },
            {
              $group: {
                _id: "$category",
                count: {$sum : 1}
  
              }
            }
      ] 
  
    )
    console.log(products)
    
    const data = products.map((product)=>{
     let obj = {
      category: product._id,
      count: product.count
    }
    return obj
   })
   
   
   
    res.send({month : month_name,piechart:data});
  }
  module.exports = piechart;