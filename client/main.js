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
  ,
  selectedClass: function(){
    var roomId = this._id;
    var selectedRoom = Session.get('selectedRoom');
    if(roomId === selectedRoom) {return "selected"};
  }
});

Template.createRoom.helpers({

});

Template.fileUpload.helpers({
  selectedRoom: function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne(selectedRoom);
  }

});

Template.imagelist.helpers({
  image: function(){
    return Images.find({});
  }
});


Template.roomlist.events({
  "click .delete": function(event){
    Rooms.remove(this._id)
  }
  ,
  "click .room": function(event){
    var roomId = this._id;
    var selectedRoom = Session.get('selectedRoom');
    if(typeof selectedRoom === "undefined"){
      Session.set('selectedRoom', roomId);
    }
    else if( selectedRoom !== roomId){
      Session.set('selectedRoom', roomId);
    }
    else {
      Session.set('selectedRoom', undefined);
    }

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
    var roomIdVar = Session.get('selectedRoom');
    FS.Utility.eachFile(event, function(file) {
      var newFile = new FS.File(file);
      newFile.metadata = {roomId : roomIdVar}
      Images.insert(newFile, function (err, fileObj) {
        if (err){console.log("Error in upload")}
        else {console.log("Upload successful")};
      });
    });

  }
});
