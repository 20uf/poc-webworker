(function () {

    const EVENTS = {
        hello: 'app.event.hello',
        great: 'app.event.great'
    };

    if (window.Worker) {

        var myWorker = null;

        var startButton = document.querySelector('#start_worker');
        startButton.addEventListener('click', function() {
            if (myWorker === null) {
                myWorker = new Worker("assets/js/worker.js");

                // Handle message from worker
                myWorker.onmessage = function (e) {
                    var event = e.data;

                    switch (event.name) {
                        case EVENTS.great:
                            jQuery('.container-alerts').after(function () {
                                return '<div class="alert alert-success" role="alert">Hello' + event.param.name + ' !</div>'
                            });
                            break;
                        case EVENTS.hello:
                            jQuery('.container-alerts').after(function () {
                                return '<div class="alert alert-info" role="alert">Hello all !</div>'
                            });
                            break;
                        default:
                            console.log('Worker > ', event);
                    }
                };
            }
        });

        var pingButton = document.querySelector('#ping_worker');
        pingButton.addEventListener('click', function() {
            if (myWorker !== null) {
                myWorker.postMessage("Ping");
            }
        });

        var stopButton = document.querySelector('#stop_worker');
        stopButton.addEventListener('click', function() {
            if (myWorker !== null) {
                myWorker.terminate();
                myWorker = null;
            }
        });
    }

})();