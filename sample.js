$(document).ready(function(){

    	//最初のアニメーション
		setInterval(showText,1000);
		function showText(){
			$(".kaishi").animate({
				top:0
			},1200);
		}
		$("#ju").on("click",function(){
			$("#start").css({
				"display":"none"
			});
		});




		//soundsgoodの基本機能

		var addCount = 10;
		var added = 0;
		var plus = 0;
		//検索を実行
		$("#search").click(function(){
			search($("#keyword").val()); //テキストファイルの中身をvalueとして取り出し、サーチの引数にする
		})

		//検索結果をクリアする
		$("#clear").click(function(){
			$("#display").empty();
			$("#shu").empty();
			$("#right").text("");
		});

		function search(keyword){      //keywordはサーチの引数
			//読み込み中
			$("#load").text("Loading...");

			//ajaxによる読み込み
			$.ajax({
				dataType:"jsonp",
				data:{
					"term":keyword,  //検索文字
					"country":"jp",
					"media":"music",
					"entity":"song",
					"limit":10  //検索結果の数
				},
				url:"http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch",
				success:function(data){
					//検索結果が出たら読み込みを消す
					$("#load").text(""); 

					//結果の表示append
					$.each(data.results,function(i,item){
						$("#shu").append("<div class='"+"content"+"' id='"+"content"+"'>"+
											"<div id='"+"display"+"'>"+"<a href='"+item.collectionViewUrl+"'><img src='"+item.artworkUrl100+"'></a>"+"</div>"+
											"<div id='"+"right"+"'>"+"<h1>"+item.collectionName+"</h1>"+
									"<p>"+item.artistName+"</p>"+
									"<ul>"+"<li><a href='"+item.collectionViewUrl+"'>"+"リンク"+"</a></li>"+
									"<li><a href='"+item.trackViewUrl+"'>"+"つい"+"</a></li>"+"</ul>"+"</div>"+
											"<div id='"+"bottom"+"'>"+"<audio src='"+item.previewUrl+"' controls></audio>"+"</div>"+
										"</div>");
						$("#image")
							.attr("href",item.collectionViewUrl)
							.append("<img src='"+item.artworkUrl100+"'/>");

					});
				}
			});
		}
});
