const express=require("express");

const mongoose=require("mongoose");

const app=express();

const connect=()=>{
    mongoose.connect("mongodb://localhost:27017/library")
}

const sectionschema=mongoose.Schema({
    sectionName:{type:String,required:true}
},{
    timestamps:true

})
const Sections=mongoose.model("section", sectionschema)

const bookschems=mongoose.Schema({
    bookName:{type:String,required:true},
    body:{type:String,required:true},
    sectionId:{type:mongoose.Schema.Types.ObjectId,ref:"section",required:true}
},{
    timestamps:true
})

const Books=mongoose.model("Book",bookschems)


const authorschema=mongoose.Schema({
    authorName:{type:String,required:true}
},{
    timestamps:true
});

const Authors=mongoose.model("author",authorschema)

const bookauthorschema=mongoose.Schema({
    bookID:{type:mongoose.Schema.Types.ObjectId,ref:"Book",required:true},
    authorId:{type:mongoose.Schema.Types.ObjectId,ref:"author",required:true}
})

const BookAuthor=mongoose.model("bookauthor",bookauthorschema)


app.get("/sections",async(req,res)=>{
    try{
        const sections = await Sections.find().populate({path:"bookId",select:{"_id":1,"bookName":1,"authorId":1}}).lean().exec();
        return res.status(200).send(sections);
    }
    catch(error){
        
        return res.status(500).send("Something went wrong");
    }

})


app.post("/sections",async(req,res)=>{
    try{
        const sections = await Sections.create(req.body);
        return res.status(200).send(sections);
    }
    catch(error){
        
        return res.status(500).send("Something went wrong");
    }
})


app.patch("/sections/:id",async(req,res)=>{
    try{
        const sections = await Sections.findByIdAndUpdate(req.params.id, req.body, {new:true});
        return res.status(200).send(sections);
    }
    catch(error){
        
        return res.status(500).send("Something went wrong");
    }
});

app.get("/sections/:id",async(req,res)=>{
    try{
        const sections = await Sections.findById(req.params.id).lean().exec();
        return res.status(200).send(sections);
    }
    catch(error){
    
        return res.status(500).send("Something went wrong");
    }
})

app.delete("/sections/:id",async(req,res)=>{
    try{
        const sections = await Sections.findByIdAndDelete(req.params.id);
        return res.status(200).send(sections);
    }
    catch(error){
        
        return res.status(500).send("Something went wrong");
    }
});


app.get("/books",async(req,res)=>{
    try{
        const books = await Books.find().populate({path:"sectionId",select:["section"]}).lean().exec();
        return res.status(200).send(books);
    }
    catch(error){
        
        return res.status(5000).send("Something went wrong");
    }
})

app.post("/books",async(req,res)=>{
    try{
        const books = await Books.create(req.body);
        return res.status(200).send(books);
    }
    catch(error){
        
        return res.status(5000).send("Something went wrong");
    }
})

app.patch("/books/:id",async(req,res)=>{
    try{
        const books = await Books.findByIdAndUpdate(req.params.id, req.body, {new:true});
        return res.status(200).send(books);
    }
    catch(error){
    
        return res.status(5000).send("Something went wrong");
    }
})



app.get("/books/:id",async(req,res)=>{
    try{
        const books = await Books.findById(req.params.id).populate({path:"sectionId",select:["section"]}).lean().exec();
        return res.status(200).send(books);
    }
    catch(error){

        return res.status(5000).send("Something went wrong");
    }
})

app.get("/books/:id/author",async(req,res)=>{
    try{
        const books = await Books.find({authorId:req.params.id});
        return res.status(200).send(books);
    }
    catch(error){
        
        return res.status(5000).send("Something went wrong");
    }
})

app.get("/books/:id/section",async(req,res)=>{
    try{
        const books = await Books.find({sectionId:req.params.id});
        return res.status(200).send(books);
    }
    catch(error){
        
        return res.status(5000).send("Something went wrong");
    }
});


app.get("/authors",async(req,res)=>{
    try{
        const authors = await Authors.find().populate({path:"bookId",select:{"bookName":1,"sectionId":1,"_id":0},populate:{path:"sectionId",select:{"section":1,"_id":0}}}).lean().exec();
        return res.status(200).send(authors);
    }
    catch(error){
        
        return res.status(5000).send("Something went wrong");
    }
})


app.post("/authors",async(req,res)=>{
    try{
        const authors = await Authors.create(req.body);
        return res.status(200).send(authors);
    }
    catch(error){
    
        return res.status(5000).send("Something went wrong");
    }
})

app.patch("/authors/:id",async(req,res)=>{
    try{
        const authors = await Authors.findByIdAndUpdate(req.params.id, req.body,{new:true});
        return res.status(200).send(authors);
    }
    catch(error){
        
        return res.status(5000).send("Something went wrong");
    }
});

app.get("/authors/:id",async(req,res)=>{
    try{
        const authors = await Authors.findById(req.params.id).populate({path:"bookId",select:{"bookName":1,"secId":1,"_id":0},populate:{path:"sectionId",select:{"section":1,"_id":0}}}).lean().exec();
        return res.status(200).send(authors);
    }
    catch(error){
        
        return res.status(5000).send("Something went wrong");
    }
})






app.listen(7500,async()=>{

    try{

        await connect();

    }catch(err){
        console.log(err)
    }
    console.log("app is listening on 7500")

})