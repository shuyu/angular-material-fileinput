(function(angular) {
    'use strict';

    var version = '0.1.3';

    var lfNgMdFileinput = angular.module('lfNgMdFileInput', ['ngMaterial','ngMdIcons']);

    lfNgMdFileinput.directive('lfNgMdFileInput',['$q', function($q){
        return {
            restrict: 'E',
            template:  ['<div class="lf-ng-md-file-input" >',
                            '<div class="lf-ng-md-file-input-preview-container" ng-class="{\'disabled\':bool_disabled}" ng-show="bool_file_null && bool_file_draggable">',
                                '<div class="lf-ng-md-file-input-drag" >',
                                    '<div class="lf-ng-md-file-input-drag-text"> Drag & drop files here ... </div>',
                                '</div>',
                            '</div>',
                            '<div class="lf-ng-md-file-input-preview-container" ng-class="{\'disabled\':bool_disabled}" ng-hide="bool_file_null || !bool_file_preview">',
                                '<div class="close lf-ng-md-file-input-x" ng-click="removeFile()">&times;</div>',
                                '<div class="lf-ng-md-file-input-thumbnails">',
                                    '<div class="lf-ng-md-file-input-frame" ng-repeat="lffile in lfFiles">',
                                        '<div class="close lf-ng-md-file-input-x" ng-click="removeFileAt($index)">&times;</div>',
                                        '<img ng-src={{lffile.lfDataUrl}}>',
                                        '<div class="lf-ng-md-file-input-frame-footer">',
                                            '<div class="lf-ng-md-file-input-frame-caption">{{lffile.lfFile.name}}</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="clearfix" style="clear:both"></div>',
                                '</div>',
                            '</div>',
                            '<div class="lf-ng-md-file-input-container" >',
                                '<div tabindex="-1" class="lf-ng-md-file-input-caption" ng-class="{\'disabled\':bool_disabled}">',
                                    '<!--<span class="file-caption-ellipsis">&hellip;</span>-->',
                                    '<div class="lf-ng-md-file-input-caption-text" ng-hide="bool_file_null">',
                                        '<ng-md-icon icon="insert_drive_file" size="20" style="fill:black; "></ng-md-icon>',//attach_file
                                        '{{str_file_name}}',
                                    '</div>',
                                    '<div class="lf-ng-md-file-input-caption-text-default" ng-show="bool_file_null">',
                                        ' {{str_caption_placeholder}}',
                                    '</div>',
                                '</div>',
                                '<div class="" style="position:relative;display:table-cell;width:1%;white-space:nowrap;">',
                                    '<md-button type="button" ng-disabled="bool_disabled" ng-hide="bool_file_null" ng-click="removeFile()" class="md-raised lf-ng-md-file-input-button lf-ng-md-file-input-button-remove">',
                                        '<ng-md-icon icon="delete" size="24" style="fill:black;"></ng-md-icon>',
                                        ' Remove',
                                    '</md-button><!--',
                                    '--><md-button type="button" ng-disabled="bool_disabled" class="md-raised md-primary lf-ng-md-file-input-button lf-ng-md-file-input-button-brower">',
                                        '<ng-md-icon icon="folder_open" size="24" style="fill:white;"></ng-md-icon>',
                                        ' Browse',
                                        '<input type="file" accept="{{accept}}" ng-disabled="bool_disabled" class="lf-ng-md-file-input-type" onchange="angular.element(this).scope().onFileChanged(this)"/>',
                                    '</md-button>',
                                '</div>',
                            '</div>',
                        '</div>'].join(''),
            replace: true,
            scope:{
                lfFiles:'=?',
                lfPlaceholder:'@?',
                accept:'@?',
                ngDisabled:'=?'
            },
            link: function(scope,element,attrs){

                scope.accept = scope.accept || 'image/*';
                
                scope.lfFiles = [];

                scope.bool_file_multiple = false;
                scope.bool_file_draggable = false;
                scope.bool_file_preview = false;
                scope.bool_file_null = true;

                scope.bool_disabled = false;

                scope.str_file_name = '';
                scope.str_caption_placeholder = 'Select file';

                if (angular.isDefined(attrs.ngDisabled) ) {
                    scope.$watch(function(){
                        return scope.ngDisabled;
                    }, function(isDisabled) {
                        scope.bool_disabled = isDisabled;
                    });
                }

                if(scope.lfPlaceholder){
                    scope.str_caption_placeholder = scope.lfPlaceholder;
                }else{
                    scope.str_caption_placeholder = 'Select file';
                }

                if('preview' in attrs){
                    scope.bool_file_preview = true;
                }

                if('drag' in attrs){
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
                    if(angular.element(obj).attr('class')=='lf-ng-md-file-input-drag'){

                        var div_drag = angular.element(obj);
                        div_drag.bind("dragover", function(e){

                            e.stopPropagation();
                            e.preventDefault();

                            if(scope.bool_disabled){
                                return;
                            }
                        
                            div_drag.addClass("lf-ng-md-file-input-drag-hover");

                        });
                        div_drag.bind("dragleave", function(e){

                            e.stopPropagation();
                            e.preventDefault();

                            if(scope.bool_disabled){
                                return;
                            }

                            div_drag.removeClass("lf-ng-md-file-input-drag-hover");

                        });
                        div_drag.bind("drop", function(e){

                            e.stopPropagation();
                            e.preventDefault();

                            if(scope.bool_disabled){
                                return;
                            }

                            div_drag.removeClass("lf-ng-md-file-input-drag-hover");

                            scope.lfFiles = [];
                            
                            var files_target = e.target.files || e.dataTransfer.files;
                            var files = [];

                            var regexp = new RegExp(scope.accept, "i");

                            angular.forEach(files_target,function(obj,index){
                                if(obj.type.match(regexp)){
                                    files.push(obj);
                                }
                            });

                            if(files.length>0){
                                scope.bool_file_null = false;
                            }

                            if(scope.bool_file_multiple){
                                if(files.length == 1){
                                    scope.str_file_name = '' + files[0].name;
                                }else{
                                    scope.str_file_name = '' + files.length + ' files selected';
                                }
                                for(var i=0;i<files.length;i++){
                                    // console.log(files[i]);
                                    readAsDataURL(files[i],i).then(function(result){

                                        scope.lfFiles.push({
                                            "lfFile":files[result.index],
                                            "lfDataUrl":result.result
                                        });

                                    },function(error){

                                    },function(notify){
                                        // console.log(notify);
                                        //$scope.lf.progress = notify*100;
                                    });
                                }
                            }else{
                                if(files.length >= 1){
                                    scope.str_file_name = '' + files[0].name;
                                    readAsDataURL(files[0],0).then(function(result){
                                        scope.lfFiles.push({
                                            "lfFile":files[result.index],
                                            "lfDataUrl":result.result
                                        });
                                    },function(error){

                                    },function(notify){

                                    });
                                }
                            }

                        });
                    }
                });

                scope.removeFile = function(){
                    if(scope.bool_disabled){
                        return;
                    }
                    scope.lfFiles = [];
                    scope.str_file_name = '';
                    scope.bool_file_null = true;
                };

                scope.removeFileAt = function(index){
                    if(scope.bool_disabled){
                        return;
                    }
                    scope.lfFiles.splice(index,1);
                    if(scope.lfFiles.length == 0){
                        scope.lfFiles = [];
                        scope.str_file_name = '';
                        scope.bool_file_null = true;
                    }else{
                        if(scope.lfFiles.length == 1){
                            scope.str_file_name = '' + scope.lfFiles[0].lfFile.name;
                        }else{
                            scope.str_file_name = '' + scope.lfFiles.length + ' files selected';
                        }
                    }  
                };

                scope.onFileChanged = function(e){
                
                    var files = e.files;

                    scope.lfFiles = [];//e.files;

                    scope.bool_file_null = false;
                    
                    if(files.length>0){

                        if(files.length == 1){
                            scope.str_file_name = '' + files[0].name;
                        }else{
                            scope.str_file_name = '' + files.length + ' files selected';
                        }

                        for(var i=0;i<files.length;i++){
                            
                            readAsDataURL(files[i],i).then(function(result){

                                scope.lfFiles.push({
                                    "lfFile":files[result.index],
                                    "lfDataUrl":result.result
                                });

                            },function(error){

                            },function(notify){

                            });
                        }
                    }
                    
                };

                var parseFileType = function (file){
                    var type =  file.type;
                    var name =  file.name;
                    if(isImageType(type,name)){
                        return "image";
                    }
                    return "other";
                };

                var isImageType = function(type,name){
                    return (type.match('image.*') || name.match(/\.(gif|png|jpe?g)$/i)) ? true : false;
                };
                // image: function (vType, vName) {
                //     return (vType !== undefined) ? vType.match('image.*') : vName.match(/\.(gif|png|jpe?g)$/i);
                // },
                // html: function (vType, vName) {
                //     return (vType !== undefined) ? vType === 'text/html' : vName.match(/\.(htm|html)$/i);
                // },
                // text: function (vType, vName) {
                //     return (vType !== undefined && vType.match('text.*')) || vName.match(
                //             /\.(txt|md|csv|nfo|ini|json|php|js|css)$/i);
                // },
                // video: function (vType, vName) {
                //     return (vType !== undefined && vType.match(/\.video\/(ogg|mp4|webm|3gp)$/i)) || vName.match(
                //             /\.(og?|mp4|webm|3gp)$/i);
                // },
                // audio: function (vType, vName) {
                //     return (vType !== undefined && vType.match(/\.audio\/(ogg|mp3|wav)$/i)) || vName.match(/\.(ogg|mp3|wav)$/i);
                // },
                // flash: function (vType, vName) {
                //     return (vType !== undefined && vType === 'application/x-shockwave-flash') || vName.match(/\.(swf)$/i);
                // },
                // object: function () {
                //     return true;
                // },
                // other: function () {
                //     return true;
                // }

                var readAsDataURL = function (file,index) {
                
                    var deferred = $q.defer();
                    
                    var reader = new FileReader();       
                    
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
    }]);

})(window.angular);
