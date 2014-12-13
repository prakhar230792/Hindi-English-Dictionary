
console.log("started");

var $this = this;
$(document).bind("dblclick",function(){
        $this.selectText($this);
});
selectText = function($this){
	selectedText = window.getSelection().toString(); 
    $("mark").contents().unwrap();
    $("mark").remove();
    //$this.removeEmptyResponses($this);
    var selection = $this.getSelection(); 
    var range = selection.getRangeAt(0);
    var cssclass = $(selection.anchorNode.parentNode).attr("class");
    if(selection.toString().length > 2){
        $this.startPoint = selection.anchorOffset;
        $this.endPoint = selection.extentOffset;
        var newNode = document.createElement("mark");
        range.surroundContents(newNode);
        var translateUrl = "http://api.mymemory.translated.net/get?q=" + selectedText + "&langpair=hi|en";
        $.ajax({ 
             type: "GET",
             dataType: 'json',
             url: translateUrl,
             success: function(data){
             	console.log(data.responseData.translatedText);
             	 $("mark").attr('title', '');
                 	// var json = $.parseJSON(data); // create an object with the key of the array
       			// console.log(json); 
        		$("mark").tooltip({
	        	position : { at: "left bottom" },
            	content : data.responseData.translatedText
          
            // console.log("translated text value");
            // console.log(data);
        		});

			 $("mark").tooltip("open");
            }
         });

       
    }
}
