function checkPassword(){
    let password=document.getElementById("new-password").value;
    let confirm_password=document.getElementById("confirm-password").value;
    let error=document.getElementById("new-password-error");
    let message=document.getElementById("confirm-password-error");


    if(password.length==0){
        error.textContent="**please enter password**"
            }else if(confirm_password.length==0){
                message.textContent="**must be field**";
        }

            if(password.length !=0 && password.length<8){
                error.textContent="Password must be at least 8 characters";
            }else if(password.length !=0){
        if(password !=confirm_password){
            message.textContent="**Password don't match**";
        }else if(password ==confirm_password){
            alert("reset successfully");
            window.location.href="blank.html";
        }
    }


}
