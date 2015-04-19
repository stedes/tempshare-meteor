Meteor.publish('theRooms', function(){
  var currentUserId = this.userId;
  return Rooms.find({createdBy: currentUserId});
});

Meteor.publish('theImages', function(){
  return Images.find();
});

Meteor.methods({
  'addRoom': function(roomNameVar){
    var currentUserId = this.userId;
    console.log(roomNameVar)
    Rooms.insert({
      roomName: roomNameVar,
      createdAt: new Date(),
      createdBy: currentUserId
    });
  }

});
