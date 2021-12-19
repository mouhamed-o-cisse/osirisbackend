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
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

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
          brand1: row[3],
          model1: row[4],
          watch_price1: row[5],
          brand2: row[6],
          model2: row[7], 
          watch_price2: row[8],
          brand3: row[9],
          model3: row[10],
          watch_price3: row[11],
          // delivery_price: row[12],
          order_date: row[12],
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