$(document).ready(function() {
  var form = $('.form');
  var formNum = 0;
  var successNum = 0;
  var representNum = 1;
  var workExperience = $('#repWork').html();
  var education = $('#repEducation').html();
  var represent = $('#represent').html();

  // 验证公司信息输入格式并提交
  $('#nextCompany').on('click', function() {
    successNum = 0;
    var rule = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    $('.company .input-div').each(function() {
      var value = $(this).find('input').val().trim();
      if (value === "") {
        $(this).find('.hint').text("此项必填");
        $(this).addClass('has-error');
      } else if (!rule.test(value)) {
        $(this).find('.hint').text("请输入正确的格式");
        $(this).addClass('has-error');
      } else {
        $(this).find('.hint').text("");
        $(this).removeClass('has-error');
        successNum++;
      }
    });
    if (successNum === $('.company .input-div').length) {
      // ajax传数据
      form[formNum].style.display = "none";
      formNum++;
      form[formNum].style.display = "block";
      $('.process-li').eq(formNum).find('span').removeClass('no-finished');
    }
  });
  // 验证公司信息输入格式并提交

  // 验证财务信息并提交
  $('#nextFinance').on('click', function() {
    successNum = 0;
    var rule = /^[0-9]+.?[0-9]*$/;
    $('.finance .input-div').each(function() {
      var value = $(this).find('input').val().trim();
      if (value === "") {
        $(this).find('.hint').text("此项必填");
        $(this).addClass('has-error');
      } else if (!rule.test(value)) {
        $(this).find('.hint').text("请输入数字格式");
        $(this).addClass('has-error');
      } else {
        $(this).find('.hint').text("");
        $(this).removeClass('has-error');
        successNum++;
      }
    });
    if (successNum === $('.finance .input-div').length) {
      // ajax传数据
      form[formNum].style.display = "none";
      formNum++;
      form[formNum].style.display = "block";
      $("input[name='name']").focus();
      $('.process-li').eq(formNum).find('span').removeClass('no-finished');
      $('.represent-num').text('第' + representNum + '位法人信息');
    }
  });
  // 验证财务信息并提交

  //完成法人信息验证并提交
  $('#submit').on('click', function() {
    successNum = 1;
    $('.represents .input-div input').each(function() {
      var value = $(this).val().trim();
      if (value === "") {
        if (this.type == "file") {
          $(this).siblings('span').text('请上传相关文件').css('display', 'inline-block');
        } else {
          $(this).parent().addClass('has-error');
          $(this).siblings('span').css('display', 'none');
        }
      } else if ($(this).hasClass('id-card')) {
        var rule = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!rule.test(value)) {
          $(this).siblings('span').html("<i class='border-top'></i>" + "错误证件格式").css('display', 'block');
        } else {
          $(this).css('borderColor', '#ccc');
          $(this).siblings('span').css('display', 'none');
          successNum++;
        }
      } else if ($(this).hasClass('qualifi-id')) {
        var rule = /(^\d{17}$)|(^\d{18}$)/;
        if (!rule.test(value)) {
          $(this).siblings('span').html("<i class='border-top'></i>" + "错误编号格式").css('display', 'block');
        } else {
          $(this).css('borderColor', '#ccc');
          $(this).siblings('span').css('display', 'none');
          successNum++;
        }
      } else if ($(this).hasClass('date')) {
        var rule = /\d{4}-\d{2}-\d{2}/;
        if (!rule.test(value)) {
          $(this).siblings('span').html("<i class='border-top'></i>" + "错误日期格式").css('display', 'block');
        } else {
          $(this).css('borderColor', '#ccc');
          $(this).siblings('span').css('display', 'none');
          successNum++;
        }
      } else if ($(this).hasClass('text')) {
        var rule = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        if (!rule.test(value)) {
          $(this).siblings('span').html("<i class='border-top'></i>" + "仅限中英字符").css('display', 'block');
        } else {
          $(this).parent().removeClass('has-error');
          $(this).siblings('span').css('display', 'none');
          successNum++;
        }
      } else {
        $(this).parent().removeClass('has-error');
        $(this).siblings('span').css('display', 'none');
        successNum++;
      }
    });
    if (successNum === $('.represents .input-div').length) {
      form[formNum].style.display = "none";
      formNum++;
      form[formNum].style.display = "block";
      $('.process-li').eq(formNum).find('span').removeClass('no-finished');
    }
  });
  //完成法人信息验证并提交

  //添加教育经历按钮
  $('.represents').on('click', '.add-edu a', function() {
    $(this).parents('#education').append("<div class='rep-infor rep-education'>" + education + "</div>");
  });
  //添加教育经历按钮

  // 添加工作经历按钮
  $('.represents').on('click', '.add-work a', function() {
    $(this).parents('#working').append("<div class='rep-infor rep-work'>" + workExperience + "</div>");
  });
  // 添加工作经历按钮

  // 添加法人代表
  $('.add-represent').on('click', function() {
    if (representNum < 6) {
      representNum++;
      $('.represents').append("<div class='represent' index='" + representNum + "'>" + represent + "</div>");
      $('.represent').eq(representNum - 1).find('.represent-num').text('第' + representNum + '位法人信息');
    }
    if (representNum === 6) {
      $(this).attr('disabled', 'disabled');
    }
  });
  // 添加工作经历按钮

  //删除代表
  $('.represents').on('click', '.delete', function() {
    var currNumber = 1;
    if (representNum === 1) {
      return false;
    }
    if (representNum === 6) {
      $('.add-represent').removeAttr("disabled");
    }
    var index = $(this).prev().attr('index');
    $(this).parents('.represent').remove();
    representNum--;
    $('.represent').each(function() {
      $(this).find('.represent-num').text('第' + currNumber + '位法人信息');
      currNumber++;
    });
  });
  //删除代表

  //左侧栏隐藏
  $(function() {
    $('#navHidden').on('click', function() {
      $('#navBox').hide();
      $('#rightDiv').css('marginLeft', '0px');
    });
  });
  //左侧栏隐藏
});
