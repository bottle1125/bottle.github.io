
//事件绑定函数，兼容IE浏览器
function addEvent(eventTarget, eventType, eventHandler){
   if(eventTarget.addEventListener){        //这个表示在做兼容测试。非ie下有这个属性。所以有这个属性的就是非ie浏览器   
     eventTarget.addEventListener(eventType,eventHandler,false);    //非ie下添加事件
	}else {       //else情况下，就说明当前的浏览器是ie浏览器
		if(eventTarget.attachEvent){    //这个if语句可以去掉。。它也是在做测试，测试当前的浏览器是否有这个属性
			eventType="on"+eventType;    //ie浏览器下的事件都要用一个on，
  			eventTarget.attachment(eventType,eventHandler);    //这个貌似是自己写的函数。。不知道用来做说明的、、、
		}else{eventType["on"+eventType]=eventHandler;}//ie下的事件添加
					
	}
}
//封装Queue函数
function Queue(ul){
	this.str=[];
	this.left_in=function(obj){
		if (obj.length) {
			this.str.unshift(obj);
			this.update();
		}else{alert('请输入内容');}
	};
	this.right_in=function(obj){
		if (obj.length) {
			this.str.push(obj);
			this.update();
		}else{alert('请输入内容');}
	};
	this.left_del=function(obj){
		if (this.str.length>0) {
			this.str.shift();
			this.update();
		}else{alert('没有内容可删除');}
	};
	this.right_del=function(obj){
		if (this.str.length>0) {
			this.str.pop();
			this.update();
		}else{alert('没有内容可删除');}
	};
	this.update=function(){
        ul.innerHTML="";
		for(var i=0;i<this.str.length;i++){
            var node=document.createElement("li");
            node.innerHTML=this.str[i];
            ul.appendChild(node);
        }
		del(this,ul);
	};
	this.del_node=function(num){
		this.str.splice(num,1);
		this.update();
	}
}
//队列里的删除函数
function del(Queue,ul){
    var temp=[];
	for(var cur=0;cur<ul.childNodes.length;cur++){
        temp.push(ul.childNodes[cur].innerHTML); 
		addEvent(ul.childNodes[cur],'mouseover',function(cur){
			return function(){ul.childNodes[cur].style.background="green";ul.childNodes[cur].innerHTML = '点击删除'+temp[cur];}
		}(cur));//如果不使用闭包，就无法正确执行
		addEvent(ul.childNodes[cur],'mouseout',function(cur){
			return function(){ul.childNodes[cur].style.background="red";ul.childNodes[cur].innerHTML = temp[cur];}
		}(cur));
		addEvent(ul.childNodes[cur],'click',function(cur){
			return function(){return Queue.del_node(cur);}
		}(cur));
	}
}
//split()方法用于把一个字符串分割成字符串数组
function splitInput(text){
	var input=[];
	input=text.split(/[,，;；、\s\n]+/);
	return input;
}
//去掉输入中开头结尾的空格或空白符
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
window.onload=function(){
	var  ul_skill=document.getElementById('ul_skill'),
        input_skill=document.getElementById('input_skill'),
        input_hobby=document.getElementById('input_hobby'),
        confirm_hobby=document.getElementById('confirm_hobby'),
        ul_hobby=document.getElementById('ul_hobby');

	   
	var tagQueue=new Queue(ul_skill);
	var hobbyQueue=new Queue(ul_hobby);

	addEvent(confirm_hobby,'click',function(){
		var input=splitInput(trim(input_hobby.value));
		for(index in input){
			if (hobbyQueue.str.indexOf(input[index])===-1) {
				hobbyQueue.right_in(input[index]);
				if (hobbyQueue.str.length>10) {
					hobbyQueue.left_del();
				}
			}
		}
		hobbyQueue.update();
		input_hobby.value="";
	});
	addEvent(input_skill,'keyup',function(event){
		if (/[,，;；、\s\n]+/.test(input_skill.value)||event.keyCode===13){var data=splitInput(trim(input_skill.value))[0]; //html如果使用form，里面只有一个input，则回车会刷新页面
			if (tagQueue.str.indexOf(data)===-1) {
				tagQueue.right_in(data);
				if (tagQueue.str.length>10) {
					tagQueue.left_del();
				}
			}
			tagQueue.update();
			input_skill.value="";
		} 
	})
}