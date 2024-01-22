const express = require("express")
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://chetan95497:LU02D4EANxSIvnOJ@usercluster.tixrp2n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "userData";
const router = express.Router();

router.get("/data", async (req, res)=> {
    try{
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("details");
        const cursor = col.find({});
        const allValues = await cursor.toArray();
        res.send(allValues);
    } catch(error){
        console.log("error:", error);
    } finally{
        client.close();
    }

})
router.post("/send", async(req, res) => {
    const data = req.body;
    try{
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("details");
        const result = await col.insertOne({
            name: data.name,
            phoneNumber: data.phoneNumber,
            email: data.email,
            hobbies: data.hobbies
        });
    } catch(error){
        console.log("eror: ", error);
    } finally{
        client.close();
    }
})
// router.post(`/delete/${id}`, async(req, res)=>{
//     try{
//         await client.connect();
//         const db = client.db(dbName);
//         const col = db.collection("details");
//         const result = await col.deleteOne({
//             _id: id
//         });
//     } catch(error){
//         console.log("eror: ", error);
//     } finally{
//         client.close();
//     }
// })

// async function sendData(dataScheme){
//     try{
//         client.connect();
//         const db = client.db(dbName);
//         const col = db.collection("details");
//         const result = await col.insertOne(dataScheme);
//         console.log("a document was created");
//     } catch(error){
//         console.log("eror: ", error);
//     } finally{
//         client.close();
//     }
// }



module.exports = router;

// async function run(){
//     try{
//         await client.connect();
//         const db = client.db(dbName);
//         const col = db.collection("details");
//         let personDoc = {       
//                 "name": "gagan",
//                 "phoneNumber":"9602866736",
//                 "email": "chetan95497@gmail.com",
//                 "hobbies": "development and design"
//         }
//         const p = await col.insertOne(personDoc);
//         const filter = { "name": "gagan" };
//          const document = await col.findOne(filter);
//          console.log("Document found:\n" + JSON.stringify(document));
//     } catch(error){
//         console.log(error.stack);
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);