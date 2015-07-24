(function(angular) {
    'use strict';

    var lfNgMdFileinput = angular.module('lfNgMdFileinput', ['ngMaterial']);

    lfNgMdFileinput.directive('lfNgMdFileInput',function($q){
        return {
            restrict: 'E',
            template:  ['<div class="lf-md-file-input" >',
                            '<div class="lf-md-file-input-preview" ng-show="bool_file_null && bool_file_draggable">',
                                '<div class="lf-md-file-input-drag" >',
                                    '<div class="lf-md-file-input-drag-text">Drag & drop files here …</div>',
                                '</div>',
                            '</div>',
                            '<div class="lf-md-file-input-preview" ng-hide="bool_file_null || !bool_file_preview">',
                                '<div class="close lf-md-file-input-x" ng-click="onFileRemoved()">&times;</div>',
                                '<div class="lf-md-file-input-thumbnails">',
                                    '<div class="lf-md-file-input-frame" ng-repeat="lffile in lfFiles">',
                                        '<div class="close lf-md-file-input-x" ng-click="fileRemovedAt($index)">&times;</div>',
                                        '<img ng-src={{lffile.DataUrl}}>',
                                        '<div class="lf-md-file-input-frame-footer">',
                                            '<div class="lf-md-file-input-frame-caption">{{lffile.File.name}}</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                                '<div class="clearfix"></div>',
                            '</div>',
                            '<div class="lf-md-file-input-container" >',
                                '<div tabindex="-1" class="lf-md-file-input-caption">',
                                    '<!--<span class="file-caption-ellipsis">&hellip;</span>-->',
                                    '<div class="lf-md-file-input-caption-text" ng-hide="bool_file_null">',
                                        '<span class="glyphicon glyphicon-file kv-caption-icon"></span>',
                                        '{{str_file_name}}',
                                    '</div>',
                                    '<div class="lf-md-file-input-caption-text-default" ng-show="bool_file_null">',
                                        ' {{str_caption_placeholder}}',
                                    '</div>',
                                '</div>',
                                '<div class="" style="position:relative;display:table-cell;width:1%;white-space:nowrap;">',
                                    '<md-button ng-hide="bool_file_null" ng-click="onFileRemoved()" class="md-raised lf-md-file-input-button lf-md-file-input-button-remove">',
                                        '<span><i class="glyphicon glyphicon-trash"></i>&nbsp;Remove</span>',
                                    '</md-button><!--',
                                    '--><md-button class="md-raised md-primary lf-md-file-input-button lf-md-file-input-button-brower">',
                                        '<span><i class="glyphicon glyphicon-folder-open"></i>&nbsp;Browse</span>',
                                        '<input type="file" accept="image/*" class="lf-md-file-type-input" onchange="angular.element(this).scope().onFileChanged(this)"/>',
                                    '</md-button>',
                                '</div>',
                            '</div>',
                        '</div>'].join(''),
            replace: true,
            scope:{
                lfFiles:'=?',
                lfPlaceholder:'@?'
            },
            link: function(scope,element,attrs){

                scope.lfFiles = [];

                scope.bool_file_multiple = false;
                scope.bool_file_draggable = false;
                scope.bool_file_preview = false;
                scope.bool_file_null = true;

                scope.str_file_name = '';
                scope.str_caption_placeholder = 'Select file';

                if('lfPlaceholder' in attrs){
                    scope.str_caption_placeholder = scope.lfPlaceholder;
                }

                if('preview' in attrs){
                    scope.bool_file_preview = true;
                }

                if('draggable' in attrs){
                    scope.bool_file_draggable = true;
                }

                if('multiple' in attrs){
                    angular.forEach(element.find('input'),function(obj,index){
                        if(angular.element(obj).attr('type')=='file'){
                            scope.bool_file_multiple = true;
                            angular.element(obj).attr('multiple','multiple');
                        }
                    });
                }else{
                    angular.forEach(element.find('input'),function(obj,index){
                        if(angular.element(obj).attr('type')=='file'){
                            angular.element(obj).removeAttr('multiple');
                        }
                    });
                }

                angular.forEach(element.find('div'),function(obj,index){
                    if(angular.element(obj).attr('class')=='lf-md-file-input-drag'){

                        var div_drag = angular.element(obj);
                        div_drag.bind("dragover", function(e){

                            e.stopPropagation();
                            e.preventDefault();

                            div_drag.addClass("lf-md-file-input-drag-hover");
                            //e.target.className = (e.type == "dragover" ? "lf-md-filedrag.hover" : "lf-md-filedrag");
                        });
                        div_drag.bind("dragleave", function(e){

                            e.stopPropagation();
                            e.preventDefault();
                            div_drag.removeClass("lf-md-file-input-drag-hover");
                            //e.target.className = (e.type == "dragover" ? "lf-md-filedrag.hover" : "lf-md-filedrag");
                        });
                        div_drag.bind("drop", function(e){

                            e.stopPropagation();
                            e.preventDefault();

                            scope.lfFiles = [];
                            
                            var files_target = e.target.files || e.dataTransfer.files;
                            var files = [];

                            angular.forEach(files_target,function(obj,index){
                                console.log(obj.type);
                                if(obj.type.match(/^image\//)){
                                    files.push(obj);
                                }
                            });

                            if(files.length>0){
                                scope.bool_file_null = false;
                            }
                            //var file = files[0];
                            //console.log(files.splice(1));
                            if(scope.bool_file_multiple){
                                if(files.length == 1){
                                    scope.str_file_name = ' ' + files[0].name;//'file name';//scope.lfFiles[0].file.name;
                                }else{
                                    scope.str_file_name = ' ' + files.length + ' files selected';//'&hellip;';
                                }
                                for(var i=0;i<files.length;i++){
                                    console.log(files[i]);
                                    readAsDataURL(files[i],i).then(function(result){

                                        scope.lfFiles.push({
                                            "File":files[result.index],
                                            "DataUrl":result.result
                                        });

                                    },function(error){

                                    },function(notify){
                                        console.log(notify);
                                        //$scope.lf.progress = notify*100;
                                    });
                                }
                            }else{
                                if(files.length >= 1){
                                    scope.str_file_name = ' ' + files[0].name;//'file name';//scope.lfFiles[0].file.name;
                                    readAsDataURL(files[0],0).then(function(result){
                                        scope.lfFiles.push({
                                            "File":files[result.index],
                                            "DataUrl":result.result
                                        });
                                    },function(error){

                                    },function(notify){

                                    });
                                }
                            }

                        });
                    }
                });


                //console.log('')
                

                scope.onFileRemoved = function(){
                    scope.lfFiles = [];
                    scope.str_file_name = '';
                    scope.bool_file_null = true;
                };

                scope.fileRemovedAt = function(index){
                    scope.lfFiles.splice(index,1);
                    if(scope.lfFiles.length == 0){
                        scope.lfFiles = [];
                        scope.str_file_name = '';
                        scope.bool_file_null = true;
                    }else{
                        if(scope.lfFiles.length == 1){
                            scope.str_file_name = ' ' + scope.lfFiles[0].file.name;//'file name';//scope.lfFiles[0].file.name;
                        }else{
                            scope.str_file_name = ' ' + scope.lfFiles.length + ' files selected';//'&hellip;';
                        }
                    }  
                };

                scope.onFileChanged = function(e){
                
                    var files = e.files;

                    scope.lfFiles = [];//e.files;

                    scope.bool_file_null = false;
                    
                    if(files.length>0){

                        if(files.length == 1){
                            scope.str_file_name = ' ' + files[0].name;//'file name';//scope.lfFiles[0].file.name;
                        }else{
                            scope.str_file_name = ' ' + files.length + ' files selected';//'&hellip;';
                        }

                        for(var i=0;i<files.length;i++){
                            
                            readAsDataURL(files[i],i).then(function(result){

                                scope.lfFiles.push({
                                    "File":files[result.index],
                                    "DataUrl":result.result
                                });

                            },function(error){

                            },function(notify){

                            });
                        }
                    }
                    
                };

                var readAsDataURL = function (file,index) {
                
                    var deferred = $q.defer();
                    
                    var reader = new FileReader();//getReader(deferred, scope);         
                    
                    reader.onloadstart = function(){
                        deferred.notify(0);
                    };

                    reader.onload = function(event){
                        deferred.resolve({
                            'index':index,
                            'result':reader.result
                        });
                    };

                    reader.onerror = function(event){
                        deferred.reject(reader.result);
                    };

                    reader.onprogress = function(event){
                        deferred.notify(event.loaded/event.total);
                    };

                    reader.readAsDataURL(file);
                    
                    return deferred.promise;
                };

            }

        }
    });




})(window.angular);
