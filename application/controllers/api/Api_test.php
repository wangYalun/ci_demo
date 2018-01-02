<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require_once APPPATH . '/controllers/api/Apibase.php';

use League\Csv\Writer;

/**
 * 数据查询通用接口
 */
class Api_test extends Apibase {

    function __construct()
    {
        parent::__construct();
    }

    public function test_get()
    {
        //$cookie = 'a:1:{i:0;a:2:{s:7:"item_id";s:6:"442786";s:10:"want_units";s:1:"5";}}';
        //serialize
        $cookie = 1;
        $obj = unserialize($cookie);
        var_dump($obj);
    }

    public function index_get()
    {

        $this->return_data(['allen', _get_ip()], 'success');
    }

    //H5 EVENT-Stream 后台接口
    public function realtime_get()
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');

        $this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));

        if (!$foo = $this->cache->get('foo')) {
            $foo = 1;
            $this->cache->save('foo', $foo, 4);
        } else {
            $foo++;
            $this->cache->save('foo', $foo, 4);
        }

        echo "data: The Num is : {$foo}\n\n";
        ob_flush();
        flush();
    }

    //用户代理字符串
    public function ua_get()
    {
        echo $_SERVER['REQUEST_TIME'];
    }

    //测试CSV包
    public function csv_get()
    {
        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->insertOne(['name', 'age', 'email']);
        $csv->insertOne(["allen", 20, '326402399@qq.com']);
        $csv->output('users.csv');
    }

    //测试mongodb 连接1
    public function mongo_get()
    {
        $request_data = $this->input->get(array('title', 'url', 'domain', 'referrer', 'start_time', 'end_time', 'uid', 'username', 'mobile',
            'platform_id', 'channel_id', 'track_id', 'h5_version', 'access_uuid', 'screen'), TRUE);
        $m = new MongoClient("mongodb://data.test.gplqdb.com:27017");
        $db = $m->lqg_data;
        $collection = $db->go_src_user_access_h5;
        $collection->insert($request_data);
    }

    //测试mongodb 连接1
    public function mongo_post()
    {
        $request_data = $this->input->post(array('uid', 'username', 'mobile', 'source', 'platform_id', 'channel_id', 'app_version',
            'start_time', 'device_id', 'mobile_info', 'environment'), TRUE);
        //$m = new MongoClient("mongodb://data.test.gplqdb.com:27017");
        $m = new MongoClient();
        $db = $m->lqg_data;
        $collection = $db->go_src_user_access_h5;
        $collection->insert($request_data);
    }

    //测试redis 连接
    public function redis_get()
    {
        $redis = new Redis();
        $redis->connect('localhost', 6379);
        echo "Connection to server sucessfully";
        //查看服务是否运行
        echo "Server is running: " . $redis->ping();

        //设置 redis 字符串数据
        $redis->set("tutorial-name", "Redis tutorial");
        // 获取存储的数据并输出
        echo "Stored string in redis:: " . $redis->get("tutorial-name");

        //存储数据到列表中
        $redis->lpush("tutorial-list", "Redis");
        $redis->lpush("tutorial-list", "Mongodb");
        $redis->lpush("tutorial-list", "Mysql");
        // 获取存储的数据并输出
        $arList = $redis->lrange("tutorial-list", 0, 5);
        echo "Stored string in redis";
        print_r($arList);
    }

    //测试CI缓存
    public function driver_get()
    {
        $this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));

        if (!$foo = $this->cache->get('foo')) {
            echo 'Saving to the cache!<br />';
            $foo = 'foobarbaz!';
            // Save into the cache for 5 minutes
            $this->cache->save('foo', $foo, 300);
        }
        echo $foo;
    }

}
