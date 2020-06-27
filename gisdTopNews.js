<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.0/es6-promise.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/2.0.5/pnp.min.js" type="text/javascript"></script>


  <script>
      $pnp.setup({
    headers: {
          "Accept": "application/json; odata=verbose"
    },
    baseUrl: "http://mshrwfe02/testing/"
    });


$pnp.sp.web.lists.getByTitle("configuration2").items.select("Title,Value").filter("Title eq 'gisdTopNews'").get().then(function(data){
    $("#gisdTopHead").append(data[0].Value);
})



$pnp.sp.web.lists.getByTitle("GISDtopnews2").items.get().then(function(data) {

    console.log("GISD TOP NEWS:", data)
    var html="",count = 0;
    data.forEach(function(e){


        if(e.isActive && count<5){
        
            var d = new Date(e.Created);
            var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var createdAt = d.getDate()+ " " + month[d.getMonth()] + ", "+ d.getFullYear();
            var desc = e.Description;
      
            desc = desc.substring(0,115) + "...  <a href='#'>Read More >></a>"

            html="<li><div class='row'><div class='col-md-11 col-sm-12'><h5>"+e.Title+"</h5><h6>"+createdAt+"</h6><p>"+desc+"</p></div><div class='col-md-1 col-sm-12'><img src='' alt='"+e.Title+"' id='imgId"+e.Id+"' /></div></div></li>";

             $("#gisdTopId").append(html);   
            publishingCall(e.Id)
            count++;
        }
    })
})

function publishingCall(id){
    $pnp.sp.web.lists.getByTitle("GISDtopnews2").items.getById(id).select("PublishingPageIcon").fieldValuesAsHTML.get().then(function(e){
      var str = e.PublishingPageIcon;
      str= str.substring(str.indexOf("src")+5, str.indexOf("style")-2);
   
      document.getElementById("imgId"+id).src = str
    });
}
    


  </script>

<div role="tabpanel" class="tab-pane fade tabs-listings" id="News">

<h5 id="gisdTopHead"><span class="icon-Icon-150px-01"></span ></h5>
<ul id="gisdTopId">

</ul>


</div>