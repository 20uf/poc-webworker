
/**
 * @constructor
 */
HelloWorker = function () {
    this.eventSource = null;
    this.messages = [];
};

HelloWorker.prototype.init = function () {

    this.eventSource = new EventSource('http://localhost:8088/index.php/eventsource');
    this.eventSource.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (data !== null) {
            postMessage(data); // Send event to main script
        }
    };
};

// When main script send message
HelloWorker.prototype.onmessage = function (e) {

    const req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8088/index.php/hello', false);
    req.send(null);

    if (req.status === 200) {
        console.log("Réponse reçue: %s", req.responseText);
    } else {
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
    }
};


HelloWorker.prototype.addMessage = function (message) {
    this.messages.push(message);
};

// RUNNING WORKER //

(function (){

    var worker = new HelloWorker();
    //onmessage = worker.onmessage; // Forward event to worker

    onmessage = function (e) {
        worker.onmessage(e);

        worker.addMessage(e.data);
        console.log(worker.messages);
    };

    worker.init();
})();
