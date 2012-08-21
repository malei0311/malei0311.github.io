/**
 * @fileoverview blog tags 3D
 *
 * @author <a href="mailto:leiman0311@gmail.com">Lei Ma</a>
 * @version 0.1.0, Aug 18 2012
 */
(function ($) {
    $.fn.threeDTags=function(options){
        debug(this);
        var opts=$.extend({},$.fn.threeDTags.defaults,options);
        return this.each(function(){
            function update()
            {
                var a;
                var b;
                
                if(opts.active)
                {
                    a = (-Math.min( Math.max( -opts.mouseY, -opts.size ), opts.size ) / opts.radius ) * opts.tspeed;
                    b = (Math.min( Math.max( -opts.mouseX, -opts.size ), opts.size ) / opts.radius ) * opts.tspeed;
                }
                else
                {
                    a = opts.lasta * 0.98;
                    b = opts.lastb * 0.98;
                }
                
                opts.lasta=a;
                opts.lastb=b;
                
                if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
                {
                    return;
                }
                
                var c=0;
                sineCosine(a,b,c);
                for(var j=0;j<opts.mcList.length;j++)
                {
                    var rx1=opts.mcList[j].cx;
                    var ry1=opts.mcList[j].cy*ca+opts.mcList[j].cz*(-sa);
                    var rz1=opts.mcList[j].cy*sa+opts.mcList[j].cz*ca;
                    
                    var rx2=rx1*cb+rz1*sb;
                    var ry2=ry1;
                    var rz2=rx1*(-sb)+rz1*cb;
                    
                    var rx3=rx2*cc+ry2*(-sc);
                    var ry3=rx2*sc+ry2*cc;
                    var rz3=rz2;
                    
                    opts.mcList[j].cx=rx3;
                    opts.mcList[j].cy=ry3;
                    opts.mcList[j].cz=rz3;
                    
                    per=opts.d/(opts.d+rz3);
                    
                    opts.mcList[j].x=(opts.howElliptical*rx3*per)-(opts.howElliptical*2);
                    opts.mcList[j].y=ry3*per;
                    opts.mcList[j].scale=per;
                    opts.mcList[j].alpha=per;
                    
                    opts.mcList[j].alpha=(opts.mcList[j].alpha-0.6)*(10/6);
                }
                
                doPosition();
                depthSort();
            }
            
            function depthSort()
            {
                var i=0;
                var aTmp=[];
                
                for(i=0;i<opts.aA.length;i++)
                {
                    aTmp.push(opts.aA[i]);
                }
                
                aTmp.sort
                (
                    function (vItem1, vItem2)
                    {
                        if(vItem1.cz>vItem2.cz)
                        {
                            return -1;
                        }
                        else if(vItem1.cz<vItem2.cz)
                        {
                            return 1;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                );
                
                for(i=0;i<aTmp.length;i++)
                {
                    aTmp[i].style.zIndex=i;
                }
            }
            
            function positionAll()
            {
                var phi=0;
                var theta=0;
                var max=opts.mcList.length;
                var i=0;
                
                var aTmp=[];
                var oFragment=document.createDocumentFragment();
                
                //随机排序
                for(i=0;i<opts.aA.length;i++)
                {
                    aTmp.push(opts.aA[i]);
                }

                aTmp.sort
                (
                    function ()
                    {
                        return Math.random()<0.5?1:-1;
                    }
                );
                
                for(i=0;i<aTmp.length;i++)
                {
                    oFragment.appendChild(aTmp[i]);
                }
                
                that.appendChild(oFragment);
                
                for( var i=1; i<max+1; i++){
                    if( opts.distr )
                    {
                        phi = Math.acos(-1+(2*i-1)/max);
                        theta = Math.sqrt(max*Math.PI)*phi;
                    }
                    else
                    {
                        phi = Math.random()*(Math.PI);
                        theta = Math.random()*(2*Math.PI);
                    }
                    //坐标变换
                    opts.mcList[i-1].cx = opts.radius * Math.cos(theta)*Math.sin(phi);
                    opts.mcList[i-1].cy = opts.radius * Math.sin(theta)*Math.sin(phi);
                    opts.mcList[i-1].cz = opts.radius * Math.cos(phi);
                    
                    opts.aA[i-1].style.left=opts.mcList[i-1].cx+that.offsetWidth/2-opts.mcList[i-1].offsetWidth/2+'px';
                    opts.aA[i-1].style.top=opts.mcList[i-1].cy+that.offsetHeight/2-opts.mcList[i-1].offsetHeight/2+'px';
                }
            }
            
            function doPosition()
            {
                var l=that.offsetWidth/2;
                var t=that.offsetHeight/2;
                for(var i=0;i<opts.mcList.length;i++)
                {
                    opts.aA[i].style.left=opts.mcList[i].cx+l-opts.mcList[i].offsetWidth/2+'px';
                    opts.aA[i].style.top=opts.mcList[i].cy+t-opts.mcList[i].offsetHeight/2+'px';
                    
                    opts.aA[i].style.fontSize.size=Math.ceil(12*opts.mcList[i].scale/2)+8+'px';
                    
                    opts.aA[i].style.filter="alpha(opacity="+100*opts.mcList[i].alpha+")";
                    opts.aA[i].style.opacity=opts.mcList[i].alpha;
                }
            }
            
            function sineCosine( a, b, c)
            {
                sa = Math.sin(a * opts.dtr);
                ca = Math.cos(a * opts.dtr);
                sb = Math.sin(b * opts.dtr);
                cb = Math.cos(b * opts.dtr);
                sc = Math.sin(c * opts.dtr);
                cc = Math.cos(c * opts.dtr);
            }

            function randomColor(){
                var colorBit = new Array(6);
                colorBit[0] = "255";
                colorBit[1] = "204";
                colorBit[2] = "153";
                colorBit[3] = "102";
                colorBit[4] = "51";
                colorBit[5] = "0";
                var colorArray=new Array();
                for (var i = 0; i < 6; i++){
                    for (var j = 0; j < 6; j++){
                        for (var k = 0; k < 6; k++){
                            colorArray.push(colorBit[i]+','+colorBit[j]+','+colorBit[k]);
                        }
                    }
                }
                var randomColor=colorArray[Math.floor((colorArray.length)*Math.random())];//Math.random()含0,不含1
                return randomColor;
            }
        
                $(this).children('a').each(function(index,domEle){
                    $(domEle).css('color','rgba('+randomColor()+',1)');
                    var threeDTags_class=parseInt($(domEle).attr('class'));
                    if(threeDTags_class>=0 && threeDTags_class<5){
                        $(domEle).css('fontSize','12px');
                    }
                    if(threeDTags_class>=5 && threeDTags_class<=10){
                        $(domEle).css('fontSize','14px');
                    }
                    if(threeDTags_class>10 && threeDTags_class<=20){
                        $(domEle).css('fontSize','16px');
                    }
                    if(threeDTags_class>=20 && threeDTags_class<=50){
                        $(domEle).css('fontSize','18px');
                    }
                    if(threeDTags_class>50){
                        $(domEle).css('fontSize','20px');
                    }
                });
                var i=0;
                var oTag=null;
                var that=this;
                
                opts.aA=this.getElementsByTagName('a');
                
                for(i=0;i<opts.aA.length;i++)
                {
                    oTag={};
                    
                    oTag.offsetWidth=opts.aA[i].offsetWidth;
                    oTag.offsetHeight=opts.aA[i].offsetHeight;
                    
                    opts.mcList.push(oTag);
                }
                
                sineCosine( 0,0,0 );
                
                positionAll();
                
                this.onmouseover=function (ev)
                {
                     //var oEvent=window.event || ev;
                    opts.active=true;
                    //alert(oEvent.clientX+" vs "+this.offsetLeft+" vs "+this.offsetWidth);
                };
                
                this.onmouseout=function ()
                {
                    opts.active=false;
                };
                
                this.onmousemove=function (ev)
                {
                    var oEvent=window.event || ev;
                    
                    opts.mouseX=oEvent.clientX-($(this).offset().left-$(window).scrollLeft()+this.offsetWidth/2);
                    opts.mouseY=oEvent.clientY-($(this).offset().top-$(window).scrollTop()+this.offsetHeight/2);
                    
                    opts.mouseX/=5;
                    opts.mouseY/=5;
                };
                
                setInterval(update, 30);
            
        });
    };

    $.fn.threeDTags.defaults={
        radius        :90,
        dtr           : Math.PI/180,
        d             :100,
        
        mcList        : [],
        active        : false,
        lasta         : 1,
        lastb         : 1,
        distr         : true,
        tspeed        :8,
        size          :250,
        
        mouseX        :0,
        mouseY        :0,
        
        howElliptical :1,
        
        aA            :null
    };
    function debug($obj){
        if(window.console && window.console.log){
            window.console.log('hilight selection count:'+$obj.size());
        }
    }
})(jQuery);