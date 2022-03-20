
window.addEventListener("load", function(){
    var section = document.querySelector("#s15");
    var openButton = section.querySelector(".btn-open");
    var closeButton = section.querySelector(".btn-close");
    var backButton = section.querySelector(".btn-back");
    var forwardButton = section.querySelector(".btn-forward");
    var urlInput = section.querySelector(".input-url");
    var goButton = section.querySelector(".btn-go");
    var countDownButton = section.querySelector(".btn-count-down");
    var countDiv = section.querySelector(".count");
    var iframe = section.querySelector("iframe");

    countDownButton.onclick = function(e){
        e.preventDefault();
        
        var num = parseInt(countDiv.innerText);

        var tid = setInterval(function(){
            
            num--;
            countDiv.innerText = num;

            if(num == 0){
                clearInterval(tid);

                window.location.href="https://www.newlecture.com";
            }

        }, 1000);
    };

    backButton.onclick = function(e){
        e.preventDefault();
        history.back();
    };

    forwardButton.onclick = function(e){
        e.preventDefault();
        history.forward();
    };

    goButton.onclick = function(e){
        e.preventDefault();

        //window.frames[0].location.href="new-page.html";
        frames[0].location.assign(urlInput.value);
        //window.frames[0].location.replace("new-page.html");

        // var value = window.frames[0]
        //             //iframe
        //             //.contentWindow
        //             .document
        //             .querySelector(".input-url")
        //             .value;

        // console.log(value);
    };


    window.win = null;
    console.log(window.win);
    closeButton.onclick = function(e){
        e.preventDefault();
        // win.moveBy(100, 0);
        if(win != null){
            win.close();
            win = null;
        }
    };

    openButton.onclick = function(e){
        e.preventDefault();

        if(win == null)
            win = open("new-page.html", "_blank", "left=100,top=100,width=320,height=320");
         
    };

});


/* <h1>14. 대화상자 띄우기</h1> */
window.addEventListener("load", function(){
    var section = document.querySelector("#s14");
    var delButton = section.querySelector(".btn-del");
    delButton.onclick = function(e){
        e.preventDefault();
       
        var dlg = new Dialog();
        dlg.onok = function(){
            console.log("확인되었습니다.");
        };

        dlg.oncancel = function(){
            console.log("취소되었습니다.");
        };

        
        dlg.confirm("정말 삭제하시겠습니꽈?");

        
        // jsp + oracle sql -> es6 ->  nodejs

    };
});

window.addEventListener("load", function(){
    var section = document.querySelector("#s13");
    var box = section.querySelector(".box");
    
    var dragged = null;

    box.ondrag = function(e){ };
    box.ondragstart = function(e){ 
        e.target.classList.add("dragging");
        dragged = e.target;
    };
    box.ondragend = function(e){ 
        e.target.classList.remove("dragging");

        var items = box.querySelectorAll(".row");
        for(var i=0; i<items.length; i++)
            items[i].classList.remove("drop-item");
    };
    box.ondragenter = function(e){ 
        e.preventDefault();
        var top = e.pageY-box.offsetTop;

        var items = box.querySelectorAll(".row:not(.dragging)");
        
        for(var i=0; i<items.length; i++)
            if(items[i].offsetTop < top && top < items[i].offsetTop + items[i].offsetHeight)
                items[i].classList.add("drop-item");   
            else
                items[i].classList.remove("drop-item");

    };
    box.ondragleave = function(e){ 
       
    };
    box.ondragover = function(e){ 
        e.preventDefault();

    };
    box.ondrop = function(e){         
        var top = e.pageY-box.offsetTop;

        var items = box.querySelectorAll(".row:not(.dragging)");
        var target = null;
        for(var i=0; i<items.length; i++)
            if(items[i].offsetTop < top && top < items[i].offsetTop + items[i].offsetHeight){
                target = items[i];
                break;
            }

        var first = dragged;
        var next = first.nextElementSibling;
        var second = target;
        
        second.replaceWith(first); // Element interface
                
        if(next === second) // 연속해서 선택되었다면
            first.before(second);
        else if(!next)
            box.append(second);
        else
            next.before(second);
    };
    
});



// --- <h1>12. 이벤트 다루기(drag & drop) : 데이터 드래그 & 드랍</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s12");
    var formSection = document.querySelector(".form-section");
    var listSection = document.querySelector(".list-section");

    var unameInput = formSection.querySelector("input[name=uname]");
    var regButton = formSection.querySelector("input[name='btn-reg']");
    var listUl = listSection.querySelector(".list");
    var disabledListUl = listSection.querySelector(".disabled-list");
    var delFirstButton = listSection.querySelector(".btn-del-first");
    var delAllButton = listSection.querySelector(".btn-del-all");
    var changeButton = listSection.querySelector(".btn-change");
    var disableButton = listSection.querySelector(".btn-disable");

    disableButton.onclick = function(e){
        e.preventDefault();

        var selectedLis = Array.from(listUl.querySelectorAll(":checked")).map(function(input){
            return input.parentElement;
        });
        
        //var existingLis = disabledListUl.children;        
        //disabledListUl.replaceChildren(...selectedLis, ...existingLis);

        //for(var i=0; i<selectedLis.length; i++)
            //disabledListUl.append(selectedLis[0], selectedLis[1], selectedLis[2]);
        
        disabledListUl.append(...selectedLis);

    };

    changeButton.onclick = function(e){
        e.preventDefault();

        // 정해진 2개의 자리 바꾸기
        // var first = listUl.children[0];
        // var second = listUl.children[1];

        // 선택된 2개의 자리 바꾸기
        var arr = listUl.querySelectorAll("input:checked");
        if(arr.length != 2){
            alert("두 개를 선택하지 않았습니다.");
            return;
        }
        
        var inputs = Array.from(arr);
        var lis = inputs.map(function (input) {
            return input.parentElement;
        });


        var first = lis[0];
        var next = first.nextElementSibling;
        var second = lis[1];

        // var detached = listUl.replaceChild(first, second); // Node interface
        second.replaceWith(first); // Element interface
                
        if(next === second) // 연속해서 선택되었다면
            first.before(second);
        else
            next.before(second);


        //var detached = listUl.removeChild(second); // Node interface API
        //second.remove();
        //listUl.insertBefore(detached, first);       // Node interface API / Element interface
        //first.before(second);
    };

    delAllButton.onclick = function(e){
        e.preventDefault();

        var lis = listUl.children;

        
        for(var i=0; i<lis.length; i++){
            var checkbox = lis[i].querySelector("input[type=checkbox]");

            if(checkbox.checked)
                lis[i].remove();
        }

    };

    listUl.onclick = function(e){
        
        if(!e.target.classList.contains("btn-del"))
            return;
        
        e.preventDefault();

        e.target.parentElement.remove();

        if(listUl.children.length == 0)
            listUl.classList.add("empty");

    };

    delFirstButton.onclick = function(e){
        e.preventDefault();

        //listUl.removeChild(listUl.firstElementChild);
        listUl.firstElementChild.remove();

    };

    regButton.onclick = function(e){
        
        if(!unameInput.checkValidity())         
            return;
        
        // if(!unameInput.checkValidity()){
        //     alert("이름 입력오류:"+unameInput.validationMessage);
        //     return;
        // }
        
        e.preventDefault();

        var html = '<li class="item d-flex"><input type="checkbox" class="mr-2">'+unameInput.value+'<a class="ml-auto icon icon-close btn-del" href="">삭제</a></li>';
        listUl.insertAdjacentHTML("afterbegin", html);
                
        // empty 클래스명이 있는지
        // 항목의 개수가 1 이상이라면
        if(listUl.children.length > 0)
            listUl.classList.remove("empty");

        //unameInput.value = "";
    };
    
});

// --- <h1>11. 이벤트 다루기(drag & drop) : 데이터 드래그 & 드랍</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s11");
    var dropZone = section.querySelector(".drop-zone");
    var errorMessage = dropZone.querySelector(".error-message");
    var uploadBox = section.querySelector(".upload-box");

    dropZone.ondragenter = function(e){
        console.log("enter");
        dropZone.classList.add("over");
    };
    dropZone.ondragleave = function(e){
        console.log("leave");
        dropZone.classList.remove("over");
        errorMessage.classList.add("d-none");
    };
    dropZone.ondragover = function(e){
        e.preventDefault();
        console.log("over");

        // if(e.dataTransfer != null)
        //     if(e.dataTransfer.types != null)
        //         if(e.dataTransfer.indexOf("Files") == 0)

        var valid = e.dataTransfer
                        && e.dataTransfer.types
                        && e.dataTransfer.types.indexOf("Files") >= 0;

        if(!valid){
            dropZone.classList.add("error");
            errorMessage.classList.remove("d-none");
        }
            
                

    };
    dropZone.ondrop = function(e){
        e.preventDefault();

        console.log("drop");

        dropZone.classList.remove("over");
        errorMessage.classList.add("d-none");

        var file = e.dataTransfer.files[0];

        var reader = new FileReader();
        reader.onload = function(e){
            var img = document.createElement("img");
            img.src = e.target.result;
            //img.src="c:\\images/1.jpg";
            img.style.height = "100px";
            uploadBox.appendChild(img);
        };
        reader.readAsDataURL(file);

        
    };
});
// --- <h1>10. 이벤트 다루기(mouse move/down/up) : 박스 드래그 & 드랍</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s10");
    var box = section.querySelector(".box");
    //var item = box.querySelector(".item");
    var current = null;
    
    var isMouseDown = false;
    var offset = {x:0, y:0};
    
    section.onmousemove = function(e){
        
        if(!isMouseDown)
            return;

        if(current == null)
            return
        
        current.style.left = e.pageX
                        -box.offsetLeft
                        -offset.x+"px"; // 100;
        current.style.top = e.pageY
                        -box.offsetTop
                        -offset.y+"px";
        // console.log(item.style.left);
    }
    
    section.onmousedown = function(e){

        if(!e.target.classList.contains("item"))
            return;

        current = e.target;

        isMouseDown = true;

        offset.x = e.offsetX;
        offset.y = e.offsetY;

        // var pos1 = "offsetX: "+e.offsetX+", offsetY:"+e.offsetY;
        // var pos2 = "clientX: "+e.clientX+" , clientY:"+e.clientY;
        // var pos3 = "pageX: "+e.pageX+" , pageY:"+e.pageY;
        // var pos4 = "screenX: "+e.screenX+" , screenY:"+e.screenY;
        // var pos5 = "movementX: "+e.movementX+" , movementY:"+e.movementY;
        // var pos5 = "movementX: "+e.movementX+" , movementY:"+e.movementY;
        // console.log(pos1);
        // console.log(pos2);
        // console.log(pos3);
        // console.log(pos4);
        // console.log(pos5);        
    };

    section.onmouseup = function(e){
        if(!e.target.classList.contains("item"))
            return;

        isMouseDown = false;

        offset.x = 0;
        offset.y = 0;
    };

});
// --- <h1>9-1. 이벤트 다루기(wheel) : 페이지 넘기기</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s9-1");
    var pageBox = section.querySelector(".page-box");

    var currentDiv = section.querySelector(".active");

    var isWorking = false;

    pageBox.onwheel = function(e){

        if(isWorking)
            return;

        if(!e.ctrlKey)
            return;

        e.preventDefault();
        
        if(e.deltaY > 0){            
            currentDiv.nextElementSibling.classList.add("active");
            currentDiv = currentDiv.nextElementSibling;
        }
        else{
            currentDiv.classList.remove("active");
            currentDiv = currentDiv.previousElementSibling;
        }

        isWorking = true;

        currentDiv.ontransitionend = function(){
            isWorking = false;
        };
        
    };
    
});

// --- <h1>9. 이벤트 다루기(wheel) : 사진 갤러리</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s9");
    var showRoom = section.querySelector(".show-room");
    var img = showRoom.querySelector("img");
    var imgList = section.querySelector(".img-list-box > ul");
    var currentLi = imgList.querySelector(".current");
    // var currentIndex = 0;
    // var list = imgList.querySelectorAll("li");
    var isWorking = false;
    
    section.onkeydown = function(e){
        e.preventDefault();

        switch(e.code){
        case "ArrowRight":
            currentLi.classList.remove("current");
            currentLi.nextElementSibling.classList.add("current");            
            currentLi = currentLi.nextElementSibling;
            break;
        case "ArrowLeft":
            currentLi.classList.remove("current");
            currentLi.previousElementSibling.classList.add("current");
            currentLi = currentLi.previousElementSibling;
            break;
        }
    };

    imgList.onwheel = function(e){
        if(!e.ctrlKey)
            return;
        e.preventDefault();
        // currentLi.parentElement;
        // currentLi.previousElementSibling;
        // currentLi.nextElementSibling;
        // currentLi.firstChild;
        // currentLi.lastChild;
        // currentLi.children;

        if(isWorking)
            return;

        
        if(e.deltaY > 0){ // 오른쪽
            currentLi.classList.remove("current");
            currentLi.nextElementSibling.classList.add("current");            
            currentLi = currentLi.nextElementSibling;
        }
        else{
            currentLi.classList.remove("current");
            currentLi.previousElementSibling.classList.add("current");
            currentLi = currentLi.previousElementSibling;
        }

        isWorking = true;

        currentLi.ontransitionend = function(){
            isWorking = false;
        };

        //currentLi.querySelector("img")
        img.src = currentLi.firstElementChild.src;

    };

    var scale = 1;
    img.onwheel = function(e){
        if(!e.ctrlKey)
            return;
            
        e.preventDefault();

        scale += e.deltaY*0.001;
        
        img.style.transform = "scale("+scale+")";
    };
});

// --- <h1>8. 스타일 다루기(Pseudo Class/focus/blur) : 입력 폼의 유효성 검사하기</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s8-1");
    var box = section.querySelector(".box");

    box.onkeydown = function(e){
        if(e.code == "Delete")
            e.target.classList.add("delete");
    };
});

// --- <h1>8. 스타일 다루기(Pseudo Class/focus/blur) : 입력 폼의 유효성 검사하기</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s8");
    var form = section.querySelector("form");
    var unameDiv = form.querySelector(".uname-input");
    var unameInput = form.querySelector("input[name=uname]");
    var msgDiv = form.querySelector(".msg");

    unameDiv.oninput = function(e){
        unameInput.value = unameDiv.innerText;
        var uname = unameDiv.innerText;

        if(uname == "newlec")
            alert("사용자 이름이 중복되었습니다.");
            //msgDiv.classList.remove("d-none");
            // element 객체를 생성하는 코드

    };

    form.onsubmit = function(e){
        e.preventDefault();

        if(unameDiv.innerText.length < 3){
            alert("아이디는 3글자 이상 이어야만 하빈다.");
            return;
        }

        form.submit();
    };

    // unameInput.oninput = function(e){
    //     var uname = unameInput.value;
        
    //     // if(uname == "newlec")
    //     //     unameInput.setCustomValidity("이미 사용중인 아이디입니다.");
    //     // else
    //     //     unameInput.setCustomValidity("");
    // };

});
// --- <h1>7. 스타일 다루기(ComputedStyle/...) : 선택된 아이템을 이동하기</h1>---
window.addEventListener("load", function(){
    var section = document.querySelector("#s7");
    var box = section.querySelector(".box");

    var selectedItem = section.querySelector(".selected");
    
    box.onclick = function(e){
        var validItem = e.target.classList.contains("src-item") 
                        || e.target.classList.contains("dst-item");
        if(!validItem)
            return;
        
        if(e.target.classList.contains("src-item")){
            if(selectedItem != null)
                selectedItem.classList.toggle("selected");
            // 선택된 아이템의 배경색을 빨간색으로.
            e.target.classList.toggle("selected");
            selectedItem = e.target;
        }
        else if(e.target.classList.contains("dst-item")){

            var targetStyle = window.getComputedStyle(e.target);
            var left = targetStyle.getPropertyValue("left");
            var top = targetStyle.getPropertyValue("top");

            selectedItem.style.left = left;
            selectedItem.style.top = top;
            selectedItem.style.transform = "rotate(360deg)";

            selectedItem.ontransitionend = function(){
                selectedItem.classList.remove("selected");
                selectedItem.classList.add("finished");

                selectedItem.ontransitionend = null;
            };
            //selectedItem.addEventListener("transitionend", function(){});
        }
    };

});

// -- <h1>6. 스타일 다루기(classList) : 아코디언 만들기</h1> ---
window.addEventListener("load", function(){
    var section = document.querySelector("#s6");
    var box = section.querySelector(".box");
    var current = section.querySelector(".active");
        
    box.onclick = function(e){

        var isHeader = e.target.nodeName == "H2"    
                    || e.target.classList.contains("accordion-header");

        //(e.target.nodeName != "H2") && (!e.target.classList.contains("accordion-header"))

        if(!isHeader)
            return;
        
        if(current != null)
            current.classList.remove("active");
        
        e.target.classList.add("active");
        current = e.target;
    };

});

//<h1>5. 스타일 다루기(className) : 아이템 이동</h1>-----
window.addEventListener("load", function(){
    var section = document.querySelector("#s5");
    var btnNext = section.querySelector(".btn-next");
    var lis = section.querySelectorAll("li");

    var offIndex = 0;

    btnNext.onclick = function(e){
        e.preventDefault();

        offIndex++;

        var size = lis.length;

        lis[(0+offIndex)%size].className = "card-1th";
        // lis[(0+offIndex)%size].style.left = "0px";
        // lis[(0+offIndex)%size].style.width = "100px";
        // lis[(0+offIndex)%size].style.height = "150px";
        
        lis[(1+offIndex)%size].className = "card-2th";
        // lis[(1+offIndex)%size].style.left = "calc(50% - 60px)";
        // lis[(1+offIndex)%size].style.width = "120px";
        // lis[(1+offIndex)%size].style.height = "180px";
        lis[(2+offIndex)%size].className = "card-3th";
        // lis[(2+offIndex)%size].style.left = "calc(100% - 100px)";
        // lis[(2+offIndex)%size].style.width = "100px";
        // lis[(2+offIndex)%size].style.height = "150px";

    };

});

//<h1>4. 스타일 다루기 : 값 입력과 동적으로 박스 스타일 변경</h1> -----
window.addEventListener("load", function(){
    var section = document.querySelector("#s4");
    var styleInput = section.querySelector(".style-input");
    var widthInput = section.querySelector(".width-input");
    var radiusInput = section.querySelector(".radius-input");
    var colorInput = section.querySelector(".color-input");
    var item = section.querySelector(".item");
    var outputDiv = section.querySelector(".output");
    
    // styleInput.onchange;
    // styleInput.onInput;
    // styleInput.onmousedown;
    
    styleInput.oninput = function(e){
        // border-style 값을 대입하시오.
        item.style.borderStyle = styleInput.value;
        outputDiv.innerText = item.style.cssText;
    };
    widthInput.oninput = function(e){
        // border-width 값을 대입하시오.
        item.style.borderWidth = widthInput.value+"px";
        outputDiv.innerText = item.style.cssText;
    };
    radiusInput.oninput = function(e){
        // border-width 값을 대입하시오.
        item.style.borderRadius = radiusInput.value+"px";
        outputDiv.innerText = item.style.cssText;
    };
    colorInput.oninput = function(e){
        // border-width 값을 대입하시오.
        item.style.borderColor = colorInput.value;
        outputDiv.innerText = item.style.cssText;
    };
});

//<h1>3. 이벤트 객체 : 개선된 계산기</h1> -----
window.addEventListener("load", function(){
    var section = document.querySelector("#s3");
    var txtInput = section.querySelector("input[type=text]");
    var box = section.querySelector("div");
    var divInput = box.querySelector("input[value='/']");

    divInput.onclick = function(e){
        //e.stopPropagation();

        console.log("나눗셈연산");
    };

    box.addEventListener("click", function(e){
        e.preventDefault();
        
        if(e.target.nodeName != "INPUT")
            return;

        console.log("버튼 클릭");

        txtInput.value += e.target.value;         
    },true);

    // box.onclick = function(e){ 
    //     e.preventDefault();
        
    //     if(e.target.nodeName != "INPUT")
    //         return;

    //     console.log("버튼 클릭");

    //     txtInput.value += e.target.value;         
    // };

    // var btnInputs = section.querySelectorAll(".num");
    
    // var btnClickHandler = function(e){            
    //     txtInput.value += e.target.value; 
    // };

    // for(var i=0; i<btnInputs.length; i++)
    //     btnInputs[i].onclick = btnClickHandler;
});


//<h1>2. DOM 속성 다루기 : 계산기</h1> ------
window.addEventListener("load", function(){
    var section = document.querySelector("#s2");
    var xInput = section.querySelector(".x-input");
    var yInput = section.querySelector(".y-input");
    var button = section.querySelector(".button");
    var resultSpan = section.querySelector("div>span>span");

    button.onclick = function(){
        var x = parseInt(xInput.value);
        var y = parseInt(yInput.value);

        console.log(x+y);

        resultSpan.textContent = x + y;
    };

});

//<h1>1. 노드 선택방법</h1> -------------------
window.addEventListener("load", function(){
    // var section = document.getElementById("s1");
    // var input = section.getElementsByClassName("input")[0];
    // var button = section.getElementsByClassName("button")[0];
    
    var section = document.querySelector("#s1");
    // var input = section.querySelector(".input");
    var input = section.querySelector("input[type=text]");
    var button = section.querySelector(".button");

    button.onclick = function(){
        input.value = "안녕하세요";
    };
});


//-------------------------------------------

window.addEventListener("load", function(){
    var btnPrint = this.document.getElementById("btn-print");
    btnPrint.onclick = printSum;

    function printSum(){
        var x = prompt('x : ');
        var y = prompt('y : ');
    
        x = parseInt(x);
        y = parseInt(y);
    
        console.log(x+y);
    }
});

// window.onload = function(){
//     btnPrint.onclick = printSum;
// };