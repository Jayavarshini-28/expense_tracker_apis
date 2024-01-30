const express=require('express')
const bodyparser=require('body-parser')
const app=express()
const {connectToDb,getDb}=require('./db.cjs')
const {ObjectId}=require ('mongodb')
app.use(express.static(__dirname))
app.use(bodyparser.json())
//cnecting to server
let db
connectToDb(function(error){
    if(!error){
    app.listen(8089)
    console.log("listening on port 8089...")
    db=getDb()
    }
    else{
        console.log(error)
        
    }
})
/** 
 * get-entries:fetching all data in database
 * add entries
 * delete entries
 * edit entries
 */
//add entries
app.post('/verify-user' ,function(request,response){
    //datbase data enter
    db.collection('ExpenseData').insertOne(request.body).then(function(){
        response.status(200).json({
            'status':'data successfully entered'
        })
    }).catch(function(error){
        response.status(500).json({
            'error':error
        })
    })


})
app.get('/get-data',function(request,response){
    const entries=[]
    db.collection('ExpenseData')
    .find()
    .forEach(Entry=>{console.log(Entry)
        entries.push(Entry)
        })
    .then(function(){
        response.status(200).json(entries)
    }).catch(function(error){
        response.status(404).json({
            'error':error
            
        })
    })


})
app.patch('/update-entry', function(request, response) {
    if(ObjectId.isValid(request.body.id)) {
        db.collection('ExpenseData').updateOne(
            {_id: new ObjectId(request.body.id)},
            {$set : request.body.data}
        ).then(function() {
            response.status(201).json({
                'status' : 'data successfully updated'
            })
        }).catch(function(error) {
            response.status(500).json({
                'error' : error
            })
        })
    } else {
        response.status(500).json({
            'status' : 'ObjectId not valid'
        })
    }
})
app.delete('/delete-entry', function(request, response) {
    // db.collection('').deleteOne({_id: new ObjectId()})
    if(ObjectId.isValid(request.body.id)){
        db.collection('ExpenseData').deleteOne({
            _id : new ObjectId(request.body.id)
        }).then(function() {
            response.status(201).json({
                'status' : 'data successfully deleted'
            })
        }).catch(function(error) {
            response.status(500).json({
                'error' : error
            })
        })
    } else {
        response.status(500).json({
            'status' : 'ObjectId not valid'
        })
    }
})

