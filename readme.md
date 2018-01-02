#### CI框架 脚手架
#### Nginx 配置
```
# 前端静态文件虚拟主机配置
server
    {
        listen 80;
        #listen [::]:80;
        server_name www.xxxxxx.com ;
        index index.html;
        root  /home/wwwroot/static_test;

        location ~ /api/ {
                proxy_pass    http://127.0.0.1:81;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
        # 访问日志
        access_log  /home/wwwlogs/www.xxxxxx.log;
    }
# API接口虚拟主机配置
server
    {
        listen 81;
        index index.html index.htm index.php default.html default.htm default.php;
        root  /home/wwwroot/mis.dotransit.org/public;


        include /usr/local/nginx/conf/enable-php.conf;

        #去掉index.php
        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }

        location ~ /.well-known {
            allow all;
        }

        access_log  /home/wwwlogs/api.mis.log;
    }
# 存在跨目录访问的问题的话，参考 LNMP 一键安装包配置
```