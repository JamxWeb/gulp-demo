'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
    function Point(element, obj) {
        _classCallCheck(this, Point);

        // 元素
        try {
            this.element = document.querySelector(element);
        } catch (e) {
            this.element = element;
        }
        // 深拷贝配置
        this.config = Object.assign({
            showColorData: [{
                colorName: '黑色',
                colorKey: '#000',
                id: '01',
                className: 'black'
            }, {
                colorName: '白色',
                colorKey: '#fff',
                id: '02',
                className: 'white'
            }],
            showColorNumber: 9,
            moreColorData: [{
                colourSystemName: '白色系',
                colourSystemKey: '#fff',
                colourSystem: ['乳白色', '米白色']
            }, {
                colourSystemName: '灰色系',
                colourSystemKey: '#ddd',
                colourSystem: ['浅灰色', '深灰色']
            }, {
                colourSystemName: '红色系',
                colourSystemKey: '#f00',
                colourSystem: ['橘红色', '西瓜红']
            }],
            moreConfig: {
                height: 300,
                leftConfig: {
                    width: 150
                },
                rightConfig: {
                    moreColorNumber: 6
                }
            },
            // moreColortype: 'gather',//  gather(集合)， switch(切换)
            htmlCompleteBefor: function htmlCompleteBefor() {},
            htmlCompleteAfter: function htmlCompleteAfter() {}
        }, obj);

        // 元素class
        this.ShowElem = 'ShowElem';
        this.MoreEle = 'MoreEle';
        this.selectColor = 'selectColor';
        this.colorLump = 'colorLump';
        this.colourSystemName = 'colourSystemName';
        this.colourSystem = 'colourSystem';
        this.leftEle = 'left-ele';
        this.rightEle = 'right-ele';
        // 启动函数
        this.init();
    }
    // 创建显示颜色函数


    _createClass(Point, [{
        key: 'createShowColor',
        value: function createShowColor(showColorData) {
            var self = this;
            var ShowElem = this.ShowElem;
            var selectColor = this.selectColor;
            var colorLump = this.colorLump;

            return $('<div class="' + ShowElem + '"></div>').append(showColorData.map(function (elem, index) {
                var data = '';
                var WIDTH = parseInt(100 / self.config.showColorNumber * 100) / 100;
                for (var key in elem) {
                    switch (key) {
                        case 'colorName':
                            break;
                        case 'colorKey':
                            break;
                        case 'id':
                            data += 'id="' + elem['id'] + '" ';
                            break;
                        case 'className':
                            data += 'class="' + elem['className'] + '" ';
                            break;
                        default:
                            data += key + '="' + elem[key] + '" ';
                            break;
                    }
                }
                return '<div ' + data + ' style="width: ' + WIDTH + '%;">\n            \t\t\t<p class="' + selectColor + '">\n            \t\t\t\t<span class="' + colorLump + '" style="background-color: ' + elem.colorKey + ';"></span> ' + elem.colorName + '\n            \t\t\t</p>\n            \t\t</div>';
            }).join('')).append($('<a href="javascript:;">&gt;&gt;\u66F4\u591A</a>'));
        }
        // 创建更多颜色函数

    }, {
        key: 'createMoreColor',
        value: function createMoreColor(moreColorData) {
            var leftArr = '';
            var rightArr = '';
            var config = this.config.moreConfig;
            var leftConfig = config.leftConfig;
            var rightConfig = config.rightConfig;
            var MoreEleHeight = config.height;
            var rightColorWidth = parseInt(100 / rightConfig.moreColorNumber * 100) / 100;

            var colourSystemName = this.colourSystemName;
            var colourSystem = this.colourSystem;
            var selectColor = this.selectColor;
            var MoreEle = this.MoreEle;
            var leftEle = this.leftEle;
            var rightEle = this.rightEle;
            var colorLump = this.colorLump;

            moreColorData.map(function (ele, index) {
                leftArr += '<p class="' + colourSystemName + '"><span class="' + colorLump + '" style="background-color: ' + ele.colourSystemKey + '"></span> ' + ele.colourSystemName + '</p>';
                ele.colourSystem.map(function (ele, index) {
                    rightArr += '<div class="' + colourSystem + '" style="width: ' + rightColorWidth + '%;"><p class="' + selectColor + '">' + ele + '</p></div>';
                });
            });
            return $('<div class="' + MoreEle + '" style="height: ' + MoreEleHeight + 'px"></div>').append($('<div class="' + leftEle + '" style="width: ' + leftConfig.width + 'px"></div>').append(leftArr)).append($('<div class="' + rightEle + '"></div>').append(rightArr));
        }
        // 事件函数

    }, {
        key: '_event',
        value: function _event() {
            var selectColor = $('.' + this.selectColor);
            var colourSystemName = $('.' + this.colourSystemName);

            selectColor.on('click', function () {
                $(this).toggleClass('active');
            });
            colourSystemName.on('click', function () {
                $(this).addClass('active').siblings('.active').removeClass('active');
            });
        }
        // 启动函数

    }, {
        key: 'init',
        value: function init() {
            this.element.append(this.createShowColor(this.config.showColorData)[0]);
            this.element.append(this.createMoreColor(this.config.moreColorData)[0]);
            this._event();
        }
    }]);

    return Point;
}();

$.fn.Point = function (obj) {
    new Point(this[0], obj);
};