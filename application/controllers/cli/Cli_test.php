<?php

/**
 * Description of Compute_data
 *
 * @author Allen
 */
class Cli_test extends CI_Controller {

    private $data_db = null;

    function __construct()
    {
        parent::__construct();
        if (php_sapi_name() !== 'cli') {
            die('must access via cli');
        }
    }


    public function test2()
    {
        echo PHP_EOL;
    }

  
    //测试CI缓存
    public function driver_cache()
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


    public function mysql_test()
    {
        $m = $this->load->database('mysql_test', TRUE);
    }

    public function endecode()
    {
        $cookie = 'a:1:{i:0;a:2:{s:7:"item_id";s:6:"442786";s:10:"want_units";s:1:"5";}}';
        //serialize
        $obj = unserialize($cookie);
        var_dump($obj);
    }

}
