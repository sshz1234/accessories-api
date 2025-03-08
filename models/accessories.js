import mongoose,{Mongoose} from "mongoose";

const accessorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0.01,
        max: 50
    },
    rating:{
        type:Number,
        min:1,
        max: 5, 
    },
    category:{
        type:String,
        required:true
    }

});

const Accessories = mongoose.model('Accessory',accessorySchema);
export default Accessories;