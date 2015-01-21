(function(){
	if(!window.Global){
		window.Global = {};
	}
	if(!Global.angular_dependencies){
		Global.angular_dependencies = [];
	}
	angulife = angular.module('angulife', Global.angular_dependencies);
	angulife.controller('AnguLifeCtrl',function ($scope){
		$scope.matrix = [];

		$scope.has_live_cell = 0;
		$scope.no_change = 0;
		$scope.changed = false;
		$scope.matrix_changed = false;
		$scope.wait_step = 500;

		$scope.update_matrix = function(){
			$scope.matrix = [];
			for(var i = 0; i < $scope.lines; i++){
				var line = [];
				for(var j = 0; j < $scope.columns; j++){
					line.push({value:false,
								line:i,
								col:j});
				}
				$scope.matrix.push(line);
			}
		};

		$scope.toggle_alive = function(cell){
			$scope.matrix[cell.line][cell.col].value = !cell.value;
			if(cell.value){
				$scope.has_live_cell ++;
			}else{
				$scope.has_live_cell --;
			}
		};

		$scope.start_angulife = function(){
			$scope.no_change = 0;
			var interval = setInterval(function(){
				$scope.matrix_changed = false;
				var new_matrix = []
				for(var i = 0; i < $scope.lines; i++){
					var new_line = [];
					for(var j = 0; j < $scope.columns; j++){
						$scope.changed = false;
						var count = $scope.neighbours_count(i, j);
						if($scope.matrix[i][j].value){
							if(count < 2 || count > 3){
								new_line.push({
												line: i,
												col: j,
												value: false
											});
								$scope.has_live_cell --;
								$scope.changed = true;
							}
						}else{
							if(count == 3){
								new_line.push({
									line: i,
									col: j,
									value: true
								});
								$scope.has_live_cell ++;
								$scope.changed = true;
							}
						}
						if(!$scope.changed){
							new_line.push($scope.matrix[i][j]);
						}else{
							$scope.matrix_changed = true;
						}
					}
					new_matrix.push(new_line);
				}
				$scope.matrix = new_matrix;
				$scope.$digest();
				if(!$scope.matrix_changed){
					$scope.no_change ++;
				}
				if($scope.has_live_cell==0 || $scope.no_change > 3){
					clearInterval(interval);
					alert('Angulife finished!');
				}
			}, $scope.wait_step);
		};

		$scope.neighbours_count = function(i, j){
			var neighbours = 0;
			for(var a = i-1; a < i+2; a++){
				for(var b = j-1; b < j+2; b++){
					if(a<0 || b<0 || a==$scope.lines || b == $scope.columns){
						continue;
					}
					if(a!=i || b !=j){
						if($scope.matrix[a][b].value){
							neighbours ++;
						}
					}
				}
			}
			return neighbours;
		};
	});
})();
