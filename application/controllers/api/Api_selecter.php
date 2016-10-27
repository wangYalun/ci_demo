<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once APPPATH . '/controllers/api/Apibase.php';

use League\Csv\Writer;

/**
 * 数据查询通用接口类
 */
class Api_selecter extends Apibase {

    public $cur_channel_info = NULL;

    function __construct()
    {
        parent::__construct();
        $this->load->model('operation/selecter');
        $this->model = $this->selecter;
        $this->cur_channel_info = $this->data['cur_permission'][$this->data['cur_channel']];
    }

    public function test_get()
    {
        $this->return_data(['haha', 'heihei'], 'success');
    }

    
}
