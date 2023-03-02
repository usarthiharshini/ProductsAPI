const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const Product = require('./model')
const statisticsFun = require('./controllers/statistics')
const barchart = require('./controllers/barchart');
const piechart = require('./controllers/piechart');
const allFun = require('./controllers/all');


/* API to initialize the database */

router.route('/').get(async (req,res)=>{


  try {
    await Product.deleteMany();
 

    const data = await  getData();
      await  Product.insertMany(data);
      res.status(200).send({
          status: "success",
          message: " Data initialized successfully",
          data: data
      });
  } catch (error) {
     res.status(500).json({
      message: "Something went wrong"
     })
  }

    
});



router.route('/all/:month').get(allFun)


/* API for statistics */

router.route('/statistics/:month').get(statisticsFun)
  




/* API for bar chart */

router.route('/barchart/:month').get(barchart)

/* API for pie chart */

router.route('/piechart/:month').get(piechart)



const getData = async ()=>{
    const data = await axios.get(`https://s3.amazonaws.com/roxiler.com/product_transaction.json`);
 
    console.log(data.data);
    return data.data;
}



module.exports= router;