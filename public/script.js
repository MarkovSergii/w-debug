
var socket = io.connect('http://localhost:28888');




let smartDebug = angular.module('smartDebug',[angularDragula(angular)]);


let mainCtrl = ($scope,dragulaService)=>{

    $scope.rows =[];
    $scope.totalLength = $scope.rows.length;
    $scope.filterText ='';
    $scope.segmentFilter = 'ALL';
    $scope.typesList = [];
    $scope.typesSelected = [];
    $scope.debugValues = [];


    socket.on('logDebug', function (data) {
        if (!$scope.typesList.includes(data.type))
        {
            data.color = randomColor({
                seed:data.name
            });
            $scope.typesList.push(data.type)
            $scope.typesSelected.push(data.type)
        }
        
        $scope.newRow({
            type:data.type,
            color:$scope.getColorByType(data.type),
            date: data.date,
            msg: data.msg
        })
        $scope.$apply();
    });

    $scope.selectAll = ()=>{
        $scope.typesSelected = angular.copy($scope.typesList)
        let filtered = checkFilter($scope.rows)
        updateRows(filtered)
    };
    $scope.selectNone = ()=>{
        $scope.typesSelected = []
        let filtered = checkFilter($scope.rows)
        updateRows(filtered)
    };
    $scope.date = new Date();
    $scope.block_height = ()=>{
        let full = $('#selec').height();
        let mes = $('#mes').height();
        let filter = 110;
        return full - mes - filter-200 + 'px';
    };

    socket.on('clear', function () {
        $scope.rows = [];
        $scope.typesList = [];
        $scope.typesSelected = [];
        $scope.debugValues = [];
        updateRows($scope.rows);
        $scope.$apply();
    });

    socket.on('debugValue', function (data) {

        data.map((item)=>{

           let index =  R.findIndex(R.propEq('name', item.name))($scope.debugValues);
           item.color = $scope.getColorByType(item.name);
           if (index == -1)
               $scope.debugValues.push(item)
           else
               $scope.debugValues[index] = item;
        });

        $scope.$apply();
    });


    $scope.getColorByType = (type)=>
        randomColor({
            seed:type,
            luminosity: 'bright'
        })


    $scope.showMore = (count)=>{
        if (count=='all') {
            $scope.rows = $scope.rows.concat($scope.notShowed);
            updateRows($scope.rows)
            $scope.notShowed = []
        }
        else
        {
            let firstRecords = $scope.notShowed.splice(0,count)
            $scope.rows = $scope.rows.concat(firstRecords);
            updateRows($scope.rows)
        }
    }

    $scope.toggleSelection = function toggleSelection(typeName) {
        var idx = $scope.typesSelected.indexOf(typeName);

        // Is currently selected
        if (idx > -1) {
            $scope.typesSelected.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.typesSelected.push(typeName);
        }

        let filtered = checkFilter($scope.rows)
        updateRows(filtered)
    };


    let filterByText = (item) =>
        JSON.stringify(item).includes($scope.filterText)


    let checkFilter = (list) =>{

        let newList = list.filter((item)=>
            ($scope.typesSelected.includes(item.type)));

        return newList.filter((item)=>{

            if (!$scope.filterText)
                return true
            else
                return filterByText(item)
        })
    }

    let renderHTML = (list)=>
        list.map((item)=> ('<div><span style="color:'+item.color+'"> '+item.type+' </span><span> '+ item.date +' </span><span>'+JSON.stringify(item.msg)+'</span></div>'))


    let updateRows = (list)=>{
        $scope.clusterize.update(renderHTML(list))
        if ($scope.autoscroll) $('#scrollArea')[0].scrollTop = $('#scrollArea')[0].scrollHeight
    }

    let appendRows = (row)=>{
        $scope.clusterize.append(renderHTML([row]))
        if ($scope.autoscroll) $('#scrollArea')[0].scrollTop = $('#scrollArea')[0].scrollHeight
    }


    $scope.setSegmentFilter = (filter)=> {
        $scope.segmentFilter = filter;
        let filtered = checkFilter($scope.rows)
        updateRows(filtered)
    }


    $scope.newRow = (row)=>{
        if ($scope.showEnabled)
            $scope.rows.push(row);

        let filtered = checkFilter([row])
        if ((filtered.length != 0) && ($scope.showEnabled))
        {
            appendRows(row)
        }
        else
             if ((filtered.length != 0) && (!$scope.showEnabled))
                 $scope.notShowed.push(row)

    };


    $scope.$watch('filterText', function(newValue, oldValue) {
        let filtered = checkFilter($scope.rows)
        updateRows(filtered)
    });

    $scope.autoscroll = true;
    $scope.clusterize = new Clusterize({
        rows: renderHTML($scope.rows),
        scrollId: 'scrollArea',
        contentId: 'contentArea',
        callbacks: {

            clusterChanged: function() {

            }

        }
    });


    $scope.showEnabled = true;
    $scope.notShowed = [];


    $scope.stopShow =()=>{
        $scope.showEnabled = !$scope.showEnabled
        if ($scope.showEnabled)
        {
            $scope.rows = $scope.rows.concat($scope.notShowed);
            updateRows($scope.rows)
            $scope.notShowed = []
        }
    }

}


smartDebug.controller('mainCtrl',mainCtrl)
