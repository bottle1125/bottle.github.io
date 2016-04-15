var images=document.getElementsByTagName('img');
var mymodal=document.getElementById('modal');
var modalImg=document.getElementById('img01');
var main=document.getElementById('main');
var intr=document.getElementById('introduction');
var content=document.getElementsByTagName('p');
for (var i = 0; i < images.length; i++) {
	images[i].onclick=function(){
		mymodal.style.display="block";
		modalImg.src=this.src;
		modalImg.alt=this.alt;
		intr.innerHTML='<p>'+this.nextSibling.innerHTML+'</p>';
		mymodal.onclick=function(){
			mymodal.style.display="none";
		}
	}
}
