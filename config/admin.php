<?php

/*
| Dummy moderator credentials for the front-end-only admin panel.
| Replace with real authentication once the backend is wired up.
*/

return [
    'email' => env('ADMIN_EMAIL', 'moderator@zawjan.id'),
    'password' => env('ADMIN_PASSWORD', 'password'),
    'name' => env('ADMIN_NAME', 'Moderator'),
];
