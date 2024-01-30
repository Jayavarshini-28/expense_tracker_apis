const {MongoClient}=require('mongodb')
let db
function connectToDb(startServer){
    MongoClient.connect('mongodb+srv://varshini:Jaya@cluster0.ckfyjoo.mongodb.net/ExpenseTracker?retryWrites=true&w=majority').then(function(client){ //database connect url/database name
     db=client.db()
       return startServer()//corect conenction establish
    
}).catch (function(error){

    return startServer(error)

})                          //catch-error catch(soemtimes database connection exstablish error-catch use)
}
function getDb(){
    return db
}
module.exports={connectToDb,getDb}