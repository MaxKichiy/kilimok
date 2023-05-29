import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
    name: { type: String },
    description: {
        type: String,
    },
    imageUrl: { type: String },
    price: { type: String },
});

const Item = models.File || model("File", ItemSchema);

export default Item;
