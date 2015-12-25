(function(angular) {
    'use strict';

    var lfNgMdFileinput = angular.module('lfNgMdFileInput', ['ngMaterial','ngMdIcons']);

    lfNgMdFileinput.filter('lfTrusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    lfNgMdFileinput.directive('lfNgMdFileInput',['$q', function($q,$compile){
        return {
            restrict: 'E',
            template:  ['<div class="lf-ng-md-file-input">',
                            // '<div class="lf-ng-md-file-input-preview-container" ng-class="{\'disabled\':bool_disabled}" ng-show="bool_file_null && bool_file_drag">',
                            //     '<div class="lf-ng-md-file-input-drag" >',
                            //         '<div class="lf-ng-md-file-input-drag-text"> Drag & drop files here ... </div>',
                            //     '</div>',
                            // '</div>',
                            // '<div class="lf-ng-md-file-input-preview-container" ng-class="{\'disabled\':bool_disabled}" ng-hide="bool_file_null || !bool_file_preview">',
                            '<div class="lf-ng-md-file-input-preview-container" ng-class="{\'disabled\':bool_disabled}" ng-show="bool_file_drag || (bool_file_preview && !bool_file_null)">',
                                '<div class="close lf-ng-md-file-input-x" ng-click="removeFile()" ng-hide="bool_file_null" >&times;</div>',
                                '<div class="lf-ng-md-file-input-drag">',
                                    '<div layout="row" layout-align="center center" class="lf-ng-md-file-input-drag-text-container" ng-show="bool_file_null && bool_file_drag">',
                                        '<div class="lf-ng-md-file-input-drag-text">Drag & drop files here ...</div>', 
                                    '</div>',
                                    '<div class="lf-ng-md-file-input-thumbnails">',
                                        '<div class="lf-ng-md-file-input-frame" ng-repeat="lffile in lfFiles">',
                                            '<div class="close lf-ng-md-file-input-x" ng-click="removeFileAt($index)">&times;</div>',
                                                '<img ng-if="lffile.lfTagType==\'image\'" ng-src="{{lffile.lfDataUrl | lfTrusted}}" >',
                                                '<video controls ng-if="lffile.lfTagType==\'video\'">',
                                                    '<source ng-src="{{lffile.lfDataUrl | lfTrusted}}" type={{lffile.lfType}}>',
                                                '</video>',
                                                '<audio controls ng-if="lffile.lfTagType==\'audio\'">',
                                                    '<source ng-src="{{lffile.lfDataUrl | lfTrusted}}" type={{lffile.lfType}}>',
                                                '</audio>',
                                                '<object ng-if="lffile.lfTagType==\'object\'" data={{lffile.lfDataUrl}}></object>',
                                            '<div class="lf-ng-md-file-input-frame-footer">',
                                                '<div class="lf-ng-md-file-input-frame-caption">{{lffile.lfFile.name}}</div>',
                                            '</div>',
                                        '</div>',
                                        '<div class="clearfix" style="clear:both"></div>',
                                    '</div>',
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
                                        '<input type="file" accept="{{accept}}" ng-disabled="bool_disabled" class="lf-ng-md-file-input-tag" onchange="angular.element(this).scope().onFileChanged(this)"/>',
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

                var el_fileinput = angular.element(element[0].querySelector('.lf-ng-md-file-input-tag'));
                var el_dragview = angular.element(element[0].querySelector('.lf-ng-md-file-input-drag'));
                // var el_dragview = angular.element(element[0].getElementsByClassName('lf-ng-md-file-input-drag'));
                //console.log(el_dragview);
                scope.bool_file_preview = false;
                scope.bool_file_drag = false;
                scope.bool_file_multiple = false;
                
                if('preview' in attrs){
                    scope.bool_file_preview = true;
                }

                if('drag' in attrs){
                    scope.bool_file_drag = true;
                }

                if('multiple' in attrs){
                    el_fileinput.attr('multiple','multiple');
                    scope.bool_file_multiple = true;
                }else{
                    el_fileinput.removeAttr('multiple');
                }

                scope.bool_disabled = false;

                if (angular.isDefined(attrs.ngDisabled) ) {
                    scope.$watch(function(){
                        return scope.ngDisabled;
                    }, function(isDisabled) {
                        scope.bool_disabled = isDisabled;
                    });
                }

                scope.accept = scope.accept || '';//'image/*';
                
                scope.lfFiles = [];
                scope.bool_file_null = true;

                scope.str_file_name = '';
                scope.str_caption_placeholder = 'Select file';                

                if(scope.lfPlaceholder){
                    scope.str_caption_placeholder = scope.lfPlaceholder;
                }

                el_dragview.bind("dragover", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    if(scope.bool_disabled || !scope.bool_file_drag){
                        return;
                    }
                    el_dragview.addClass("lf-ng-md-file-input-drag-hover");
                });

                el_dragview.bind("dragleave", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    if(scope.bool_disabled || !scope.bool_file_drag){
                        return;
                    }
                    el_dragview.removeClass("lf-ng-md-file-input-drag-hover");
                });

                el_dragview.bind("drop", function(e){

                    e.stopPropagation();
                    e.preventDefault();
                    if(scope.bool_disabled || !scope.bool_file_drag){
                        return;
                    }
                    el_dragview.removeClass("lf-ng-md-file-input-drag-hover");

                    scope.lfFiles = [];
                    
                    var files_target = e.target.files || e.dataTransfer.files;
                    var files = [];

                    var regexp = new RegExp(scope.accept, "i");
                    // console.log()
                    angular.forEach(files_target,function(obj,index){
                        //console.log(obj);
                        //console.log(obj.type.match(regexp));
                        if(obj.type.match(regexp)){
                            console.log('match true');
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

                                var lfFile = files[result.index];
                                var lfFileType = lfFile.type;
                                var lfTagType = parseFileType(lfFile);
                                var lfDataUrl = window.URL.createObjectURL(lfFile);
                                
                                if(lfTagType == "image"){
                                    lfDataUrl = result.result;
                                }

                                scope.lfFiles.push({
                                    "lfFile":lfFile,
                                    "lfFileType":lfFileType,
                                    "lfTagType":lfTagType,
                                    "lfDataUrl":lfDataUrl
                                });

                            },function(error){

                            },function(notify){

                            });
                        }
                    }else{
                        if(files.length >= 1){
                            scope.str_file_name = '' + files[0].name;
                            readAsDataURL(files[0],0).then(function(result){
                                scope.lfFiles.push({
                                    "lfFile":lfFile,
                                    "lfFileType":lfFileType,
                                    "lfTagType":lfTagType,
                                    "lfDataUrl":lfDataUrl
                                });
                            },function(error){

                            },function(notify){

                            });
                        }
                    }

                });

                scope.removeFile = function(){
                    if(scope.bool_disabled){
                        return;
                    }

                    scope.lfFiles = [];
                    scope.str_file_name = '';
                    scope.bool_file_null = true;

                    el_fileinput.val('');
                    
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
                    
                    // console.log('onFileChanged');

                    var files = e.files;

                    scope.lfFiles = [];//e.files;

                    scope.bool_file_null = false;
                    
                    if(files.length>0){

                        if(files.length == 1){
                            scope.str_file_name = '' + files[0].name;
                        }else{
                            scope.str_file_name = '' + files.length + ' files selected';
                        }

                        console.log(files);

                        for(var i=0;i<files.length;i++){
                            
                            var count = 0;

                            // setTimeout(readFile(i + 1), 100);
                            
                            readAsDataURL(files[i],i).then(function(result){

                                var lfFile = files[result.index];
                                var lfFileType = lfFile.type;
                                var lfTagType = parseFileType(lfFile);
                                var lfDataUrl = window.URL.createObjectURL(lfFile);
                                
                                // if(lfTagType == "image"){
                                //     lfDataUrl = result.result;
                                // }

                                scope.lfFiles.push({
                                    "lfFile":lfFile,
                                    "lfFileType":lfFileType,
                                    "lfTagType":lfTagType,
                                    "lfDataUrl":lfDataUrl
                                });

                                count++;

                                if( count == files.length ){
                                    el_fileinput.val('');
                                    console.log(scope.lfFiles);
                                }

                            },function(error){

                            },function(notify){

                            });
                        }

                        //console.log('should first');
                    }
                    
                };

                var parseFileType = function (file){
                    var type =  file.type;
                    var name =  file.name;
                    console.log(file);
                    console.log("file name : "+name);
                    console.log("file type : "+type);
                    if(isImageType(type,name)){
                        return "image";
                    }else if(isVideoType(type,name)){
                        return "video";
                    }else if(isAudioType(type,name)){
                        return "audio";
                    }
                    return "object";
                };

                var isImageType = function(type,name){
                    return (type.match('image.*') || name.match(/\.(gif|png|jpe?g)$/i)) ? true : false;
                };

                var isVideoType = function(type,name){
                    return (type.match('video.*') || name.match(/\.(og?|mp4|webm|3gp)$/i)) ? true : false;
                };
                var isAudioType = function(type,name){
                    return (type.match('audio.*') || name.match(/\.(ogg|mp3|wav)$/i)) ? true : false;
                };
                // var isAudioType = function(type,name){
                //     return (type.match('audio.*') || name.match(/\.(ogg|mp3|wav)$/i)) ? true : false;
                // };

                //file_extension  A file extension starting with the STOP character, e.g: .gif, .jpg, .png, .doc
                //audio/* All sound files are accepted
                //video/* All video files are accepted
                //image/* All image files are accepted
                
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
                        // window.URL
                        console.log(event);
                        console.log('onload');
                        console.log(reader.result);
                        
                    };

                    reader.onloadend = function(event){
                        console.log(event);
                        console.log('on load end');
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

                    // if()
                    reader.readAsArrayBuffer(file);
                    // reader.readAsDataURL(file);
                    
                    return deferred.promise;
                };

            }

        }
    }]);

})(window.angular);
