// const db = require("../../models")

// const Tutorial = db.tutorials;

const Orders = require("../../models/order.model")


const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
   
    let path =
      // __basedir + "/staffbackend/resources/static/assets/uploads/" + req.file.filename;
      __basedir + "/app/resources/static/assets/uploads/" + req.file.filename;
      // __basedir + process.env.FILES_PATH + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let orders = [];
 
      rows.forEach((row) => {
        var id = 'ORDER' + '-' + Math.floor(Math.random() * 100000) ;
        const today = new Date()

        let order = {
          order_id: id,
          names: row[0],
          phone_number: '+221' + ' ' + row[1],
          address: row[2],
          quantity1: row[3],
          brand1: row[4],
          model1: row[5],
          watch_price1: row[6],
          quantity2: row[7],
          brand2: row[8],
          model2: row[9], 
          watch_price2: row[10],
          quantity3: row[11],
          brand3: row[12],
          model3: row[13],
          watch_price3: row[14],
          // delivery_price: row[12],
          order_date: row[15],
          order_treatement: 'not-treated',
          payment_status: 'unpaid',
          registration_date: today
        };

        orders.push(order);
      }); 

      Orders.bulkCreate(orders)
        .then(() => {
          res.status(200).send({
            message: req.file.originalname + "Téléchargement réussi" ,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",  
            error: error.message, 
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};
module.exports = {
  upload
};