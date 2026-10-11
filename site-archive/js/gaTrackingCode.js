
  
  /////// Tracking code for  GA
  
  
  
  
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-2386462-15', 'auto');
  ga('send', 'pageview');

$(document).ready(function(){
    

     /// When an ap download button is click send tracking info to google
    $('a span.ios, a span.and').click(function(e){
     
        var target = e.target;
        var url = $(this).closest('a').attr('href');
        var platform = $(this).attr('class');
        var nameApp = $(this).closest('a').attr('id');
        
        ga('send','event','Downloaded App: ' + nameApp,'platform: ' + platform, 'platform url: ' + url);
    
    });   
    
});


//<div class="thumbtitle" onclick="ga('send', 'event', 'Volumes', 'GraphViewed', document.location.href + ':' + 'Survival rates by complexity of procedure');">Survival rates by complexity of procedure</div>