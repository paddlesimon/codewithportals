	
	function loadJavascripts(scripts)
	{
		(function(d,s){
			for(var id in s) {
				if (d.getElementById(id) == null) {
					var js = d.createElement('script'); js.id = id; js.src = s[id];
					d.body.appendChild(js);
				}
			}
		})(document,scripts);
	}
	
	loadJavascripts({
		"analytics" : "assets/javascripts/analytics.js"
	});
	