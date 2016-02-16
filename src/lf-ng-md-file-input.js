(function(angular) {
	'use strict';

	var lfNgMdFileinput = angular.module('lfNgMdFileInput', ['ngMaterial','ngMdIcons']);

	lfNgMdFileinput.filter('lfTrusted', ['$sce', function ($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}]);

	lfNgMdFileinput.directive('lfNgMdFileInput',['$q', '$compile', '$timeout', function($q, $compile, $timeout){
		return {
			restrict: 'E',
			template:  ['<div class="lf-ng-md-file-input">',
				'<div class="lf-ng-md-file-input-preview-container" ng-class="{\'disabled\':isDisabled}" ng-show="isDrag || (isPreview && !isFilesNull)">',
				'<div class="close lf-ng-md-file-input-x" ng-click="removeAllFiles($event)" ng-hide="isFilesNull" >&times;</div>',
				'<div class="lf-ng-md-file-input-drag">',
				'<div layout="row" layout-align="center center" class="lf-ng-md-file-input-drag-text-container" ng-show="isFilesNull && isDrag">',
				'<div class="lf-ng-md-file-input-drag-text">{{strCaptionDragAndDrop}}</div>',
				'</div>',
				'<div class="lf-ng-md-file-input-thumbnails">',
				'</div>',
				'<div class="clearfix" style="clear:both"></div>',
				'</div>',
				'</div>',
				'<div class="lf-ng-md-file-input-container" >',
				'<div tabindex="-1" class="lf-ng-md-file-input-caption" ng-class="{\'disabled\':isDisabled}">',
				'<!--<span class="file-caption-ellipsis">&hellip;</span>-->',
				'<div class="lf-ng-md-file-input-caption-text" ng-hide="isFilesNull">',
				'<ng-md-icon icon="insert_drive_file" size="24" style="fill:black; "></ng-md-icon>',//attach_file
				'{{strCaption}}',
				'</div>',
				'<div class="lf-ng-md-file-input-caption-text-default" ng-show="isFilesNull">',
				' {{strCaptionPlaceholder}}',
				'</div>',
				'</div>',
				'<div class="" style="position:relative;display:table-cell;width:1%;white-space:nowrap;">',
				'<md-button type="button" ng-disabled="isDisabled" ng-hide="isFilesNull" ng-click="removeAllFiles()" class="md-raised lf-ng-md-file-input-button lf-ng-md-file-input-button-remove">',
				'<ng-md-icon icon="delete" size="24" style="fill:black;"></ng-md-icon>',
				' {{strCaptionRemove}}',
				'</md-button>',
				'<md-button type="button" ng-disabled="isDisabled" ng-click="openDialog($event, this)" class="md-raised md-primary lf-ng-md-file-input-button lf-ng-md-file-input-button-brower">',
				'<ng-md-icon icon="folder_open" size="24" style="fill:white;"></ng-md-icon>',
				' {{strCaptionBrowse}}',
				'<input type="file" accept="{{accept}}" ng-disabled="isDisabled" class="lf-ng-md-file-input-tag" onchange="angular.element(this).scope().onFileChanged(this)"/>',
				'</md-button>',
				'</div>',
				'</div>',
				'</div>'].join(''),
				replace: true,
				scope:{
					lfFiles:'=?',
					lfPlaceholder:'@?',
					lfDragAndDropLabel:'@?',
					lfBrowseLabel: '@?',
					lfRemoveLabel: '@?',
					accept:'@?',
					ngDisabled:'=?'
				},
				link: function(scope,element,attrs){

					var elFileinput = angular.element(element[0].querySelector('.lf-ng-md-file-input-tag'));
					var elDragview  = angular.element(element[0].querySelector('.lf-ng-md-file-input-drag'));
					var elThumbnails = angular.element(element[0].querySelector('.lf-ng-md-file-input-thumbnails'));

					scope.isPreview = false;
					scope.isDrag = false;
					scope.isMutiple = false;

					if('preview' in attrs){
						scope.isPreview = true;
					}

					if('drag' in attrs){
						scope.isDrag = true;
					}

					if('multiple' in attrs){
						elFileinput.attr('multiple','multiple');
						scope.isMutiple = true;
					}else{
						elFileinput.removeAttr('multiple');
					}

					scope.isDisabled = false;

					if (angular.isDefined(attrs.ngDisabled) ) {
						scope.$watch(function(){
							return scope.ngDisabled;
						}, function(isDisabled) {
							scope.isDisabled = isDisabled;
						});
					}

					scope.accept = scope.accept || '';

					scope.lfFiles = [];

					scope.isFilesNull = true;

					scope.strCaption = '';

					scope.strCaptionPlaceholder = 'Select file';

					scope.strCaptionDragAndDrop = 'Drag & drop files here...';

					scope.strCaptionBrowse = 'Browse';

					scope.strCaptionRemove = 'Remove';

					if(scope.lfPlaceholder){
						scope.strCaptionPlaceholder = scope.lfPlaceholder;
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

						var files = e.target.files || e.dataTransfer.files;
						var i = 0;
						var file;

						if(files.length <= 0){
							return;
						}

						var names = scope.lfFiles.map(function(obj){return obj.lfFileName;});

						var regexp = new RegExp(scope.accept, "i");

						if(scope.isMutiple){

							for(i=0;i<files.length;i++){
								file = files[i];
								if(file.type.match(regexp)){
									if(names.indexOf(file.name) == -1){
										setTimeout(readFile(file), i*100);
									}
								}
							}

						}else{

							for(i=0;i<files.length;i++){
								file = files[i];
								if(file.type.match(regexp)){
									if(names.indexOf(file.name) == -1){
										scope.removeAllFiles();
										setTimeout(readFile(file), i*100);
										break;
									}
								}
							}

						}

					});

					scope.openDialog = function(event, el) {
						if (navigator.userAgent.indexOf('Firefox') != -1) {
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
						}
					};

					scope.removeAllFiles = function(event){

						if(scope.isDisabled){
							return;
						}

						scope.lfFiles = [];

						elThumbnails.empty();

						updateTextCaption();

					};

					scope.removeFileByName = function(name){

						if(scope.isDisabled){
							return;
						}

						scope.lfFiles.every(function(obj,idx){
							if(obj.lfFileName == name){
								scope.lfFiles.splice(idx,1);
								return false;
							}
							return true;
						});

						if(event){
							angular.element(event.target).parent().remove();
						}

						updateTextCaption();

					};

					scope.onFileChanged = function(e){

						var files = e.files;
						var file;
						var i;

						var names = scope.lfFiles.map(function(obj){return obj.lfFileName;});

						if(files.length <= 0){
							return;
						}

						if(scope.isMutiple){

							for(i=0;i<files.length;i++){
								file = files[i];
								var intAvail = 1;
								if(names.indexOf(file.name) == -1){
									setTimeout(readFile(file), intAvail*100);
									intAvail++;
								}
							}

						}else{

							for(i=0;i<files.length;i++){
								file = files[i];
								if(names.indexOf(file.name) == -1){
									scope.removeAllFiles();
									setTimeout(readFile(file), 100);
									break;
								}
							}

						}

						elFileinput.val('');

					};

					var readFile = function(file){

						readAsDataURL(file).then(function(result){

							var lfFile = file;
							var lfFileName = file.name;
							var lfFileType = file.type;
							var lfTagType = parseFileType(file);
							var lfDataUrl = window.URL.createObjectURL(file);

							scope.lfFiles.push({
								"lfFile":lfFile,
								"lfFileName":lfFileName,
								"lfDataUrl":lfDataUrl
							});

							var elFrame = angular.element('<div class="lf-ng-md-file-input-frame"></div>');

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
								'<ng-md-icon class="lf-ng-md-file-input-preview-icon" icon="attach_file" size="80"></ng-md-icon>',
								'</div>',
								'</object>'].join('');

							}

							var elPreview = angular.element(tplPreview);

							var elFooter = angular.element('<div class="lf-ng-md-file-input-frame-footer"><div class="lf-ng-md-file-input-frame-caption">'+lfFile.name+'</div></div>');

							elFrame.append(elFrameX);
							elFrame.append(elPreview);
							elFrame.append(elFooter);

							$compile(elFrame)(scope);

							elThumbnails.append(elFrame);

							updateTextCaption();

						},function(error){

						},function(notify){

						});

					};

					var updateTextCaption = function(){
						if(scope.lfFiles.length == 1){
							scope.strCaption = '' + scope.lfFiles[0].lfFileName;
							scope.isFilesNull  = false;
						}else if(scope.lfFiles.length > 1){
							scope.strCaption = '' + scope.lfFiles.length + ' files selected';
							scope.isFilesNull  = false;
						}else{
							scope.strCaption = '';
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
						};

						reader.onerror = function(event){
							deferred.reject(reader.result);
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

})(window.angular);
