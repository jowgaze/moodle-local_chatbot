<?php
defined('MOODLE_INTERNAL') || die();

$capabilities = [
    'local/chatbot_ai:view' => [
        'captype'     => 'read',
        'contextlevel'=> CONTEXT_SYSTEM,
        'archetypes'  => [
            'user'  => CAP_ALLOW,
        ],
    ],
];