<?php

namespace App\Event;

use App\AppEvent;

/**
 * Class EventFactory
 * @package App\Event
 */
class EventFactory
{
    /**
     * @return array|null
     */
    public static function create()
    {
        $i = rand(0, 10);

        if ($i > 8) {
            return [
                'name' => AppEvent::GREAT,
                'param' => ['name' => 'Viktor']
            ];
        } elseif ($i < 2) {
            return ['name' => AppEvent::HELLO];
        }

        return null;
    }
}