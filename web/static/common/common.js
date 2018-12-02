$(function(){

    // toastr settings
    toastr.options = {
        closeButton: true,                  
        debug: false,                 
        progressBar: true,                
        positionClass: "toast-top-right",  
        showDuration: "300",                
        preventDuplicates: true,          
        hideDuration: "300",             
        timeOut: "3000",                
        extendedTimeOut: "1000",          
        showEasing: "swing",                
        hideEasing: "linear",        
        showMethod: "fadeIn",               
        hideMethod: "fadeOut"               
    };


    // 修改状态
    $('body').off('click', 'td a.editimg');
    $('body').on('click', 'td a.editimg', function(event){
        var addclass;
        var removeclass;
        var pvalue; 
        var _this = $(this);
        var field = _this.data('field');
        var id = _this.data('id');
        var value = _this.data('value');
        var url = _this.data('url');
        if ( value == 1){
            pvalue = 0;
            addclass = "fa-check-circle text-green";
            removeclass = "fa-times-circle text-red"; 
        }else{
            pvalue = 1;
            addclass = "fa-times-circle text-red";
            removeclass = "fa-check-circle text-green";
        }
        var dataStr = jQuery.parseJSON( '{"id":"'+id+'","'+field+'":"'+pvalue+'"}' );
        $.ajax({
            type : "post",
            url : url,
            dataType : 'json',
            data : dataStr,
            success : function(data) {
                if(data.status == '1'){
                    _this.data('value', pvalue);
                    _this.removeClass(addclass);
                    _this.addClass(removeclass);
                    $.amaran({'message':data.info});
                }else if(data.status == '2'){
                    restlogin(data.info);
                }else{
                    $.amaran({'message':data.info});
                }
            }
        });
    });


    // ajax修改名称
    $('.editable').editable({
        emptytext: "empty",
        params: function(params){
            var data = {};
            data['id'] = params.pk
            data['name'] = params.value
            return data;
        },
        success: function(response, newValue){
            var res = $.parseJSON(response);
            if (res.status == 1) {

            }else{
                return res.info;
            }
        }
    });


    // 删除文章，类
    $('body').off('click', '.file_del');
    $('body').on('click', '.file_del', function(event){
        var _this = $(this);
        var row = _this.closest('tr');
        var id = _this.data('id');
        var url = _this.data('url');
        var dataStr = jQuery.parseJSON( '{"id":"'+id+'"}' );
        BootstrapDialog.confirm({
            title: "确认删除",
            message: '删除该模块',
            btnCancelLabel: '取消',
            btnOKLabel: '确定',
            callback: function(result) {
                if(result) {
                    $.ajax({
                        type : "get",
                        url : url,
                        dataType : 'json',
                        data : dataStr,
                        success : function(data) {
                            if(data.status == '1'){
                                row.remove();
                                $.amaran({'message':data.info});
                            }else{
                                $.amaran({'message':data.info});
                            }
                        }
                    });
                }
            }
        });
    });


    //Initialize Select2 Elements
    $('.select2').select2()

    //Date range picker
    $('#reservation').daterangepicker()
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
    //Date range as a button
    $('#daterange-btn').daterangepicker(
      {
        ranges   : {
          'Today'       : [moment(), moment()],
          'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month'  : [moment().startOf('month'), moment().endOf('month')],
          'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate  : moment()
      },
      function (start, end) {
        $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
      }
    )

    //Date picker
    $('#datepicker').datepicker({
      autoclose: true,
      format: 'YYYY-MM-DD',
    })

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass   : 'iradio_minimal-blue'
    })
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
      checkboxClass: 'icheckbox_minimal-red',
      radioClass   : 'iradio_minimal-red'
    })
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })

    //Colorpicker
    $('.my-colorpicker1').colorpicker()
    //color picker with addon
    $('.my-colorpicker2').colorpicker()
/*    //Timepicker
    $('.timepicker').timepicker({
      showInputs: false
    })*/

    // 跳转链接
    $('input[type="checkbox"][value="j"]').on('ifChecked', function(event){
        $("#jumplink").removeClass("hide");
    });
    $('input[type="checkbox"][value="j"]').on('ifUnchecked', function(event){
        $("#jumplink").addClass("hide");
    });


    // 缩略图
    $('input[type="checkbox"][value="p"]').on('ifChecked', function(event){
        $("#litpic").removeClass("hide");
    });
    $('input[type="checkbox"][value="p"]').on('ifUnchecked', function(event){
        $("#litpic").addClass("hide");
    });


   $('body').off('click', '.up-btn');
    $('body').on("click", '.up-btn', function(event){
        var _this_up_btn = $(this); 
        var up_url = _this_up_btn.data('url');
        BootstrapDialog.confirm({
            title: "上传 - Upload",
            message: '<form method="POST" action="'+up_url+'" enctype="multipart/form-data" ><input type="file" name="imgFile" class="Uploads" /></form>',
            btnCancelLabel: '取消',
            btnOKLabel: '确定',
            callback: function(result) {
                if(result) {
                    var form = $('.modal-dialog').find('form');
                    var ajax_option={
                        dataType:'json',
                        success:function(data){
                            if(data.success == '1'){
                                _this_up_btn.prev().attr("href", data.url);
                                _this_up_btn.prev().find('img').attr("src", data.url);
                                _this_up_btn.closest('.input-group').find('input').val(data.url);
                                $.amaran({'message':data.info});
                            }else{
                                $.amaran({'message':data.info});
                            }
                        }
                    }
                    form.ajaxSubmit(ajax_option);
                }
            }
        });
    });


    $('body').off('click', '.submits');
    $('body').on("click", '.submits', function(event){
        var _this = $(this);
        _this.button('loading');
        var form = _this.closest('form');
        if(form.length){
            var ajax_option={
                dataType:'json',
                success:function(data){
                    if(data.status == '1'){
                        $.amaran({'message':data.info});
                    }else{
                         $.amaran({'message':data.info});
                    }
                }
            }
            form.ajaxSubmit(ajax_option);
        }
    });



});

$(function(){
    var new_scroll_position = 0;
    var last_scroll_position;
    var header = document.getElementById("nav-head");

    window.addEventListener('scroll', function(e) {
    last_scroll_position = window.scrollY;

    // Scrolling down
    if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
        // header.removeClass('slideDown').addClass('slideUp');
        header.classList.remove("slideDown");
        header.classList.add("slideUp");

      // Scrolling up
    } else if (new_scroll_position > last_scroll_position) {
        // header.removeClass('slideUp').addClass('slideDown');
        header.classList.remove("slideUp");
        header.classList.add("slideDown");
    }

      new_scroll_position = last_scroll_position;
    });
    
});