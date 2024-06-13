import axios from 'axios'
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'

mongoose.connect('mongodb://127.0.0.1:27017/Task');
console.log('DB Connected .... ') ;


const port=process.env.port||3000;
const app=express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.listen(port,()=>{
    console.log(`SERVER IS RUNNING ON ${port}`)
})

const TransactionSchema=new mongoose.Schema({
  id: {
      type: Number,
      required: true,
      unique:true
  },
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  category: {
      type: String,
      required: true
  }, 
  sold: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true
  }
})
const Transaction=mongoose.model('transactions',TransactionSchema);

async function getPost()
{
    let url='https://s3.amazonaws.com/roxiler.com/product_transaction.json';
   const myPost = await axios.get(url);
   const data=  myPost.data;
   //console.log(response);

  await Transaction.insertMany(data);
  console.log('Data successfully saved to database');
}
getPost();

app.get('/api/posts', async (req, res) => {
    const posts = await Transaction.find();
    res.json(posts);
});
