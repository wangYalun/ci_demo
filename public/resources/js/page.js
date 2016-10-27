var window_page = {};

function Page() {
    this.data = null;
    this.pageSize = 20;
    this.allPage = 0;
    this.curPage = 1;
    this.func = null;
    this.initData = null;
    this.menuId = "";
}

Page.prototype.init = function (data, func, menuId) {
    this.data = data;
    this.initData = data;
    this.table = func;
    this.curPage = 1;
    this.func = func;
    this.menuId = menuId;
    this.allPage = Math.ceil(data.length / this.pageSize);
    var menu = document.getElementById(menuId);
    menu.addEventListener("click", function (event) {
        var target = event.target;
        var menuId = target.parentNode.getAttribute("id");
        var page = window_page[menuId];
        if (target.nodeName == "a" || target.nodeName == "A") {
            var action = target.firstChild.nodeValue;
            if (action == "<prev") {
                page.prev();
            } else if (action == "next>") {
                page.next();
            } else if (!isNaN(action)) {
                page.selectPage(parseInt(action));
            }
        }
    }, false);
    if (data.length > this.pageSize) {
        this.showButton();
        this.showData(this.func);
    } else {
        this.hideButton();
        this.showData(this.func);
    }

};
Page.prototype.showData = function (func) {
    var data = this.data;
    var from = 0;
    var to = 0;
    from = (this.curPage - 1) * this.pageSize;
    to = this.curPage * this.pageSize;
    if (to > data.length) {
        to = data.length;
    }
    func(data, from, to);
};
Page.prototype.showButton = function () {
    var $menu = $("#" + this.menuId);
    $menu.empty();
    $menu.show();
    var menu = $menu[0];
    menu.style.display = "block";
    if (this.curPage == 1) {
        var prev = document.createElement("span");
        prev.setAttribute("class", "disabled");
        var prev_text = document.createTextNode("<prev");
        prev.appendChild(prev_text);
        menu.appendChild(prev);
    } else {
        var page = document.createElement("a");
        //page.setAttribute("href","javascript:page.prev()");
        var page_text = document.createTextNode("<prev");
        page.appendChild(page_text);
        menu.appendChild(page);
    }
    var from = this.curPage - this.pageSize;
    var to = this.curPage + this.pageSize;
    if (from < 1) {
        from = 1;
        to = from + this.pageSize;
    }

    if (to > this.allPage) {
        to = this.allPage;
        from = to - this.pageSize;
        if (from < 1) {
            from = 1;
        }
    }
    for (var i = from; i <= to; i++) {
        if (this.curPage == i) {
            var cur = document.createElement("span");
            cur.setAttribute("class", "current");
            var cur_text = document.createTextNode(i);
            cur.appendChild(cur_text);
            menu.appendChild(cur);
        } else {
            var page = document.createElement("a");

            var page_text = document.createTextNode(i);
            page.appendChild(page_text);
            menu.appendChild(page);
        }
    }
    if (this.curPage == this.allPage) {
        var prev = document.createElement("span");
        prev.setAttribute("class", "disabled");
        var prev_text = document.createTextNode("next>");
        prev.appendChild(prev_text);
        menu.appendChild(prev);
    } else {
        var page = document.createElement("a");
        var page_text = document.createTextNode("next>");
        page.appendChild(page_text);
        menu.appendChild(page);
    }
    var prev = document.createElement("span");
    //prev.setAttribute("class","disabled");
    var prev_text = document.createTextNode("共" + this.allPage + "页，" + this.data.length + "条记录");
    prev.appendChild(prev_text);
    menu.appendChild(prev);
};
Page.prototype.hideButton = function () {
    $("#page_nav").empty();
    $("#page_nav").hide();
};
Page.prototype.next = function () {
    this.curPage++;
    this.showButton();
    this.showData(this.func);
};
Page.prototype.prev = function () {
    this.curPage--;
    this.showButton();
    this.showData(this.func);
};
Page.prototype.selectPage = function (indexPage) {
    this.curPage = indexPage;
    this.showButton();
    this.showData(this.func);
};

Page.prototype.sort = function (nodeNum, orderBy) {
    if (this.data instanceof Array) {
        var temp = this.data;
    } else {
        var temp = this.data.data;
    }

    var num = 0;
    for (var propertyName in temp[0]) {
        num++;
        if (num == nodeNum) {
            break;
        }
    }
    function createComparisonFunction(propertyName, orderBy) {
        return function (object1, object2) {
            function number_format(a) {
                var patten = /(\d{2}|\d{4})(?:\-)?([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)?([0-2]{1}\d{1}|[3]{1}[0-1]{1})(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1})(?::)?([0-5]{1}\d{1})(?::)?([0-5]{1}\d{1})/;
                if (typeof a == "string") {
                    if (patten.test(a)) {
                        return +new Date(Date.parse(a));
                    }
                    return a;
                } else {
                    return a;
                }
            }
            var value1 = number_format(object1[propertyName]);
            var value2 = number_format(object2[propertyName]);

            if (parseFloat(value1) && parseFloat(value2)) {
                value1 = parseFloat(value1);
                value2 = parseFloat(value2);
            }
            var res = 0;
            if (value1 < value2) {
                res = -1;
            } else if (value1 > value2) {
                res = 1;
            } else {
                res = 0;
            }
            if (orderBy == "desc") {
                return 0 - res;
            } else {
                return res;
            }
        };
    }
    temp.sort(createComparisonFunction(propertyName, orderBy));
    this.showData(this.func);
};

