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
		trySwapCache();

		console.log("Cache has been updated due to a change found in the manifest");
		$( "#checkingtext" ).html("A new version is available. Click <a href=\"/cv.html\">here</a> to reload!");
		$( "#checkingalert" ).addClass("alert-info");
		$( "#checkingalert" ).removeClass("alert-warning");
		$( "#checkingalert" ).removeClass("alert-danger");
		$( "#checkingalert" ).show();
	}

	function trySwapCache()
	{
		try
		{
			webappCache.swapCache();
		}
		catch(ex)
		{
			//Modeled after Firefox 23/24 behavior, the swap occured but 
			//an exception is thrown. Nevertheless, we log the exception
			//so to catch new scenarios in the future
			console.log(ex);
		}
	}

    function downloadingCallback()
	{
		$( "#checkingtext" ).html("Downloading new version...<br>If download does not complete, you can <a href=\"/cv.html\">force reload</a>");
		$( "#checkingalert" ).addClass("alert-warning");
		$( "#checkingalert" ).show();
	}

	function progressCallback(e)
	{
		if(e.lengthComputable)
		{
			$( "#checkingtext" ).html("Downloaded " + e.loaded + " out of " + e.total + "<br>If download does not complete, you can <a href=\"/cv.html\">force reload</a>");
			$( "#checkingalert" ).addClass("alert-warning");
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
		$( "#checkingalert" ).addClass("alert-danger");
		$( "#checkingalert" ).show();
		
	}
	function checkingCallback()
	{
		console.log("Checking for updates...");
		var hiddenBox = $( "#checkingalert" );
		$( "#checkingalert" ).addClass("alert-warning");
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
		$( "#checkingalert" ).addClass("alert-danger");
		$( "#checkingalert" ).show();
		
	}

	window.addEventListener("load", loaded, false);
	webappCache.addEventListener("updateready", updateCache, false);
	//webappCache.addEventListener("cached", updateCache, false);
	webappCache.addEventListener("error", errorCache, false);
	webappCache.addEventListener("checking", checkingCallback, false);
	webappCache.addEventListener("noupdate", noUpdateCallback, false);
	webappCache.addEventListener("downloading", downloadingCallback, false);
	webappCache.addEventListener("progress", progressCallback, false);
	webappCache.addEventListener("obsolete", obsoleteCallback, false);
})();