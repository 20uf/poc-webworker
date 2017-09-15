<?php

namespace App\Http;

use App\Event\EventFactory;
use Silex\Provider\TwigServiceProvider;

/**
 * Class Application
 * @package App\Http
 */
class Application
{
    /**
     * @var \Silex\Application
     */
    protected $app;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->app = new \Silex\Application();
        $this->app['debug'] = true;

        $this->initProviders();
        $this->initRoutes();
    }

    /**
     * Run my App.
     */
    public function run()
    {
        $this->app->run();
    }

    private function initProviders()
    {
        $this->app->register(new TwigServiceProvider(), array(
            'twig.path' => __DIR__.'/../../templates',
        ));
    }

    /**
     * Init Routes.
     */
    private function initRoutes()
    {
        $this->app->get('/', function () {
            return $this->app['twig']->render('index.html.twig');
        });

        $this->app->get('/eventsource', function () {
            $factory = new EventFactory();

            return $this->app->stream(function () use ($factory) {

                $json = json_encode($factory->create());

                echo "data: {$json}\n\n";
                echo "retry: 1000\n\n";
            }, 200, ['content-type' => 'text/event-stream']);
        });

        $this->app->get('/hello', function () {
            return $this->app->json(['ok']);
        });
    }
}
