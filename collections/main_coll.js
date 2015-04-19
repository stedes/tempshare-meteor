//Rooms collection
Rooms= new Mongo.Collection("rooms");

// Storing files with CollectionFS and GridFS
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/webprojects/tempshare-meteor/filestorage"})]
});
