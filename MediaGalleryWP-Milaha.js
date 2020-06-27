<script>
function newsletterGalNew() {
	var HtmlNG = '', Htmlimage, HtmlDiv = '', totalDiv, name, image, doJoining, idNo, desig, depart,imageSourceDL ;
	var findObj, iconNLG = 1;

	$pnp.sp.web.lists.getByTitle('NewsletterGallery').items.select('*,FileRef').filter('ParentIDId eq null').orderBy('Priority').top(5).get().then(function(data){
		
		$pnp.sp.web.lists.getByTitle('NewsletterGallery').items.select('Title,ID, ParentIDId, Priority ,FileRef').filter('ParentIDId ne null').orderBy('Priority').top(10000).get().then(function(datas){
			
			for (var i = 0; i < data.length; i++) {
				
				idNo = data[i].ID; title = "N/A"; file = data[i].FileRef; shortDesc = "Description N/A";
				if (IsNullOrUndefined(data[i].Description0) === false) {shortDesc = data[i].Description0;};
				if (IsNullOrUndefined(data[i].Title) === false) {title = data[i].Title;};

				var findObj = datas.find(function(items){ return items.ParentIDId === idNo });
				if (IsNullOrUndefined(findObj) === true) {	imageSourceDL = siteLink + '/Style%20Library/MilahaFile/images/gallery-img' + iconNLG + '.png';	if (iconNLG === 1) { iconNLG = 2; } else if (iconNLG === 2) { iconNLG = 3; } else { iconNLG = 1; } }	
				else {	imageSourceDL = findObj.FileRef;	}
				
				HtmlNG += '<a href="' + data[i].FileRef + '" title="'+shortDesc +'" >\
		               		 <div class="item" > \
		             				<img src="' + imageSourceDL + '" alt=""> \
		             				<div class="content-gallery">' + title + ' </div>\
		             		 </div>\
             			 </a>';

	            //HtmlDivCr+= '<div class="item"><a href="'+siteLink+'/Pages/CircularDetails.aspx?cirID='+idNo+'" title="'+shortDesc+'"><img src="'+imageSourceDL +'" alt="" /><p>'+title +'</p></a></div>';
			}
			
            $('#dummyNews').parent().append(HtmlNG);
            $('#dummyNews').parent().parent().append('<a href="' + siteLink + '/Pages/mediaGalleryNewsListing.aspx" class="viewall-btn">View All</a>');

            $('#dummyNews').remove();

            galleryNewFunction();
	    });
	        
	});
}

</script>

<script>
 
    // New letter Start

    function MediaGallery() {
    /*
    $pnp.sp.web.lists.getByTitle('Newsletter%20Gallery').items.select('*,AttachmentFiles').expand('AttachmentFiles').filter('readyToPublish eq 1').orderBy('Priority', true).orderBy("Modified", false).top(10).get().then(function(e) {
        	var iconNLG = 1;
            var Title, description, priority, date, readyToPublish, attachment,serverRelativeUrl,descSubstr;
            var Html = '';
            e.forEach(function(item) {
                Title = item['Title'];
                Id = item['ID'];

                
				if (item.AttachmentFiles.length != 0) {
	                serverRelativeUrl = item['AttachmentFiles'][0].ServerRelativeUrl;
	            } else {
	                serverRelativeUrl = "#";
	            }

				//if (item['Description'].length > 150) { descSubstr = item['Description'].substring(0, 150) + '...'; } else { descSubstr = item['Description']; }
	            
                Html += '<a href="' + serverRelativeUrl + '">\
		               		 <div class="item" > \
		             				<img src="' + siteLink + '/Style%20Library/MilahaFile/images/gallery-img' + iconNLG + '.png" alt=""> \
		             				<div class="content-gallery">' + Title + ' </div>\
		             		 </div>\
             			 </a>';
             			       
             	if (iconNLG === 1) {
	                iconNLG = 2;
	            } else if (iconNLG === 2) {
	                iconNLG = 3;
	            } else {
	                iconNLG = 1;
	            }

            });
            $('#dummyNews').parent().append(Html);
            $('#dummyNews').parent().parent().append('<a href="' + siteLink + '/Pages/mediaGalleryNewsListing.aspx" class="viewall-btn">View All</a>');

            $('#dummyNews').remove();

            galleryNewFunction();
            Html = '';
        });	*/

        // New letter end
        
        
        // Photo Gallery Start

        var Htmlimage = '',
            HtmlDiv = '',
            name, image, doJoining, idNo, desig, depart, idFolder, folderImage;
        // 'and Priority ne null' from filter and ".orderBy('Priority',true)" removed 5-july-2019
		$pnp.sp.web.lists.getByTitle('Photo Gallery').items.select('*,Title,FileRef,File,Folder/Files,Folder,readyToPublish,Priority').expand('Folder,File,Folder/Files').filter('readyToPublish eq 1').orderBy("Modified", false).top(2000).get().then(function(result) {
		   
			var arrPicFolderNamePic = [];
			var htmlPic = '', picLink, strFRefPG, picFolderName, picFolderNameOrig;

			for (var i = 0; i < result.length; i++) {
				
				strFRefPG = result[i].FileRef;
				
				if ((strFRefPG.substr(strFRefPG.lastIndexOf('/') + 1)).includes(".mp4") === false) { 

					picFolderName = (result[i].FileRef.replace(siteLink,'')).split("/");
					picFolderNameOrig = picFolderName[2].toString();
		
					picLink = result[i].FileRef;
					
					if (arrPicFolderNamePic.indexOf(picFolderNameOrig) === -1) {
						arrPicFolderNamePic.push(picFolderNameOrig);
		         		htmlPic+= '<div class="item">\
										<a href="' + siteLink + '/Pages/mediaGalleryPhotoDetail.aspx?MID=' + siteLink + '/Photo Gallery/'+ picFolderNameOrig+'">\
											<img src="'+ picLink +'" alt=""/>\
											<div class="content-gallery">' + picFolderNameOrig + '</div>\
										</a>\
									</div>';
					}
				}
				if (arrPicFolderNamePic.length === 5) {	i = result.length;	}

			}

            $('#dummyPhoto').parent().append(htmlPic);
			$('#dummyPhoto').parent().parent().append('<a href="' + siteLink + '/Pages/mediaGalleryPhotoListing.aspx" class="viewall-btn">View All</a>');

            $('#dummyPhoto').remove();

            galleryPhotosFunction();

            HtmlDiv = '';

        });
        // Photo Gallery End

    }

    $(document).ready(function() {
        MediaGallery();
        newsletterGalNew();
    });


    //Function newsletter Start

    function galleryNewFunction() {
        var owl3 = $(".gallery-news");

        owl3.owlCarousel({
            items: 3, //10 items above 1000px browser width
            navigation: true,
            pagination: false,
            margin: 5,

            navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
            itemsDesktop: [1000, 3],
            itemsDesktopSmall: [900, 2],
            itemsTablet: [600, 1],
            itemsMobile: [480, 1]
        });
        // Custom Navigation Events
        $(".next").click(function() {
            owl3.trigger('owl3.next');
        })
        $(".prev").click(function() {
            owl3.trigger('owl3.prev');
        })

    }

    //Function newsletter End

    //Function Photo Start
    function galleryPhotosFunction() {

        var owl3 = $(".gallery-photos");
        owl3.owlCarousel({
            items: 3, //10 items above 1000px browser width
            navigation: true,
            pagination: false,
            margin: 5,
            navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right' ></i>"],
            itemsDesktop: [1000, 3],
            itemsDesktopSmall: [900, 2],
            itemsTablet: [600, 1],
            itemsMobile: [480, 1]
        });
        // Custom Navigation Events
        $(".next").click(function() {
            owl3.trigger('owl3.next');
        })
        $(".prev").click(function() {
            owl3.trigger('owl3.prev');
        })

    }
    //Function Photo End

    //Function Video Start

    function galleryVideosFunction() {
        var owl3 = $(".gallery-video");
        owl3.owlCarousel({
            items: 3, //10 items above 1000px browser width
            navigation: true,
            pagination: false,
            margin: 5,
            navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
            itemsDesktop: [1000, 3],
            itemsDesktopSmall: [900, 2],
            itemsTablet: [600, 1],
            itemsMobile: [480, 1]
        });
        // Custom Navigation Events
        $(".next").click(function() {
            owl3.trigger('owl3.next');
        })
        $(".prev").click(function() {
            owl3.trigger('owl3.prev');
        })

    }
    //Function Video End
</script>


<script>
//hamza start
$pnp.sp.web.lists.getByTitle('VideoGallery').items.select('*,Title,FileRef,File,Folder/Files,Folder,readyToPublish,Priority').expand('Folder,File,Folder/Files').filter('readyToPublish eq 1 and Priority ne null').orderBy('Priority',true).orderBy("Modified", false).top(2000).get().then(function(result) {

	var arrFolderName = [];
	var htmlVideo = '', imgLink, strFRef, folderName, folderNameOrig;

	for (var i = 0; i < result.length; i++) {
		
		
		strFRef = result[i].FileRef;
		
		if ((strFRef.substr(strFRef.lastIndexOf('/') + 1)).includes(".mp4") === false) {
			
			folderName = (result[i].FileRef.replace(siteLink,'')).split("/");
			folderNameOrig = folderName[2].toString();

			imgLink = result[i].AlternateThumbnailUrl.Url
			
			if (arrFolderName.indexOf(folderNameOrig) === -1) {
				
				arrFolderName.push(folderNameOrig);
				htmlVideo += '<div class="item">\
          		 				<a href="' + siteLink + '/Pages/mediaGalleryVideoDetail.aspx?MID=/VideoGallery/' + folderNameOrig + '"><img src="' + imgLink + '" alt="asd" /><div class="content-gallery">' + folderNameOrig + '</div></a></div>';
            }
		}
		if (arrFolderName.length === 5) {	i = result.length;	}
	}
    $('#dummyVideo').parent().append(htmlVideo);
	$('#dummyVideo').parent().parent().append('<a href="' + siteLink + '/Pages/mediaGalleryVideoListing.aspx" class="viewall-btn" >View All</a>');

    $('#dummyVideo').remove();
    galleryVideosFunction();
});
//hamza end
</script>




<div class="media-gallery">
    <div class="gallery-heading">
        <div class="ms-rtestate-read ms-rte-wpbox" contenteditable="false">
            <div class="ms-rtestate-notify  ms-rtestate-read 154b68e7-33cd-4b69-aae5-fcc083524c01" id="div_154b68e7-33cd-4b69-aae5-fcc083524c01" unselectable="on">
            </div>
            <div id="vid_154b68e7-33cd-4b69-aae5-fcc083524c01" unselectable="on" style="display: none;">
            </div>
        </div>
        <h3>Media Gallery</h3>
        <div class="tab2 tabs">
            <ul id="tabs-nav">
                <li>
                    <a href="#tab11">Videos</a></li>
                <li>
                    <a href="#tab22">Photos</a></li>
                <li>
                    <a href="#tab33">Newsletter</a></li>
            </ul>
        </div>
    </div>
    <div id="tabs-content">
        <div id="tab11" class="tab-content2">
            <div class="events-carousel">
                <div id="owl-events" class="owl-carousel owl-theme gallery-video  clearfix">

                    <div id="dummyVideo"></div>

                </div>
            </div>
        </div>
        <div id="tab22" class="tab-content2">
            <div class="events-carousel">
                <div id="owl-events" class="owl-carousel owl-theme gallery-photos  clearfix">
                    <div id="dummyPhoto"></div>

                </div>
            </div>
        </div>
        <div id="tab33" class="tab-content2">
            <div class="events-carousel">
                <div id="owl-events" class="owl-carousel owl-theme gallery-news  clearfix">
                    <div id="dummyNews"></div>
                </div>
            </div>
		</div>
    </div>
</div>

<div id="newsletterFileId"></div>

<div id="ch"></div>