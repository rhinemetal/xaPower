function setTab(name,cursel,n){
  for(var i=1;i<=n;i++){
    var menu=document.getElementById(name+i);
    var con=document.getElementById("con_"+name+"_"+i);
    menu.className=i==cursel?"s":"";
    con.style.display=i==cursel?"block":"none";
  }
}
$(function(){
  $("#sendMessage").focus(function(){
    $(this).removeClass("noStart");
    $(this).text("").val("");
  });   
  $("#sendMessage").blur(function(){
    if ($(this).val() == "") {
      $(this).addClass("noStart");
      $(this).val("字数140字以内");
    }
  }); 
  $('.replyShow').on('click', function(){
    if($(this).next().is(":hidden")){
      $(this).next().show();
    }else{
      $(this).next().hide();
    }
  });
  $('.reply,.replyBn').on('click', function(){
    layer.open({
      type: 1,
      skin: 'layui-layer-demo', //样式类名
      closeBtn: 1, //不显示关闭按钮
      anim: 2,
      area: ['820px', '425px'], 
      shadeClose: true, //开启遮罩关闭
      content: '<div><textarea></textarea><span class="send">回复</span></div>'
    });
  });
  $('.img').on('click', function(){
    var url = $(this).attr("src");
    layer.open({
      type: 1,
      title: false,
      closeBtn: 0,
      area: '516px',
      skin: 'layui-layer-nobg', 
      shadeClose: true,
      content: '<img width="516" src="'+url+'">'
    });
  });

});


