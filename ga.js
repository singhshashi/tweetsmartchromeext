///**
// * Created by shashi on 30/10/15.
// */
//
//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//})(window,document,'script','https://ssl.google-analytics.com/analytics.js','gax');
//
//    gax('create', 'UA-69470216-1', 'auto');
//    console.log("Between Gaxs");;
//    gax('send', 'pageview');
//


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-69470216-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();