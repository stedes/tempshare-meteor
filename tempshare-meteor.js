Rooms= new Mongo.Collection("rooms");

if (Meteor.isClient) {
  Template.body.helpers({
    rooms: function(){
      return Rooms.find({});
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
  })
}
