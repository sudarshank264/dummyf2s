import mongoose from 'c:/Users/sudar/OneDrive/Desktop/backendf2s/node_modules/mongoose/index.js';
mongoose.connect('mongodb://127.0.0.1:27017/f2s_skorasoft').then(async () => {
  const blogs = await mongoose.connection.collection('blogs').find({}).toArray();
  console.log(JSON.stringify(blogs, null, 2));
  process.exit(0);
});
