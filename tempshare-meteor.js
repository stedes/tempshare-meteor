// MongoDB collection for the rooms
Rooms= new Mongo.Collection("rooms");

// Storing files with CollectionFS and GridFS
var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images",{
  stores: [imageStore]
});


if (Meteor.isClient) {
  Template.body.helpers({
    rooms: function(){
      return Rooms.find({});
    },

    images: function(){
      return Images.find({});
    },

    numberOfRooms: function(){
      return Rooms.find({}).count();
    }

  });

  Template.body.events({
    "submit .create-room": function(event){
      //Store Room name and save in MongoDB
      var room_name = event.target.text.value;
      Rooms.insert({
        room_name: room_name,
        createdAt: new Date()
      });
      //Clean up
      event.target.text.value = "";
      return false;

    }
  });

  Template.room.events({
    "click .delete": function(event){
      Rooms.remove(this._id)
    }
  });


  Template.fileUpload.events({
    "change .myFileInput": function(event, template) {
      console.log("upload initiated");
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){console.log("Error in upload")}
          else {"Upload successful"};
        });
      });

    }
  });
}
