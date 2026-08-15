//Creates and exports a mongoose model/blueprint
module.exports = mongoose => {
    const Tutorial = mongoose.model(
        "tutorial", //Name of the model
        mongoose.Schema( //Defines the structure and data types of the documents in the collection
            {
                title: String,
                description: String,
                published: Boolean
            },
            { timestamps: true } //Automatically adds two hidden fields to every document (createdAt and updatedAt)
        )
    );

    return Tutorial; //Closes definitions and returns configured Tutorial model
};