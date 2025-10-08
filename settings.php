<?php
defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage(
        'local_chatbot_ai',
        get_string('pluginname', 'local_chatbot_ai')
    );

    $settings->add(new admin_setting_configpasswordunmask(
        'local_chatbot_ai/api_key',
        get_string('api_key', 'local_chatbot_ai'),
        get_string('api_key_desc', 'local_chatbot_ai'),
        ''
    ));

    $settings->add(new admin_setting_configtext(
        'local_chatbot_ai/api_model',
        get_string('api_model', 'local_chatbot_ai'),
        get_string('api_model_desc', 'local_chatbot_ai'),
        'gemini-2.0-flash'
    ));

    $settings->add(new admin_setting_configcolourpicker(
        'local_chatbot_ai/primary_color',
        get_string('primary_color', 'local_chatbot_ai'),
        get_string('primary_color_desc', 'local_chatbot_ai'),
        '#2563eb'
    ));

    $ADMIN->add('localplugins', $settings);
}