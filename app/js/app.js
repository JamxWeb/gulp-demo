class Point {
	constructor(element, obj) {
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
                    width: 150,
                },
                rightConfig: {
                    moreColorNumber: 6
                }
            },
            // moreColortype: 'gather',//  gather(集合)， switch(切换)
            htmlCompleteBefor: function() {},
            htmlCompleteAfter: function() {},
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
        this.init()
    }
    // 创建显示颜色函数
	createShowColor(showColorData) {
        let self = this
        let ShowElem = this.ShowElem;
        let selectColor = this.selectColor;
        let colorLump = this.colorLump;

        return $('<div class="'+ShowElem+'"></div>').append(showColorData.map(function(elem, index) {
            let data = '';
            let WIDTH = parseInt(100 / self.config.showColorNumber * 100) / 100;
            for (let key in elem) {
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
            return `<div ${data} style="width: ${WIDTH}%;">
            			<p class="${selectColor}">
            				<span class="${colorLump}" style="background-color: ${elem.colorKey};"></span> ${elem.colorName}
            			</p>
            		</div>`;
        }).join('')).append($(`<a href="javascript:;">&gt;&gt;更多</a>`));
    }
    // 创建更多颜色函数
	createMoreColor(moreColorData) {
        let leftArr = '';
        let rightArr = '';
        let config = this.config.moreConfig;
        let leftConfig = config.leftConfig;
        let rightConfig = config.rightConfig;
        let MoreEleHeight = config.height;
        let rightColorWidth = parseInt(100 / rightConfig.moreColorNumber * 100) / 100;
        
        let colourSystemName = this.colourSystemName;
        let colourSystem = this.colourSystem;
        let selectColor = this.selectColor;
        let MoreEle = this.MoreEle;
        let leftEle = this.leftEle;
        let rightEle = this.rightEle;
        let colorLump = this.colorLump;

        moreColorData.map(function(ele, index) {
            leftArr += `<p class="${colourSystemName}"><span class="${colorLump}" style="background-color: ${ele.colourSystemKey}"></span> ${ele.colourSystemName}</p>`;
            ele.colourSystem.map(function(ele, index) {
                rightArr += `<div class="${colourSystem}" style="width: ${rightColorWidth}%;"><p class="${selectColor}">${ele}</p></div>`;
            })
        })
        return $(`<div class="${MoreEle}" style="height: ${MoreEleHeight}px"></div>`)
            .append($(`<div class="${leftEle}" style="width: ${leftConfig.width}px"></div>`).append(leftArr))
            .append($(`<div class="${rightEle}"></div>`).append(rightArr))
    }
    // 事件函数
	_event() {
		let selectColor = $('.'+this.selectColor);
		let colourSystemName = $('.'+this.colourSystemName);

        selectColor.on('click', function() {
            $(this).toggleClass('active');
        })
        colourSystemName.on('click', function(){
        	$(this).addClass('active').siblings('.active').removeClass('active');
        })
    }
    // 启动函数
    init() {
        this.element.append(this.createShowColor(this.config.showColorData)[0]);
        this.element.append(this.createMoreColor(this.config.moreColorData)[0]);
        this._event()
    }
}

$.fn.Point = function(obj) {
    new Point(this[0], obj)
}
