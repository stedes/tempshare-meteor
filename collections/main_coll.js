//Rooms collection
Rooms= new Mongo.Collection("rooms");

// Storing files with CollectionFS and GridFS
var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images",{
  stores: [imageStore]
});
