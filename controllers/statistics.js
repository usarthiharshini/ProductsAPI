const Product = require('../model')
const getNumberFromMonth = require('./month')

const statisticsFun = async function(req,res){
    const month_name = req.query.month;
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
              _id: null,
              total_sale_amount:{ $sum: {$cond:[{$eq:["$sold",true]},"$price",0]}} ,
              total_sold: { $sum: {$cond:[{$eq:["$sold",true]},1,0]}},
              total_unsold: { $sum: {$cond:[{$eq:["$sold",false]},1,0]}}
            }
          }
    ] 

  )

   
    res.send({
     statistics:{
      total_sale_amount: products[0].total_sale_amount,
      items_sold : products[0].total_sold,
      items_not_sold: products[0].total_unsold
    }});
}


module.exports= statisticsFun;