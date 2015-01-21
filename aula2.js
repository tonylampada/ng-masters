(function(){
	if(!window.Global){
		window.Global = {};
	}
	if(!Global.angular_dependencies){
		Global.angular_dependencies = [];
	}
	angulife = angular.module('angulife', Global.angular_dependencies);

	angulife.factory('AngulifeService', ['$rootScope', function($rootScope){
    	var context = {
			matrix: [],
			has_live_cell: 0,
			no_change: 0,
			changed: false,
			matrix_changed: false,
			wait_step: 500
		};
		context.update_matrix = function(){
			context.matrix = [];
			for(var i = 0; i < context.lines; i++){
				var line = [];
				for(var j = 0; j < context.columns; j++){
					line.push({value:false,
								line:i,
								col:j});
				}
				context.matrix.push(line);
			}
		};

		context.toggle_alive = function(cell){
			context.matrix[cell.line][cell.col].value = !cell.value;
			if(cell.value){
				context.has_live_cell ++;
			}else{
				context.has_live_cell --;
			}
		};

		context.start_angulife = function(){
			context.no_change = 0;
			var interval = setInterval(function(){
				context.matrix_changed = false;
				var new_matrix = []
				for(var i = 0; i < context.lines; i++){
					var new_line = [];
					for(var j = 0; j < context.columns; j++){
						context.changed = false;
						var count = context.neighbours_count(i, j);
						if(context.matrix[i][j].value){
							if(count < 2 || count > 3){
								new_line.push({
									line: i,
									col: j,
									value: false
								});
								context.has_live_cell --;
								context.changed = true;
							}
						}else{
							if(count == 3){
								new_line.push({
									line: i,
									col: j,
									value: true
								});
								context.has_live_cell ++;
								context.changed = true;
							}
						}
						if(!context.changed){
							new_line.push(context.matrix[i][j]);
						}else{
							context.matrix_changed = true;
						}
					}
					new_matrix.push(new_line);
				}
				context.matrix = new_matrix;
				$rootScope.$digest();
				if(!context.matrix_changed){
					context.no_change ++;
				}
				if(context.has_live_cell==0 || context.no_change > 3){
					clearInterval(interval);
					alert('Angulife finished!');
				}
			}, context.wait_step);
		};

		context.neighbours_count = function(i, j){
			var neighbours = 0;
			for(var a = i-1; a < i+2; a++){
				for(var b = j-1; b < j+2; b++){
					if(a<0 || b<0 || a==context.lines || b == context.columns){
						continue;
					}
					if(a!=i || b !=j){
						if(context.matrix[a][b].value){
							neighbours ++;
						}
					}
				}
			}
			return neighbours;
		};
		return context;
	}]);

	angulife.controller('AnguLifeCtrl',function ($scope, AngulifeService){
		$scope.context = AngulifeService;
	});
})();
