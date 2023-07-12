import mongoose from "mongoose";

const ticketSchema=new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    tickets: {type:[[[Number]]],required:true}
})

const ticketCollection=mongoose.model('ticketCollection',ticketSchema);

export default ticketCollection;