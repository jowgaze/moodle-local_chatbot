<?php
defined('MOODLE_INTERNAL') || die();

function local_chatbot_ai_before_footer()
{
    global $PAGE, $OUTPUT;

    $PAGE->requires->js(new moodle_url('/local/chatbot_ai/scripts/script.js'));
    $config = get_config('local_chatbot_ai');

    $data = [
        'title' => get_string('title', 'local_chatbot_ai'),
        'prompt_placeholder' => get_string('prompt_placeholder', 'local_chatbot_ai'),
        'send_button' => get_string('send_button', 'local_chatbot_ai'),
        'loading_text' => get_string('loading_text', 'local_chatbot_ai'),
        'primary_color' => $config->primary_color ?? '#2563eb',
    ];
    echo $OUTPUT->render_from_template('local_chatbot_ai/chatbot', $data);
}