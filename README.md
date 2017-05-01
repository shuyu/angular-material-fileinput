# Angular Material File Input

A Html file input enhance base on angular material.

This directive try to make input file or file upload intuitive.

![screensho 0](http://shuyu.github.io/angular-material-fileinput/example/screenshot/screenshot_0.png)

![screensho 1](http://shuyu.github.io/angular-material-fileinput/example/screenshot/screenshot_1.png)

## Demo

[Live Demo](http://shuyu.github.io/angular-material-fileinput/example/)

## Getting Started

Install with Bower or download the files directly from the dist folder in the repo.

```bash
bower install lf-ng-md-file-input --save
```

Add `dist/lf-ng-md-file-input.js` and `dist/lf-ng-md-file-input.css` to your index.html.

```html

<!-- Angular Material Dependencies -->
<link rel="stylesheet" href="./bower_components/angular-material/angular-material.min.css">
<script src="./bower_components/angular/angular.min.js"></script>
<script src="./bower_components/angular-animate/angular-animate.min.js"></script>
<script src="./bower_components/angular-aria/angular-aria.min.js"></script>
<script src="./bower_components/angular-material/angular-material.min.js"></script>

<!-- Angular Material Fileinput -->
<link rel="stylesheet" href="./bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.css">
<script src="./bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.js"></script>

```

Add `lfNgMdFileInput` as a module dependency for your module.

```js
var app = angular.module('app', ['ngMaterial','lfNgMdFileInput']);
```

## Usage

This angular directive is focus on make material look and upload file base on ajax.

So the most important thing is you need fetch files yourself from "lf-files" data bind, not input element because it will clear every time after resolve file.   

The "lf-files" data is an array variable, object in array contain properties with lfFileName(file name) 、 lfFile(file object) and lfDataUrl(for preview) from resolve input file.

You can observe "lf-files" by using $watch.

#### html

```html

    <lf-ng-md-file-input lf-files='files' multiple> </lf-ng-md-file-input>

```

#### javascript

```javascript

    app.controller('MyCtrl',function($scope){
        $scope.$watch('files.length',function(newVal,oldVal){
            console.log($scope.files);
        });
    });

```

So after you finish select files you need adjust data like below to fit your server side.

#### client

```javascript

    app.controller('MyCtrl',function($scope){

        ...

        $scope.onSubmit = function(){
            var formData = new FormData();
            angular.forEach($scope.files,function(obj){
                if(!obj.isRemote){
                    formData.append('files[]', obj.lfFile);
                }
            });
            $http.post('./upload', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(result){
                // do sometingh                   
            },function(err){
                // do sometingh
            });
        };

        ...

    });

```

In this example I use node.js( express + formidable ) & ( express + multer ) on server side, "Formidable & Multer" is a node module for parsing form data.

#### server
##### Formidable
```javascript

    var express = require('express');
    var formidable = require('formidable');
    var app = express();
    app.use(express.static(__dirname + '/public'));

    ...

    app.post('/upload',function(req,res){
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname +'/public/uploads';
        //file upload path
        form.parse(req, function(err, fields, files) {
            //you can get fields here
        });
        form.on ('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name;
            //modify file path
        });
        form.on ('end', function(){
            res.sendStatus(200);
            //when finish all process    
        });
    });

    ...

```

##### Muliter
```javascript

    var express = require('express');
    var multer = require('multer');
    var app = express();
    app.use(express.static(__dirname + '/public'));

    ...

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname +'/public/uploads');
            //modify upload dest
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
            //modify file name
        }
    });
    var upload = multer({ "storage": storage });
    var type = upload.array('files[]');

    app.post('/upload',type,function(req,res){
        res.sendStatus(200);
    });

    ...

```

### Basic

```html

<lf-ng-md-file-input lf-files="files" ng-change="onFilesChange()"></lf-ng-md-file-input>

```

### Submit button
```html

<lf-ng-md-file-input lf-files="files" submit lf-on-submit-click="onSubmitClick"></lf-ng-md-file-input>

```

### Aria-label
```html

<lf-ng-md-file-input lf-files="files" aria-label="fileupload"></lf-ng-md-file-input>

```

### Accept

Accept attribute only support MIME type (e.g: image/* , image/jpeg , video/* , video/mp4)

```html

<lf-ng-md-file-input lf-files="files" accept="image/*"></lf-ng-md-file-input>

```

### Multiple

```html

<lf-ng-md-file-input lf-files="files" multiple></lf-ng-md-file-input>

```

### Progress

```html

<lf-ng-md-file-input lf-files="files" progress></lf-ng-md-file-input>

```

### Placeholder

```html

<lf-ng-md-file-input lf-files="files" lf-placeholder="my placeholder"></lf-ng-md-file-input>

```

### Caption

```html

<lf-ng-md-file-input lf-files="files" lf-caption="my caption"></lf-ng-md-file-input>

```

### Preview

```html

<lf-ng-md-file-input lf-files="files" preview></lf-ng-md-file-input>

```

### Drag

```html

<lf-ng-md-file-input lf-files="files" drag></lf-ng-md-file-input>

```

### Change labels

```html

<lf-ng-md-file-input lf-files="files" lf-drag-and-drop-label="Drag and Drop this" drag></lf-ng-md-file-input>

```

```html

<lf-ng-md-file-input lf-files="files" lf-browse-label="Browse..."></lf-ng-md-file-input>

```

```html

<lf-ng-md-file-input lf-files="files" lf-remove-label="Trash"></lf-ng-md-file-input>

```

### Reset internal lfFiles

```html

<lf-ng-md-file-input lf-files="files" drag lf-api="lfApi"></lf-ng-md-file-input>

```

Corresponding javascript controller

```javascript
    /**
     * Upload using your own API
     */
    upload().then(function(response)
    {
        /**
         * Do stuff
         * ...
         */
         /**
          * Reset the contents of file input
          */
         $scope.lfApi.removeAll();
    });
```


### Validation

| Attribute      | Description |
| :------------- | :---------------- |
| lf-required    | file input required |
| lf-maxcount    | files count limit |
| lf-filesize    | per file size limit  |
| lf-totalsize   | total files size limit |
| lf-mimetype    | mime type check  |

lf-filesize and lf-totalsize must require number with unit . (e.g: 5Byte, 100KB, 5MB)

```html

<form name="testForm" layout="column">
    <lf-ng-md-file-input name="files" lf-files="files" lf-required lf-maxcount="5" lf-filesize="10MB" lf-totalsize="20MB" lf-mimetype="image/*" multiple drag preview></lf-ng-md-file-input>
    <div ng-messages="testForm.files.$error" style="color:red;">
        <div ng-message="required">This is required.</div>
        <div ng-message="maxcount">Too many files.</div>
        <div ng-message="filesize">File size too large.</div>
        <div ng-message="totalsize">Total size too large.</div>
        <div ng-message="mimetype">Mimetype error.</div>
    </div>
</form>

```

### Function binding
| Name           | Parameter   | Description |
| :------------- | :---------- | :--------------------|
| lf-on-file-click   | file, index    | When click specific file  |
| lf-on-file-remove  | file, index    | Remove all file      	  |
| lf-on-submit-click | files 		  | When submit button click  |

```html

<lf-ng-md-file-input lf-files="files" lf-on-file-click="onFileClick" lf-on-file-remove="onFileRemove" lf-on-submit-click="onSubmitClick" submit></lf-ng-md-file-input>

```

```javascript

<script>
    ...
	$scope.onFileClick = function(obj,idx){
		console.log(obj);
	};
	$scope.onFileRemove = function(obj,idx){
		console.log(obj);
	};
	$scope.onSubmitClick = function(files) {
		console.log(files);
	}
    ...
</script>

```

### API

| Name           | Parameter   | Description |
| :------------- | :---------- | :--------------------|
| removeByName   |  name(string)    | Remove file by name  |
| removeAll      |             | Remove all file      |
| addRemoteFile  | url(string), name(string), type(string) | Add remote url file for preview  |

```html

<lf-ng-md-file-input lf-files="files" lf-api="api"></lf-ng-md-file-input>
<md-button class="md-raised md-warn" ng-click="api.removeAll()">remove all</md-button>

```

```javascript

<script>
    ...
    $timeout(
        function(){
            $scope.api.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.jpg','sample.jpg','image');
            $scope.api.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp4','sample.mp4','video');
            $scope.api.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp3','sample.mp3','audio');
            $scope.api.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.pdf','sample.pdf','other');
        }
    )
    ...
</script>

```

Currently addRemoteFile only support 4 types include "image"、"video"、"audio" and "other".
The file add by addRemoteFile API will also exist in lf-files array but with a property isRemote:true, so when you upload files, you should do one more job to check the isRemote is true or false, if true then should ignore it.

![screensho 3](http://shuyu.github.io/angular-material-fileinput/example/screenshot/screenshot_2.png)


### OPTION

| Name           | Description |
| :------------- | :---------------- |
| browseIconCls  | Set class to browse icon  |
| removeIconCls  | Set class to remove icon  |
| captionIconCls | Set class to caption icon  |
| unknowIconCls  | Set class to unknow icon  |

```html

<style>
	.myBrowse{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjQzdCMTNDIiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS43LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBDMTA3LDM3LjgsMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Ik02MS4zLDkzLjNjLTUuOSwwLTExLjQtMi4zLTE1LjYtNi40cy02LjQtOS43LTYuNC0xNS42YzAtNS45LDIuMy0xMS40LDYuNC0xNS42YzQuMi00LjIsOS43LTYuNCwxNS42LTYuNCAgICBjNS45LDAsMTEuNCwyLjMsMTUuNiw2LjRjOC42LDguNiw4LjYsMjIuNSwwLDMxLjFDNzIuNyw5MSw2Ny4yLDkzLjMsNjEuMyw5My4zeiBNNjEuMyw1Ny4zYy0zLjcsMC03LjMsMS41LTkuOSw0LjEgICAgYy0yLjYsMi42LTQuMSw2LjItNC4xLDkuOWMwLDMuNywxLjUsNy4zLDQuMSw5LjljMi42LDIuNiw2LjIsNC4xLDkuOSw0LjFjMy43LDAsNy4zLTEuNSw5LjktNC4xYzUuNS01LjUsNS41LTE0LjMsMC0xOS44ICAgIEM2OC42LDU4LjgsNjUuMSw1Ny4zLDYxLjMsNTcuM3oiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSI4IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjcwNzEgMC43MDcxIC0wLjcwNzEgMC43MDcxIDg2LjQzNDggLTI5Ljk0NDYpIiB3aWR0aD0iMjMiIHg9IjY3LjkiIHk9Ijg1LjQiLz48L2c+PC9nPjwvc3ZnPg==);
    }
    .myRemove{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjRTM2MjQ5IiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS42LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBTMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Ik04MSw5Nkg0N1Y3MGgzNFY5NnogTTUzLDkwaDIyVjc2SDUzVjkweiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48Zz48cmVjdCBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjYiIHdpZHRoPSIzNCIgeD0iNDciIHk9IjU4Ii8+PC9nPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iMTIiIHdpZHRoPSI2IiB4PSI2MSIgeT0iNTIiLz48L2c+PC9nPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iMjQiIHdpZHRoPSI2IiB4PSI2MSIgeT0iNzEiLz48L2c+PC9nPjwvc3ZnPg==);
    }
    .myCaption{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjRTk3ODNDIiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS42LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBTMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iOCIgd2lkdGg9IjI4IiB4PSI1OCIgeT0iNTYiLz48L2c+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSI4IiB3aWR0aD0iMjgiIHg9IjU4IiB5PSI3MCIvPjwvZz48Zz48cmVjdCBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjgiIHdpZHRoPSIyOCIgeD0iNTgiIHk9Ijg0Ii8+PC9nPjxnPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iOCIgd2lkdGg9IjgiIHg9IjQyIiB5PSI1NiIvPjwvZz48Zz48cmVjdCBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjgiIHdpZHRoPSI4IiB4PSI0MiIgeT0iNzAiLz48L2c+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSI4IiB3aWR0aD0iOCIgeD0iNDIiIHk9Ijg0Ii8+PC9nPjwvZz48L3N2Zz4=);
    }
    .myUnknow{
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBmaWxsPSIjRTlCNTNBIiBwb2ludHM9IjczLDQgMTksNCAxOSwxMjQgMTA5LDEyNCAxMDksNDAgICIvPjwvZz48ZyBvcGFjaXR5PSIwLjIiPjxwb2x5Z29uIGZpbGw9IiMwNzBCMEMiIHBvaW50cz0iNzMsNDAgMTA5LDQwIDczLDQgICIvPjwvZz48Zz48cGF0aCBkPSJNMTA5LDEyNS4ySDE5Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJWNGMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNTBjNi4yLDAsMTEuMiw1LDExLjIsMTEuMnYxOC44SDk5ICAgYzYuMiwwLDExLjIsNSwxMS4yLDExLjJ2ODBDMTEwLjIsMTI0LjcsMTA5LjcsMTI1LjIsMTA5LDEyNS4yeiBNMjAuMiwxMjIuOGg4Ny41VjQ0YzAtNC44LTMuOS04LjgtOC44LTguOEg3OSAgIGMtMC43LDAtMS4yLTAuNi0xLjItMS4yVjE0YzAtNC44LTMuOS04LjgtOC44LTguOEgyMC4yVjEyMi44eiIgZmlsbD0iIzFFMUUxRSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNzYsNi45YzEuOCwxLjgsMyw0LjMsMyw3LjF2MjBoMjBjMi43LDAsNS4yLDEuMSw3LDIuOWgwTDc2LDYuOUw3Niw2Ljl6IiBmaWxsPSIjNDM0NDQ0Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJNMTA2LDM4LjFMMTA2LDM4LjFjLTAuMywwLTAuNy0wLjEtMC45LTAuNGMtMS43LTEuNi0zLjgtMi41LTYuMi0yLjVINzljLTAuNywwLTEuMi0wLjYtMS4yLTEuMlYxNCAgICBjMC0yLjQtMC45LTQuNi0yLjYtNi4yYy0wLjItMC4yLTAuNC0wLjYtMC40LTAuOWMwLTAuNSwwLjMtMSwwLjgtMS4yYzAuNS0wLjIsMS0wLjEsMS40LDAuM2wzMCwzMGMwLjQsMC40LDAuNSwwLjksMC4zLDEuNCAgICBDMTA3LDM3LjgsMTA2LjUsMzguMSwxMDYsMzguMXogTTgwLjIsMzIuOEg5OWMwLjQsMCwwLjgsMCwxLjIsMC4xbC0yMC0yMGMwLDAuNCwwLjEsMC44LDAuMSwxLjJWMzIuOHoiIGZpbGw9IiMxRTFFMUUiLz48L2c+PC9nPjxnPjxnPjxjaXJjbGUgY3g9IjY0IiBjeT0iODkiIGZpbGw9IiNGRkZGRkYiIHI9IjUiLz48L2c+PGc+PGc+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgaGVpZ2h0PSIyOCIgd2lkdGg9IjgiIHg9IjYwIiB5PSI1MCIvPjwvZz48L2c+PC9nPjwvc3ZnPg==);
    }
</style>

<script type="text/javascript">
	...
    $scope.option = {
        "browseIconCls":"myBrowse",
        "removeIconCls":"myRemove",
        "captionIconCls":"myCaption",
        "unknowIconCls":"myUnknow"
    }
    ...
</script>

<lf-ng-md-file-input lf-files="files" lf-option="option"></lf-ng-md-file-input>

```

## Release History
* v1.5.2
	* Support ng-change
	* add submit button
* v1.5.1
    * Fix fail due to missing injector.
* v1.5.0
    * Massive code architecture change.
    * Add addRemoteFile api.
    * Add callback for removeFile.
    * Fix validation bug.
    * Fix browse button not work on Firefox
    * Deep check when file has same name.
    * lf-mimetype can work with "," ex: image/\*,video/\*.
* v1.4.8
    * New api to remove file by name.
    * Fix preview bug.
* v1.4.7    
    * File with same name will override.
    * New attributes : lf-on-file-click.
* v1.4.6    
    * Fix IE click event.
* v1.4.5    
    * Fix drop event.
* v1.4.4    
    * Add progress attribute.
* v1.4.3    
    * Remove console.log calls.
* v1.4.2    
    * Add lf-capion attribute to customize file caption.
    * Fix bug when $compileProvider.debugInfoEnabled(false).
* v1.4.1    
    * Add MIME type validation.
    * Add aria-label.
* v1.4.0    
    * Add validation feature.
* v1.3.1    
    * Fix firefox upload button.
* v1.3.0    
    * Make template much compatible with angular material.
    * Remove angular-material-icons dependencies and Add new lf-option attribute to make icon changeable.
* v1.2.0
    * New lf-api attribute bind to interaction with directive.
* v1.1.0
    * New attributes : lf-drag-and-drop-label, lf-browse-label and lf-remove-label.
* v1.0.0
    * Standard features.
* v0.1.0
    * Initial release.
