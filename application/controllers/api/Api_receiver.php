<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once APPPATH . '/controllers/api/Apibase.php';

//数据接收接口类
class Api_receiver extends Apibase {

    function __construct()
    {
        parent::__construct();
        $this->load->model('operation/receiver');
    }

    /**
     * h5 访问数据
     */
    public function access_h5_post()
    {
        $request_data = $this->input->post(array('title', 'url', 'domain', 'referrer', 'start_time', 'end_time', 'uid', 'username', 'mobile',
            'platform_id', 'channel_id', 'track_id', 'h5_version', 'access_uuid', 'screen'), TRUE);
        $request_data['server_time'] = $_SERVER['REQUEST_TIME'];
        $request_data['ua'] = $_SERVER['HTTP_USER_AGENT'];
        $request_data['ip'] = _get_ip();
        if ($request_data['domain'] != 'm.1.gaopeng.com') {
            exit();
        }
        $this->receiver->put_access_h5($request_data);

        if (!empty($request_data['uid'])) {
            $this->receiver->put_client_user($request_data);
        }
    }

   
}
