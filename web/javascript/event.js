function anotherEventListener(typeOfEvent, callback) {

    var anEvent = {
        eventType: "keypress"
    };

    if (anEvent.eventType === typeOfEvent) {
        callback(anEvent);
    }
}

anotherEventListener("keypress", function (event) {
    console.log(event);
});
