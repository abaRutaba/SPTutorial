<script class="photoscript" type="text/javascript" src="/Style Library/Exceed/JS/GlobalVars.js" ></script>
<link class="photocss" href="/Style Library/Exceed/PhotoGallery/blueimp-gallery.min.css" rel="stylesheet" />

<script class="photoscript" src="/Style Library/Exceed/PhotoGallery/blueimp-gallery.min.js"></script>
<script class="photoscript" src="/Style Library/Exceed/PhotoGallery/blueimp-gallery-video.js"></script>
<script class="photoscript" language="javascript" type="text/javascript" src="/Style Library/Exceed/PhotoGallery/JPages.min.js"></script>
<script class="photoscript" language="javascript" type="text/javascript" src="/Style Library/Exceed/PhotoGallery/jquery.SPServices.min.js"></script>

<script>
    var methodName = "GetListItems";
    var siteURL = window.location.protocol + "//" + window.location.hostname + _spPageContextInfo.siteServerRelativeUrl + ADFDGlobalVariables.MediaCenterSiteUrls.Gallery;
    var listName = ADFDGlobalVariables.MediaCenterListsName.PhotoGallery;
    var noItems = "";
    var level = 0;
    var configListItems, itemLimit;
    
    $(document).ready(function () { 
	    if(_spPageContextInfo.siteServerRelativeUrl!="/"){
	    	$('link.photocss').attr('href',_spPageContextInfo.siteServerRelativeUrl + $('.photocss').attr('href'));
	    	$('script.photoscript').each(function(){
	    		$(this).attr('src',_spPageContextInfo.siteServerRelativeUrl + $(this).attr('src'));
	    	})	    
	    }
		getMediaGallery();
	});


    var ImageHtml = '';
    var VideoDataLength = 0;
    var FolderRowLimit = 0;
    var folderurl = '';
    var foldersName;
    var albumsID = [];
    var albumName = '';
    var parentClassName = '';


	var subFolderCount, itemChildCount;

    function ApplyHTMLEvents() {
        var cl;
        if (parentClassName == '') {
            cl = ".s";

        } else {
            cl = "." + parentClassName;

        }

        $(cl).click(function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {
                    index: link,
                    event: event,
                    youTubeClickToPlay: false,

                    onslide: function (index, slide) {
                        //download link
                        var text = this.list[index].getAttribute('data-sources'),
                            node = this.container.find('.ig_i10');
                        node.empty();
                        if (text) {
                            //download button
                            // node[0].appendChild(document.createTextNode(text));
                        }
                    },
                },
                links = $('div>.' + parentClassName + '>div>.ig_i10').toArray();

            // $(this).find('img .slide-content').append("<div style='position:relative; display:inline-block'>");
            blueimp.Gallery(links, options);
        });
    }


    function getMediaGallery(folderUrl, _subFolderCount, _itemChildCount, folderClicked) {
        var method = methodName;
        var webURL = ADFDGlobalVariables.MediaCenterSiteUrls.Gallery;
        var list = ADFDGlobalVariables.MediaCenterListsName.PhotoGallery;

        var fieldsToRead = "<ViewFields Properties='True'><FieldRef Name='MetaInfo' /><FieldRef Name='Title' /><FieldRef Name='Name' /><FieldRef Name='FileLeafRef' /><FieldRef Name='ContentType' /></ViewFields>";
        //  var query = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query>";
        var query = "<Query><OrderBy><FieldRef Name='Modified' Ascending='FALSE'></FieldRef></OrderBy><Where><Eq><FieldRef Name='ContentType'/><Value Type='Computed'>Folder</Value></Eq></Where></Query>";
        var queryoption = '<QueryOptions></QueryOptions>';
        
		if(_subFolderCount > 0 && folderUrl) {
			queryoption = "<QueryOptions><Folder>" + "/" + folderUrl + "</Folder></QueryOptions>";
		}
		
		if (_subFolderCount == 0 && _itemChildCount > 0 && folderUrl) {
			query = "<Query><OrderBy><FieldRef Name='Modified' Ascending='FALSE'></FieldRef></OrderBy></Query>"; 
			queryoption = "<QueryOptions><ViewAttributes Scope='RecursiveAll' /><Folder>" + "/" + folderUrl + "</Folder></QueryOptions>";
			level = 2;
			console.log(queryoption);
        }
		
		if(folderClicked && _subFolderCount == 0 && _itemChildCount == 0) { alert("No items to show"); }
		
        try {debugger;
            $().SPServices({
                operation: method,
                async: false,
                webURL: siteURL,
                listName: list,
                CAMLViewFields: "<ViewFields Properties='True'></ViewFields>",
                CAMLQuery: query,
                CAMLQueryOptions: queryoption,
                completefunc: function (xData, Status) {
                    if (Status == "success") {
debugger
                        OnSuccessgetMediaGalleryName(xData, Status);

                        if (level == 2) {
                        	ApplyHTMLEvents();
                        	ApplyGalleryyPluggin();
                        }
                        else {
                            $('a.galleryItem').click(function () {
                                event.preventDefault();
                                
                                console.log($(this).parent().parent().attr("folder"));

                                itemChildCount = $(this).parent().parent().parent().attr("itemchildcount")
                                subFolderCount = $(this).parent().parent().parent().attr("folderchildcount")
                                
								getMediaGallery($(this).parent().parent().attr("folder"), subFolderCount, itemChildCount, true)
                                
                            });
                        }
                    } else {
                        OnFailgetMediaGalleryName(xData, Status);
                    }

                    var viewAll = "";

                }
            });
        } catch (e) {
            throw e;
        }
                                    
		
    }

    function OnSuccessgetMediaGalleryName(xData, Status) {debugger
        var videoAlbumsCounter = 0;
        var FoldersNameCounter = 0;
        $("div.holder").show();
        
        // debugger;
        
        console.log("inside success of folder method");
        console.log($(xData.responseXML).SPFilterNode("z:row").length);
        
        try {
            $(xData.responseXML).SPFilterNode("z:row").each(function (Index) {
            
				console.log($(this));
                videoAlbumsCounter++;
                
                folderurl = $(this).attr('ows_FileRef').split(';#')[1];
                foldersName = $(this).attr("ows_NameOrTitle");
                folderType = $(this).attr('ows_ContentType');
                folderChildCount = $(this).attr('ows_FolderChildCount').split(';#')[1];
                itemChildCount = $(this).attr('ows_ItemChildCount').split(';#')[1];

                albumName = foldersName;

                FoldersNameCounter++;

                if (FoldersNameCounter == 1) {
                    ImageHtml += '<div class="item' + (Index == 0 ? ' active' : '') + '"><div class="row hmz pictureGallery scad-album"><div id="images-box" class="images-box">';
                }
                
                ImageHtml += '<div class="col-md-4 col-sm-6 col-xs-12 popupopen no-padding imageAlbum" folderchildcount="'+ folderChildCount +'" itemchildcount="'+itemChildCount+'">';
                
                if(level == 2) {
                	folderurl = folderurl.substr(0, folderurl.lastIndexOf("/"));
                	foldersName = folderurl.substr(folderurl.lastIndexOf("/") + 1, folderurl.length - folderurl.lastIndexOf("/") - 1);
                	

                }

                getLatestImages(foldersName, folderurl);
                
                ImageHtml += '</div>';
                
				if(level ==2 && Index >= 0) { return false; } 
            });

            ImageHtml += '</div></div></div>';
            $('#IndividualImage').html(ImageHtml);

            if (videoAlbumsCounter == 0) {
                $('#IndividualImage').append(noItems);
                $("div.holder").hide();
            }
            else {
            	// paging
            }
            
            ImageHtml = '';
        } catch (e) {
            throw e;
        }
    }

    function OnFailgetMediaGalleryName(xData, Status) {
    	
		console.log("media gallery name: ");
		console.log(xData);
        try {
            if (window.location.href.toLowerCase().indexOf("/english/") < 0) {
            	console.log(xData);
                $('#IndividualImage').append("?? ???? ?????? ??? ?????????");
            }
            else {
                $('#IndividualImage').append("Can not get Albums");
            }
            $("div.holder").hide();

        } catch (e) {
            throw e;
        }
    }


    function getLatestImages(foldersName, folderurl) {
		console.log("calling get latest images... for folder: " + folderurl)

        var method = methodName;
        var webURL = siteURL;
        var list = listName;
        
        var fieldsToRead = "<ViewFields><FieldRef Name='Title'/><FieldRef Name='FileLeafRef' /><FieldRef Name='Description' /></ViewFields>";
        var query = "<Query><OrderBy><FieldRef Name='Modified' Ascending='FALSE'></FieldRef></OrderBy><Where><Eq><FieldRef Name='ContentType'/><Value Type='Computed'>Picture</Value></Eq></Where></Query>";
        var queryoption = "<QueryOptions><ViewAttributes Scope='RecursiveAll' /><Folder>" + "/" + folderurl + "</Folder></QueryOptions>";

            $().SPServices({
                operation: method,
                async: false,
                webURL: webURL,
                listName: list,
                CAMLViewFields: fieldsToRead,
                CAMLQuery: query,
                CAMLQueryOptions: queryoption,
                completefunc: function (xData, Status) {

                    if (Status == "success") {

                        OnSuccessGetLatestImages(xData, Status, foldersName, folderurl);

                    } else {
                        OnFailGetLatestImages(xData, Status);
                    }
                }
            });

    }

    function OnSuccessGetLatestImages(xData, Status, foldersName, folderurl) {

        var IndividualImageHtml = '';
        var IndividualImageCounter = 0;
        var DataLength = $(xData.responseXML).SPFilterNode("z:row").length;
        
		console.log("Inside latest image success : " + DataLength);
		console.log(level);
		
        if (DataLength == 0 || level != 2) {
            IndividualImageHtml += '<div class="' + foldersName + '" folder="' + folderurl + '"><div class="thumbnail ig_i4" style="">';
            IndividualImageHtml += '<a class="ig_i10 galleryItem example-image-link galleryThumb" data-description="' + foldersName + '" type="img" href="' + '/_layouts/15/images/256_folder.png' + '" title="' + 'ImageTitle' + '">';
            IndividualImageHtml += ' <img  src="' + (_spPageContextInfo.siteServerRelativeUrl!="/"?_spPageContextInfo.siteServerRelativeUrl:"") + '/Style Library/Exceed/PhotoGallery/download.jpg' + '" class="center-block galleryThumb img-responsive" alt="">';
            IndividualImageHtml += ' <div class="ImageGalleryLabel text-center"><div class="inner-label">' + foldersName + '</div></div></a>';
            IndividualImageHtml += '</div></div>';


            ImageHtml += IndividualImageHtml;
            $('.images-box').html(ImageHtml);

            IndividualImageHtml = '';

        }
        else {
            try {
                $(xData.responseXML).SPFilterNode("z:row").each(function (Index) {
                	
					console.log("image found " + Index);
					
					
					
                    var Path = $(this).attr("ows_FileLeafRef").split(';#')[1];
                    var ImageLink = siteURL + '/' + Path;
                    var FolderLink = siteURL + '/' + folderurl;
                    var Image = $(this).attr("ows_FileLeafRef").split(';#')[1];
                    var ImageTitle = $(this).attr("ows_Title");
                    
                    ImageLink = '/' + folderurl + '/' + Image;
                    var description = $(this).attr("ows_Description");
                    description = !IsNullOrUndefined(description) ? description : "";

                    var AlbumName = foldersName;
                    if (ImageTitle == undefined) {
                        ImageTitle = '';
                    }

                    if ((IndividualImageCounter + 1) == 1) {

                        IndividualImageHtml += '<div class="' + albumName + '" ><div class="thumbnail ig_i4">';

                        IndividualImageHtml += ' <a class="ig_i10 galleryItem example-image-link galleryThumb" type="img" data-description="' + description + '" href="' + ImageLink + '" title="' + ImageTitle + '">';

                        IndividualImageHtml += ' <img src="' + ImageLink + '" class="center-block galleryThumb img-responsive" alt=""></a> ';

                        IndividualImageHtml += ' <div class="ImageGalleryLabel text-center"><div class="inner-label">' + AlbumName + '</div></div></div></div>';


                    } else {
                        IndividualImageHtml += '<div class="' + albumName + '"><div class="thumbnail ig_i4" style="display: none;">';


                        IndividualImageHtml += '<a class="ig_i10 galleryItem example-image-link galleryThumb" data-description="' + description + '" type="img" href="' + ImageLink + '" title="' + ImageTitle + '">';

                        IndividualImageHtml += ' <img  src="' + ImageLink + '" class="center-block galleryThumb img-responsive" alt=""></a></div></div>';
                    }
                    
                    IndividualImageCounter++;
                });



                ImageHtml += IndividualImageHtml;
                $('.images-box').html(ImageHtml);

                IndividualImageHtml = '';


            } catch (e) {
                throw e;

            }
        }
    }

    function OnFailGetLatestImages(xData, Status) {

		console.log("Can not get Latest Images");
		$('#IndividualImage').append("Can not get Latest Images");
    }


    function ApplyGalleryyPluggin() {

        $('.popupopen').click(function (event) {
            event = event || window.event;
            
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {
                    index: link,
                    event: event,
                    onslide: function (index, slide) {

                        var a = document.createElement("a");
                        $(a).attr('class', 'downloadfile');
                        var downloadfilelink = this.list[index].getAttribute('href');
                        $(a).attr('href', downloadfilelink);
                        $(a).attr('download', downloadfilelink.split('/')[5]);
                        $(a).html('<br/>?????');

                        var title = this.list[index].getAttribute('href'),

                        nodes = this.container.find('.title');

                        nodes[0].appendChild(a);
                        var text = this.list[index].getAttribute('data-description'),
                            //node = this.container.find('.ig_i10');
                            node = this.container.find('.description');
                        node.empty();
                        if (text) {
                            node[0].appendChild(document.createTextNode(text));
                        }
                    },
                },
                links = this.getElementsByTagName('a');
            
            blueimp.Gallery(links, options);
        });

        $('.ig_i4').on({
            'mouseenter': function () {
                parentClassName = $(this).parent().prop('class');
                if ($(this).find('.imgZoomCont').length == 0) {
                    $(this).find('img').wrap("<div class='imgZoomCont'></div>");
                    if ($(this).find('a').attr('type') == 'img') {
                        $(this).find('.imgZoomCont').append("<div class='ig_i6'><div class='ig_i7' onclick=ApplyHTMLEvents('" + parentClassName + "')><i class=\"fa fa-search ig_i9\" aria-hidden=\"true\"></i></div></div>");
                    } else {
                        $(this).find('.imgZoomCont').append("<div class='ig_i6'><div class='ig_i7'><i class=\"fa fa-youtube-play ig_i9\" aria-hidden=\"true\"></i></div></div>");
                    }
                    var el = $(this);
                    setTimeout(function () {
                       /* el.find('.ig_i6').css('opacity', '1');
                        el.find('.ig_i9').css('transform', 'scale(1.1)');*/
                    }, 1);
                }
            }
        });

        $('.ig_i4').on('mouseleave', function () {
            $(this).find('img').unwrap();
            $(this).find('.ig_i6').remove();
        });
    }


</script>

<style>
h3.title a { color:#dadada !important;}
</style>

<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
    <div id="imgdailog" class="slides"></div>
    <h3 class="title" style="background:none; color:lightseagreen;"></h3>
    <p class="description"></p>
    <a class="prev show"></a>
    <a class="next show"></a>
    <a class="close show"></a>
    <!--<a class="play-pause"></a>-->
    <ol class="indicator show"></ol>
</div>




<div class="content-inner" id="GalleryViewAll">

    <div class="col-lg-12 col-xs-12 col-md-12 col-sm-12 no-padding">
        <div class="row">

            <div class="carousel slide" id="galleryCarousel">
                <div class="carousel-inner" id="IndividualImage">
                </div>
                <div class="holder"></div>
            </div>
        </div>
    </div>
</div>