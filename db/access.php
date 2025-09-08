<?php
defined('MOODLE_INTERNAL') || die();

$capabilities = [
    'local/botao:view' => [
        'captype'     => 'read',
        'contextlevel'=> CONTEXT_SYSTEM,
        'archetypes'  => [
            'guest' => CAP_ALLOW,
            'user'  => CAP_ALLOW,
        ],
    ],
];