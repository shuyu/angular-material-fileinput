(function(window,angular,undefined) {

    'use strict';

    var genLfObjId = function(){
    	return 	'lfobjxxxxxxxx'.replace(/[xy]/g, function(c) {
	    			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    			return v.toString(16);
				});
    };

    var lfNgMdFileinput = angular.module('lfNgMdFileInput', ['ngMaterial']);

    lfNgMdFileinput.filter('lfTrusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    lfNgMdFileinput.directive('lfRequired', function() {
        return {
            restrict: "A",
            require:"ngModel",
            link: function(scope, element, attrs, ctrl) {
            	if (!ctrl) {
            		return;
      			}
      			ctrl.$validators.required = function(modelValue,viewValue) {
      				if(!modelValue){
      					return false;
      				}
        			return modelValue.length>0;
      			};
            }
        }
    });

    lfNgMdFileinput.directive('lfMaxcount', function() {
        return {
            restrict: "A",
            require:"ngModel",
            link: function(scope, element, attrs ,ctrl) {
            	if (!ctrl) {
            		return;
      			}
            	var intMax = -1;
				attrs.$observe('lfMaxcount', function(value) {
					var intVal = parseInt(value,10);
					intMax = isNaN(intVal) ? -1 : intVal;
					ctrl.$validate();
				});
                ctrl.$validators.maxcount = function(modelValue,viewValue) {
                	if(!modelValue){
      					return false;
      				}
                    return modelValue.length <= intMax;
                };
            }
        }
    });

    lfNgMdFileinput.directive('lfFilesize', function() {
        return {
            restrict: "A",
            require:"ngModel",
            link: function(scope, element, attrs ,ctrl) {
            	if (!ctrl) {
            		return;
      			}
            	var intMax = -1;
				attrs.$observe('lfFilesize', function(value) {
					var reg = /^[1-9][0-9]*(Byte|KB|MB)$/;
					if(!reg.test(value)){
						intMax = -1;
					}else{
						var sizes = ['Byte', 'KB', 'MB'];
						var unit = value.match(reg)[1];
						var number = value.substring(0,value.indexOf(unit));
						sizes.every(function(obj,idx){
							if(unit === obj){
								intMax = parseInt(number)*Math.pow(1024,idx);
								return false;
							}else{
								return true;
							}
						});
					}
					ctrl.$validate();
				});
                ctrl.$validators.filesize = function(modelValue,viewValue) {
                	if(!modelValue){
      					return false;
      				}
      				var boolValid = true;
      				modelValue.every(function(obj,idx){
      					if(obj.lfFile.size > intMax){
      						boolValid = false;
      						return false;
      					}else{
      						return true;
      					}
      				});
      				return boolValid;
                };
            }
        }
    });

	lfNgMdFileinput.directive('lfTotalsize', function() {
        return {
            restrict: "A",
            require:"ngModel",
            link: function(scope, element, attrs ,ctrl) {
            	if (!ctrl) {
            		return;
      			}
            	var intMax = -1;
				attrs.$observe('lfTotalsize', function(value) {
					var reg = /^[1-9][0-9]*(Byte|KB|MB)$/;
					if(!reg.test(value)){
						intMax = -1;
					}else{
						var sizes = ['Byte', 'KB', 'MB'];
						var unit = value.match(reg)[1];
						var number = value.substring(0,value.indexOf(unit));
						sizes.every(function(obj,idx){
							if(unit === obj){
								intMax = parseInt(number)*Math.pow(1024,idx);
								return false;
							}else{
								return true;
							}
						});
					}
					ctrl.$validate();
				});
                ctrl.$validators.totalsize = function(modelValue,viewValue) {
                	if(!modelValue){
      					return false;
      				}
      				var intTotal = 0;
      				angular.forEach(modelValue,function(obj,idx){
      					intTotal = intTotal + obj.lfFile.size;
      				});
      				return intTotal < intMax;
                };
            }
        }
    });

    lfNgMdFileinput.directive('lfMimetype', function() {
        return {
            restrict: "A",
            require:"ngModel",
            link: function(scope, element, attrs ,ctrl) {
                if (!ctrl) {
                    return;
                }
                var reg;
                attrs.$observe('lfMimetype', function(value) {
                    reg = new RegExp(value, "i");
                    ctrl.$validate();
                });
                ctrl.$validators.mimetype = function(modelValue,viewValue) {
                    if(!modelValue){
                        return false;
                    }
                    var boolValid = true;
                    modelValue.every(function(obj,idx){
                        if(obj.lfFile.type.match(reg)){
                            return true;
                        }else{
                            boolValid = false;
                            return false;
                        }
                    });
                    return boolValid;
                };
            }
        }
    });

    lfNgMdFileinput.directive('lfNgMdFileInput',['$q','$compile','$timeout', function($q,$compile,$timeout){
        return {
            restrict: 'E',
            template:  ['<div layout="column" class="lf-ng-md-file-input" ng-model="'+genLfObjId()+'">',
                            '<div layout="column" class="lf-ng-md-file-input-preview-container" ng-class="{\'disabled\':isDisabled}" ng-show="isDrag || (isPreview && !isFilesNull)">',
                                '<div class="close lf-ng-md-file-input-x" ng-click="removeAllFiles($event)" ng-hide="isFilesNull || !isPreview" >&times;</div>',
                                '<div class="lf-ng-md-file-input-drag">',
                                    '<div layout="row" layout-align="center center" class="lf-ng-md-file-input-drag-text-container" ng-show="(isFilesNull || !isPreview) && isDrag">',
                                        '<div class="lf-ng-md-file-input-drag-text">{{strCaptionDragAndDrop}}</div>',
                                    '</div>',
                                    '<div class="lf-ng-md-file-input-thumbnails" ng-show="isPreview">',
                                    '</div>',
                                    '<div class="clearfix" style="clear:both"></div>',
                                '</div>',
                            '</div>',
                            '<div layout="row" class="lf-ng-md-file-input-container" >',
                                '<div class="lf-ng-md-file-input-caption" layout="row" layout-align="start center" flex ng-class="{\'disabled\':isDisabled}" >',
                                    '<md-icon class="lf-icon" ng-class="strCaptionIconCls"></md-icon>',
                                    '<div flex class="lf-ng-md-file-input-caption-text-default" ng-show="isFilesNull">',
                                        '{{strCaptionPlaceholder}}',
                                    '</div>',
                                    '<div flex class="lf-ng-md-file-input-caption-text" ng-hide="isFilesNull">',
                                        '{{strCaption}}',
                                    '</div>',
                                    '<md-progress-linear md-mode="determinate" value="{{floatProgress}}" ng-show="intLoading && isProgress"></md-progress-linear>',
                                '</div>',
                                '<md-button ng-disabled="isDisabled" ng-click="removeAllFiles()" ng-hide="isFilesNull || intLoading" class="md-raised lf-ng-md-file-input-button lf-ng-md-file-input-button-remove" >',
                                    '<md-icon class="lf-icon" ng-class="strRemoveIconCls"></md-icon> ',
                                    '{{strCaptionRemove}}',
                                '</md-button>',
                                '<md-button ng-disabled="isDisabled" ng-click="openDialog($event, this)" class="md-raised md-primary lf-ng-md-file-input-button lf-ng-md-file-input-button-brower" >',
                                    '<md-icon class="lf-icon" ng-class="strBrowseIconCls"></md-icon> ',
                                    '{{strCaptionBrowse}}',
                                    '<input type="file" aria-label="{{strAriaLabel}}" accept="{{accept}}" ng-disabled="isDisabled" class="lf-ng-md-file-input-tag" />',//,onchange="angular.element(this).scope().onFileChanged(this)"/>',
                                '</md-button>',
                            '</div>',

                        '</div>'].join(''),
            replace: true,
            require:"ngModel",
            scope:{
                lfFiles:'=?',
                lfApi:'=?',
                lfOption:'=?',
                lfCaption:'@?',
                lfPlaceholder:'@?',
				lfDragAndDropLabel:'@?',
				lfBrowseLabel: '@?',
				lfRemoveLabel: '@?',
                lfOnFileClick: '=?',
                accept:'@?',
                ngDisabled:'=?'
            },
            link: function(scope,element,attrs,ctrl){

                var elFileinput = angular.element(element[0].querySelector('.lf-ng-md-file-input-tag'));
                var elDragview  = angular.element(element[0].querySelector('.lf-ng-md-file-input-drag'));
                var elThumbnails = angular.element(element[0].querySelector('.lf-ng-md-file-input-thumbnails'));

                var isCustomCaption = false;
                var intFilesCount = 0;

                scope.intLoading = 0;
                scope.floatProgress = 0;

                scope.isPreview = false;
                scope.isDrag = false;
                scope.isMutiple = false;
                scope.isProgress = false;

                if(angular.isDefined(attrs.preview)){
                    scope.isPreview = true;
                }

                if(angular.isDefined(attrs.drag)){
                    scope.isDrag = true;
                };

                if(angular.isDefined(attrs.multiple)){
                    elFileinput.attr('multiple','multiple');
                    scope.isMutiple = true;
                }else{
                    elFileinput.removeAttr('multiple');
                }

                if(angular.isDefined(attrs.progress)){
                    scope.isProgress = true;
                }

                scope.isDisabled = false;

                if (angular.isDefined(attrs.ngDisabled) ) {
                    scope.$watch('ngDisabled', function(isDisabled) {
                        scope.isDisabled = isDisabled;
                    });
                }

                scope.strBrowseIconCls = "lf-browse";
                scope.strRemoveIconCls = "lf-remove";
                scope.strCaptionIconCls = "lf-caption";
                scope.strUnknowIconCls = "lf-unknow";

                if(angular.isDefined(attrs.lfOption)){
                    if(angular.isObject(scope.lfOption)){
                        if(scope.lfOption.hasOwnProperty('browseIconCls')){
                            scope.strBrowseIconCls = scope.lfOption.browseIconCls;
                        }
                        if(scope.lfOption.hasOwnProperty('removeIconCls')){
                            scope.strRemoveIconCls = scope.lfOption.removeIconCls;
                        }
                        if(scope.lfOption.hasOwnProperty('captionIconCls')){
                            scope.strCaptionIconCls = scope.lfOption.captionIconCls;
                        }
                        if(scope.lfOption.hasOwnProperty('unknowIconCls')){
                            scope.strUnknowIconCls = scope.lfOption.unknowIconCls;
                        }
                    }
                }

                scope.accept = scope.accept || '';

                scope.lfFiles = [];

                scope[attrs.ngModel] = scope.lfFiles;

                scope.$watch('lfFiles.length',function(newVal,oldVal){
            		ctrl.$validate();
            	});

                scope.lfApi = new function(){
                    var self = this;
                    self.removeAll = function(){
                        scope.removeAllFiles();
                    };

                    self.removeByName = function(name){
                        scope.removeFileByName(name);
                    };
                };

                scope.isFilesNull = true;

                scope.strCaption = '';

                scope.strCaptionPlaceholder = 'Select file';

				scope.strCaptionDragAndDrop = 'Drag & drop files here...';

				scope.strCaptionBrowse = 'Browse';

				scope.strCaptionRemove = 'Remove';

                scope.strAriaLabel = "";

                if (angular.isDefined(attrs.ariaLabel)) {
                    scope.strAriaLabel = attrs.ariaLabel;
                }

                if(angular.isDefined(attrs.lfPlaceholder)){
                    scope.$watch('lfPlaceholder', function(newVal) {
                        scope.strCaptionPlaceholder = newVal;
                    });
                }

                if (angular.isDefined(attrs.lfCaption) ) {
                    isCustomCaption = true;
                    scope.$watch('lfCaption', function(newVal) {
                        scope.strCaption = newVal;
                    });
                }

				if(scope.lfDragAndDropLabel){
					scope.strCaptionDragAndDrop = scope.lfDragAndDropLabel;
				}

				if(scope.lfBrowseLabel){
					scope.strCaptionBrowse = scope.lfBrowseLabel;
				}

				if(scope.lfRemoveLabel){
					scope.strCaptionRemove = scope.lfRemoveLabel;
				}

                elDragview.bind("dragover", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    if(scope.isDisabled || !scope.isDrag){
                        return;
                    }
                    elDragview.addClass("lf-ng-md-file-input-drag-hover");
                });

				elDragview.bind("dragleave", function(e){
					e.stopPropagation();
					e.preventDefault();
					if(scope.isDisabled || !scope.isDrag){
						return;
					}
					elDragview.removeClass("lf-ng-md-file-input-drag-hover");
				});

				elDragview.bind("drop", function(e){

					e.stopPropagation();
					e.preventDefault();

					if(scope.isDisabled || !scope.isDrag){
						return;
					}

					elDragview.removeClass("lf-ng-md-file-input-drag-hover");

                    if (angular.isObject(e.originalEvent)){
                        e = e.originalEvent;
                    }

					var files = e.target.files || e.dataTransfer.files;
					var i = 0;

					if(files.length <= 0){
						return;
					}

					var names = scope.lfFiles.map(function(obj){return obj.lfFileName;});

					var regexp = new RegExp(scope.accept, "i");

                    scope.floatProgress = 0;

                    if(scope.isMutiple){
                        intFilesCount = files.length;
                        for(var i=0;i<files.length;i++){
                            var file = files[i];
                            if(file.type.match(regexp)){
                                if(names.indexOf(file.name) != -1){
                                    scope.removeFileByName(file.name);
                                }
                                setTimeout(readFile(file), i*100);
                            }
                        }
                    }else{
                        intFilesCount = 1;
                        for(var i=0;i<files.length;i++){
                            var file = files[i];
                            if(file.type.match(regexp)){
                                scope.removeAllFiles();
                                setTimeout(readFile(file), 100);
                                break;
                            }
                        }
                    }

				});

				scope.openDialog = function(event, el) {
					if(event){
						$timeout(function() {
							event.preventDefault();
							event.stopPropagation();
							var elFileinput = event.target.children[2];
							if(elFileinput !== undefined) {
								elFileinput.click();
							}
						}, 0);
					}
				};

				scope.removeAllFiles = function(event){

					if(scope.isDisabled){
						return;
					}

					scope.lfFiles.length = 0;

					elThumbnails.empty();

					updateTextCaption();

				};

				scope.removeFileByName = function(name,event){

					if(scope.isDisabled){
						return;
					}

					scope.lfFiles.every(function(obj,idx){
						if(obj.lfFileName == name){
                            obj.element.remove();
							scope.lfFiles.splice(idx,1);
							return false;
						}
						return true;
					});

					updateTextCaption();

				};

				scope.onFileChanged = function(e){

					var files = e.files || e.target.files;

					var names = scope.lfFiles.map(function(obj){return obj.lfFileName;});

					if(files.length <= 0){
						return;
					}

                    scope.floatProgress = 0;

					if(scope.isMutiple){
                        intFilesCount = files.length;
                        for(var i=0;i<files.length;i++){
                            var file = files[i];
                            if(names.indexOf(file.name) != -1){
                                scope.removeFileByName(file.name);
                            }
                            setTimeout(readFile(file), i*100);
                        }
                    }else{
                        intFilesCount = 1;
                        for(var i=0;i<files.length;i++){
                            var file = files[i];
                            scope.removeAllFiles();
                            setTimeout(readFile(file), 100);
                            break;
                        }
                    }

					elFileinput.val('');

				};

                elFileinput.bind("change",scope.onFileChanged);

                scope.onFileClick = function(key){
                    if(angular.isFunction(scope.lfOnFileClick)){
                        scope.lfFiles.every(function(obj,idx){
                            if(obj.key == key){
                                scope.lfOnFileClick(obj,idx);
                                return false;
                            }else{
                                return true;
                            }
                        });
                    }
                };

				var readFile = function(file){

                    scope.intLoading++;

					readAsDataURL(file).then(function(result){

						var lfFile = file;
						var lfFileName = file.name;
						var lfFileType = file.type;
						var lfTagType = parseFileType(file);
						var lfDataUrl = window.URL.createObjectURL(file);

                        var lfFileObj = {
                            "key":genLfObjId(),
                            "lfFile":lfFile,
                            "lfFileName":lfFileName,
                            "lfDataUrl":lfDataUrl
                        };

						scope.lfFiles.push(lfFileObj);

						var elFrame = angular.element('<div class="lf-ng-md-file-input-frame" ng-click="onFileClick(\''+lfFileObj.key+'\')"></div>');

						var elFrameX = angular.element('<div class="lf-ng-md-file-input-x" ng-click="removeFileByName(\''+file.name+'\',$event)">&times;</div>');

						var tplPreview = '';

						if(lfTagType == 'image'){

							tplPreview = '<img src="'+lfDataUrl+'" >';

						}else if(lfTagType == 'video'){

							tplPreview  =  ['<video controls>',
								'<source src="'+lfDataUrl+'" type="'+lfFileType+'">',
							'</video>'].join('');

						}else if(lfTagType == 'audio'){

							tplPreview  =  ['<audio controls>',
								'<source src="'+lfDataUrl+'" type="'+lfFileType+'">',
							'</audio>'].join('');

						}else{

                            tplPreview = [  '<object data="'+lfDataUrl+'" type="'+lfFileType+'"><param name="movie" value="'+lfFile.name+'" />',
                                                '<div class="lf-ng-md-file-input-preview-default">',
                                                    '<md-icon class="lf-ng-md-file-input-preview-icon" ng-class="strUnknowIconCls"></md-icon>',
                                                '</div>',
                                            '</object>'].join('');

						}

						var elPreview = angular.element(tplPreview);

						var elFooter = angular.element('<div class="lf-ng-md-file-input-frame-footer"><div class="lf-ng-md-file-input-frame-caption">'+lfFile.name+'</div></div>');

						elFrame.append(elFrameX);
						// if(scope.isPreview) {
						elFrame.append(elPreview);
						// }else{
                        //     console.log('no preview');
                        // }
						elFrame.append(elFooter);

						$compile(elFrame)(scope);

						elThumbnails.append(elFrame);

                        lfFileObj.element = elFrame;

						updateTextCaption();

					},function(error){

					},function(notify){

					});

				};

				var updateTextCaption = function(){
					if(scope.lfFiles.length == 1){
                        if(!isCustomCaption){
                            scope.strCaption = '' + scope.lfFiles[0].lfFileName;
                        }
						scope.isFilesNull  = false;
					}else if(scope.lfFiles.length > 1){
                        if(!isCustomCaption){
    						scope.strCaption = '' + scope.lfFiles.length + ' files selected';
                        }
						scope.isFilesNull  = false;
					}else{
                        if(!isCustomCaption){
						  scope.strCaption = '';
                        }
						scope.isFilesNull  = true;
					}
				};

				var parseFileType = function (file){
					var type =  file.type;
					var name =  file.name;
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

				var readAsDataURL = function (file,index) {

					var deferred = $q.defer();

					var reader = new FileReader();

					reader.onloadstart = function(){
						deferred.notify(0);
					};

					reader.onload = function(event){

					};

					reader.onloadend = function(event){
						deferred.resolve({
							'index':index,
							'result':reader.result
						});
                        scope.intLoading--;
                        scope.floatProgress = (intFilesCount-scope.intLoading)/intFilesCount*100;
					};

					reader.onerror = function(event){
						deferred.reject(reader.result);
                        scope.intLoading--;
                        scope.floatProgress = (intFilesCount-scope.intLoading)/intFilesCount*100;
					};

					reader.onprogress = function(event){
						deferred.notify(event.loaded/event.total);
					};

					reader.readAsArrayBuffer(file);

					return deferred.promise;
				};

			}

		};

    }]);

})(window,window.angular);
