function rewrite( event ) {
	//Test URLs
	//https://chiliforum.hot-pain.de/thread-223.html -> https://chiliforum.hot-pain.de/threads/223/
	//https://chiliforum.hot-pain.de/thread-2412-page-3.html - https://chiliforum.hot-pain.de/threads/2412/page-3
	//https://chiliforum.hot-pain.de/thread-10284-post-174212.html -> https://chiliforum.hot-pain.de/threads/10284/post-174212
	//https://chiliforum.hot-pain.de/forum-14.html -> https://chiliforum.hot-pain.de/forums/14
	
	var map = [		
		{
			"regex": "^(http|https)(\:\/\/chiliforum\.hot\-pain\.de\/)(thread\-)([0-9]*)(\-page\-)([0-9]*)(\.html)(.*)$",
			"builder": function(match){
				return "https" + match[2] + "threads/" + match[4] + "/page-" + match[6] + match[8];
			},
			"groups": 9
		},
		{
			"regex": "^(http|https)(\:\/\/chiliforum\.hot\-pain\.de\/)(thread\-)([0-9]*)(\-post\-)([0-9]*)(\.html)(.*)$",
			"builder": function(match){
				return "https" + match[2] + "threads/" + match[4] + "/post-" + match[6] + match[8];
			},
			"groups": 9
		},
		{
			"regex": "^(http|https)(\:\/\/chiliforum\.hot\-pain\.de\/)(thread\-)([0-9]*)(\.html)(.*)$",
			"builder": function(match){
				return "https" + match[2] + "threads/" + match[4] + match[6];
			},
			"groups": 7
		},
		{
			"regex": "^(http|https)(\:\/\/chiliforum\.hot\-pain\.de\/)(forum\-)([0-9]*)(\.html)(.*)$",
			"builder": function(match){
				return "https" + match[2] + "forums/" + match[4] + match[6];
			},
			"groups": 7
		}		
	];
	
	for(var mapItem in map){
		var regex = map[mapItem]["regex"];
		var builder = map[mapItem]["builder"];
		var groups = map[mapItem]["groups"];
		
		var match = event.url.match( new RegExp( regex, "i" ) );
		if( match && match.length == groups )
		{		
			var newUrl = builder(match);
			
			chrome.tabs.get( event.tabId, function( tab ) {				
				chrome.tabs.update( event.tabId, { url: newUrl } );
				return;				
			});		
		}
	}
}

chrome.webNavigation.onBeforeNavigate.addListener(rewrite);