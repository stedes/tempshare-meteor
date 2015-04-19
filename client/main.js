Meteor.subscribe('theRooms');
Meteor.subscribe('theImages');


Template.roomlist.helpers({
  room:function(){
    return Rooms.find({});
  }
  ,
  numberOfRooms: function(){
    return Rooms.find({}).count();
  }
});

Template.createRoom.helpers({

});

Template.fileUpload.helpers({

});

Template.imagelist.helpers({
  image: function(){
    return Images.find({});
  }
})

Template.roomlist.events({
  "click .delete": function(event){
    Rooms.remove(this._id)
  }
});

Template.createRoom.events({
  "submit form": function(event){
    event.preventDefault();
    //Store Room name and save in MongoDB
    var roomNameVar = event.target.addRoom.value;
    console.log(roomNameVar);
    Meteor.call('addRoom', roomNameVar);

    //Clean up
    event.target.addRoom.value = "";
    return false;
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
