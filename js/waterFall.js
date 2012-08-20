var waterFall = {
    container: $("#waterFallContainer"),
    columnNumber: 5,
    columnWidth: 184,
    demoIndex: 0,
    loadFinish: false,
    demosNum: parseInt($('#demo-index-0 span').text())+1,
    
    //载入大体框架
    create: function(){
        var start=0, spans = '';
        for (start; start < this.columnNumber; start++) {
            spans = spans + '<span id="waterFallColumn-'+ start +'" class="waterFallColumns" style="width:'+ this.columnWidth +'px;">'+ '</span> ';
        }
        this.container.html(spans);
        return this;
    },
  
    //加载所有demos
    loadAllDemos: function() {
        var index=0;
        for(index;index<this.demosNum;index +=5){
            var start = 0;
            for (start; start < this.columnNumber; start++) {
                var eleColumn = $("#waterFallColumn-" + start);
                if (eleColumn && !this.loadFinish) {
                    this.loadSingleDemo(eleColumn);
                }           
            }
        }
        return this;
    },
    
    //判断是否加载完毕
    loadSingleDemo: function(column) {
        
        if (this.demoIndex > this.demosNum) {
            this.loadFinish = true;
        }
        else{
            column.append($("#demo-index-"+this.demoIndex));
            this.demoIndex += 1;
        }
        
        return this;
    },

    //初始化
    init:function(){
        this.create().loadAllDemos();
    }
};