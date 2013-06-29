(function(){
	var webappCache = window.applicationCache;
	
	function loaded()
	{
		//var h2Title = document.querySelector("h2 a");
		var connectionStatus = ((navigator.onLine) ? 'online' : 'offline');
		
		console.log("Currently " + connectionStatus);
		//h2Title.textContent = h2Title.textContent + " - currently: " + connectionStatus;
		//document.title = document.title.replace(" | "," - currently: " + connectionStatus + " | ");
		
		switch(webappCache.status)
		{
			case 0:
				console.log("Cache status: Uncached");
				break;
			case 1:
				console.log("Cache status: Idle");
				break;
			case 2:
				console.log("Cache status: Checking");
				break;
			case 3:
				console.log("Cache status: Downloading");
				break;
			case 4:
				console.log("Cache status: Updateready");
				break;
			case 5:
				console.log("Cache status: Obsolete");
				break;
		}
	}
	function updateCache()
	{
		webappCache.swapCache();
		console.log("Cache has been updated due to a change found in the manifest");
		$( "#checkingtext" ).html("A new version is available. Click <a href=\"/\">here</a> to reload!");
		$( "#checkingalert" ).addClass("alert-info");
		$( "#checkingalert" ).show();
		//window.location.reload();
	}

    function downloadingCallback()
	{
		$( "#checkingtext" ).html("Downloading new version...");
		$( "#checkingalert" ).show();
		//window.location.reload();
	}

	function progressCallback(e)
	{
		if(e.lengthComputable)
		{
		$( "#checkingtext" ).html("Downloaded " + e.loaded + " out of " + e.total);
		$( "#checkingalert" ).show();
	}
	}
	function noUpdateCallback()
	{
		hideAlert();
	}
	function errorCache()
	{
		$( "#checkingtext" ).html("You're either offline or something has gone horribly wrong :-)");
		$( "#checkingalert" ).addClass("alert-error");
		$( "#checkingalert" ).show();
		
	}
	function checkingCallback()
	{
		console.log("Checking for updates...");
		var hiddenBox = $( "#checkingalert" );
hiddenBox.show();
	}
	function hideAlert()
	{
		var hiddenBox = $( "#checkingalert" );
hiddenBox.hide();
	}
	function obsoleteCallback()
	{
		$( "#checkingtext" ).html("The page does not exist on the server and local cache will be deleted :-(");
		$( "#checkingalert" ).addClass("alert-error");
		$( "#checkingalert" ).show();
		
	}

	window.addEventListener("load", loaded, false);
	webappCache.addEventListener("updateready", updateCache, false);
	webappCache.addEventListener("error", errorCache, false);
	webappCache.addEventListener("checking", checkingCallback, false);
	webappCache.addEventListener("noupdate", noUpdateCallback, false);
	webappCache.addEventListener("downloading", downloadingCallback, false);
	webappCache.addEventListener("progress", progressCallback, false);
	webappCache.addEventListener("obsolete", obsoleteCallback, false);
})();