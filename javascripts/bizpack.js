var getURLParameterByName = function(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/*!
  query-string
  Parse and stringify URL query strings
  https://github.com/sindresorhus/query-string
  by Sindre Sorhus
  MIT License
*/

var getQueryString = function(obj) {
  return obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (Array.isArray(val)) {
      return val.map(function (val2) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
      }).join('&');
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
  }).join('&') : '';
};

var setURLParameters = function(obj, hash) {
  if (!hash) {
    hash = location.hash;
  }
  var origin = location.origin || (location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: ''));
  location.href = origin + '?' + this.getQueryString(obj) + hash;
};


// サービス一覧メニュー切り替え

$(function(){
    $(".col-md-11 input").click(function(){
      $("ul.service_right").css("borderColor", "#29abe9");
      $("ul.service_right li").hide();
      $("ul.service_right li").fadeIn(600);
      if($("#select_rakuraku").is(":checked")){
        $("#service_right_global").css("display","none");
        $("#service_right_orange").css("display","block");
        // $("#service_right_monstarch").css("display","none");
      }
      if($("#select_global").is(":checked")){
        $("#service_right_orange").css("display","none");
        $("#service_right_global").css("display","block");
        $("ul.service_right").css("border-color", "#FFBB00");
      }
      return true;
    })
})


// "まとめてサービスに申し込む"有効化

$(function() {
    $("#service :checkbox").click(function() {
        if ($("#service :checked").length > 0) {
            $("#service .service_button_apply").addClass("on");
            $("#service .service_button_apply").attr("onclick","apply()");
        } else {
            $("#service .service_button_apply").removeClass("on");
            $("#service .service_button_apply").removeAttr("onclick");
        }
    });
});

$(function() {
    $("#service .service_add").click(function() {
        if ($("#service :checked").length > 0) {
            $("#service .service_button_apply").addClass("on");
            $("#service .service_button_apply").attr("onclick","apply()");
        } else {
            $("#service .service_button_apply").removeClass("on");
            $("#service .service_button_apply").removeAttr("onclick");
        }
    });
});


// ブックマーク表示

$(function() {
  $("#service :checkbox").change(function() {
    var id = $(this).attr("id");
    var name = id.slice(9);
    var bookmark = "#service_button_" + name + " .bookmark img";
    if ($(this).is(":checked")) {
      $(bookmark).addClass("on");
    } else {
      $(bookmark).removeClass("on");
    }
  });
});


// リクエストパラメーター

function apply(){
  var coiney = $('input[name="coiney"]').prop("checked")
  var ubiregi = $('input[name="ubiregi"]').prop("checked")
  var freee = $('input[name="freee"]').prop("checked")
  var japannetbank = $('input[name="japannetbank"]').prop("checked")
  var jobcan = $('input[name="jobcan"]').prop("checked")
  var monstarch = $('input[name="monstarch"]').prop("checked")
  //リンク書き換え
  window.open("campaignform.html" + '?co=' + coiney + '&ub=' + ubiregi + '&fr=' + freee + '&jb=' + japannetbank + '&jc=' + jobcan + '&mc=' + monstarch);
}


// 見積もり表示

$(function() {
  $("#estimate input[type=radio]").change(function() {
  var coiney = Number($("[name=estimate_coiney]:checked").val())
  var ubiregi = Number($("[name=estimate_ubiregi]:checked").val())
  var freee_corp = Number($("[name=estimate_freee_corp]:checked").val())
  var freee_salary = Number($("[name=estimate_freee_salary]:checked").val())
  var jobcan = Number($("[name=estimate_jobcan]:checked").val())
  var array = [coiney,ubiregi,freee_corp,freee_salary,jobcan]
  for(i=0;i < array.length;i++){
    if(isNaN(array[i]))
    array[i] = 0;
  }
  var sum  = function(arr) {
    var sum = 0;
    arr.forEach(function(elm) {
        sum += elm;
    });
    return sum;
  };
  var total = sum(array);
  document.getElementById('monthly_fee').value='¥'+total;
})
});

$(function() {
  $("#estimate input[type=checkbox]").change(function(){
    var name = $(this).attr("name");
    var target = name.slice(7);
    var object = "estimate_" + target
    var initial_coiney = 19800;
    var initial_ubiregi = 0;
    var initial_freee_corp = 0;
    var initial_freee_salary = 0;
    var initial_jobcan = 0;
    if($(this).prop("checked")){
      $('#estimate_' + target + '.estimate_list').addClass("on");
      $('#estimate_' + target + ' input[type=radio]').removeAttr("disabled");
      $('#estimate_' + target + ' .estimate_radiobox label').css("cursor", "pointer")
    } else{
      $('#estimate_' + target + '.estimate_list').removeClass("on");
      $('#estimate_' + target + ' input[type=radio]').attr("disabled","disabled");
      $('#estimate_' + target + ' .estimate_radiobox label').css("cursor", "default");
      (function(){
      for(i=0;i<document.estimate.elements[object].length;i++){
      document.estimate.elements[object][i].checked=false;
      }
    })()
    console.log(document.estimate.elements[object][0].checked);
    }
    var coiney = Number($("[name=estimate_coiney]:checked").val())
    var ubiregi = Number($("[name=estimate_ubiregi]:checked").val())
    var freee_corp = Number($("[name=estimate_freee_corp]:checked").val())
    var freee_salary = Number($("[name=estimate_freee_salary]:checked").val())
    var jobcan = Number($("[name=estimate_jobcan]:checked").val())
    var array = [coiney,ubiregi,freee_corp,freee_salary,jobcan]
    for(i=0;i < array.length;i++){
      if(isNaN(array[i]))
      array[i] = 0;
    }
    var sum  = function(arr) {
      var sum = 0;
      arr.forEach(function(elm) {
          sum += elm;
      });
      return sum;
    };
    var total = sum(array);
    document.getElementById('monthly_fee').value='¥'+total;
    var str = 0;
    for (i=0;i<2;i++){
      if (document.estimate.elements[i].checked){
        str=str+Number(document.estimate.elements[i].value);
      }
    }
    document.getElementById('initial_fee').value='¥'+str;
  })
})

$(document).ready(function(){
  var str = 0;
  for (i=0;i<3;i++){
    if (document.estimate.elements[i].checked){
      str=str+Number(document.estimate.elements[i].value);
    }
  }
  document.getElementById('initial_fee').value='¥'+str;
})
