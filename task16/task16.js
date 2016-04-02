/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var table=document.getElementById("aqi-table");
var aqiData = {};
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
var city=document.getElementById("aqi-city-input");
var number=document.getElementById("aqi-value-input");
function ifRightCity(str){
	if (!trim(str)) {
		alert("城市输入为空，请输入一个城市！");
		return false;
	}
	var pattern=/^[\u4e00-\u9fa5 a-zA-Z]+$/g;
	if(!pattern.test(str)){
		alert("城市名称请输入中文或英文！");
		return false;
	}
	return true;
}
function ifRightNumber(str){
	if (!trim(str)) {
		alert("城市输入为空，请输入一个城市！");
		return false;
	}
	var pattern=/\D/g;
	if (pattern.test(str)) {
		alert("空气质量请输入整数！");
		return false;
	}
	return true;
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	if (ifRightCity(city.value)) {
		if(ifRightNumber(number.value)){
			aqiData[city.value]=parseInt(number.value);
		}

	}
	
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var items="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for (var city in aqiData){
		items+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button onclick=\"delBtnHandle(\'" + city + "\')\">删除</button></td></tr>";
	}
	table.innerHTML=city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */

function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}
function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
   document.getElementById("add-btn").addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}
init();