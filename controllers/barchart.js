
const Product = require('../model')
const getNumberFromMonth = require('./month')

const barchart = async function(req,res){
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
              
                 _0_100:   { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 0 ] }, { $lte: [ "$price", 100 ] } ] }, 1, 0 ] } }
                 ,
                 _101_200: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 101 ] }, { $lte: [ "$price", 200 ] } ] }, 1, 0 ] } }
                 ,
                 _201_300: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 201 ] }, { $lte: [ "$price", 300 ] } ] }, 1, 0 ] } }
                 ,
                 _301_400: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 301 ] }, { $lte: [ "$price", 400 ] } ] }, 1, 0 ] } }
                 ,
                 _401_500: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 401 ] }, { $lte: [ "$price", 500 ] } ] }, 1, 0 ] } }
                 ,
                 _501_600: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 501 ] }, { $lte: [ "$price", 600 ] } ] }, 1, 0 ] } }
                 ,
                 _601_700: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 601 ] }, { $lte: [ "$price", 700 ] } ] }, 1, 0 ] } }
                 ,
                 _701_800: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 701 ] }, { $lte: [ "$price", 800 ] } ] }, 1, 0 ] } }
                 ,
                 _801_900: { $sum: { $cond: [ { $and: [ { $gte: [ "$price", 801 ] }, { $lte: [ "$price", 900 ] } ] }, 1, 0 ] } }
                 ,
                 _901_above: { $sum:{$cond: [{ $gte: [ "$price", 901 ] },1,0]}  }
               }
             }
       ] 
   
     )
     
      const keys = Object.keys(products[0])
     const values = Object.values(products[0])
   
     const data = []
     for( let i=1;i<keys.length;i++ ){
       let p = keys[i].split('_')
      
           let obj = {
             price_range : `${p[1]}-${p[2]}`,
             count : values[i]
           }
           data.push(obj)
     }
    
   res.send({
  
     barchart : data
   });

}
module.exports = barchart