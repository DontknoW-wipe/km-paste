$(document).ready(function(){
	
	$('#sign_up').on('submit',function(e){
		e.preventDefault();

		$.ajax({
			url:"/api/signup",
			type:"POST",
			success:function(){
				alert("User created....");
			},
			error:function(){
				console.log("error");
			}
		});
	});
});
