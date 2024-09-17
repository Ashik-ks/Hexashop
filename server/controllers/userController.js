const products = require('../db/model/products');
const { error_function, success_function } = require('../utils/response-handler')

exports.createProduct = async function (req,res)  {
    try {
        let body = req.body;
        console.log("body : ", body);


        let new_product = await products.create(body);
        console.log("new_product : ",new_product)

        if (new_product) {

            let response = success_function({
                statuscode: 200,
                message: "product created successfully"
            })
            res.status(response.statuscode).send(response);
            return;
        }

        else{
            let response = error_function({
                statuscode: 400,
                message: "product created failed"
            })
            res.status(response.statuscode).send(response);
            return;
        }
    } catch (error) {
        let response = error_function({
                statuscode: 400,
                message: "product created failed"
            })
            res.status(response.statuscode).send(response);
            return;
    }
}

exports.getallProducts = async function (req,res) {
    try {
        let products_data = await products.find();
        console.log("products_data : ",products_data);

        let response = success_function({
            statuscode: 200,
            message: products_data,
        })
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        
        let response = error_function({
            statuscode: 400,
            message: "user created failed"
        })
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.getsingleproduct = async function (req,res) {

     try {
        let id  = req.params.id;
     console.log ("id : ", id);

     let products_data = await products.findOne({ _id: id });
     console.log("user_data7 : ", products_data);
     

     let response = success_function({
        statuscode: 200,
        message: products_data
    })
    res.status(response.statuscode).send(response);
    return;

     } catch (error) {
        let response = error_function({
            statuscode: 400,
            message: "user created failed"
        })
        res.status(response.statuscode).send(response);
        return;
     }

}

exports.updateproduct = async function (req,res) {
    try {

        let body = req.body;
        console.log("body : ",body);

        let updated_datas = {
            name: body.name,
            image: body.image,
            price: body.price,
            category: body.category,
            rating: body.use,
            description: body.description,
        }

        let id = req.params.id;
        console.log("id : ",id,typeof (id));

        let updatedata = await products.updateOne({ _id: id }, { $set: updated_datas });
        console.log("editdata", updatedata);

        let response = success_function({
            statuscode: 200,
            message: updatedata
        })
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        let response = error_function({
            statuscode: 400,
            message: "user created failed"
        })
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.deleteproduct = async function (req,res) {
    try {
         let id = req.params.id;
         console.log("id : ",id);

         let deletedata = await products.deleteOne({ _id: id });
        console.log("editdata", deletedata);

        let response = success_function({
            statuscode: 200,
            message: deletedata
        })
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        let response = error_function({
            statuscode: 400,
            message: "user created failed"
        })
        res.status(response.statuscode).send(response);
        return;
    }
}