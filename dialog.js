// //window.print = ...
// var print = function(a, b, c){
//     console.log("a:"+a+", b:"+b+", c:"+c+", this:"+this+", this.kor:"+this.kor);
// };

// print(1,2,3);

// var exam = {kor:10, eng:20};
// print.call(exam,1,2,3);
// print.apply(exam,[1,2,3]);

// var onclick = print.bind(exam);
// onclick(1,2,3);

function Dialog(){
    this.section = document.createElement("section");//document.querySelector("#s14");       
    document.body.append(this.section);

    this.oncancel = null;
    this.onok = null;
}

Dialog.prototype = {
    show : function(message, title){

    },
    confirm : function(message, title){
        
        var html = String.raw`<div class="newlecture_screen">
            <div class="newlecture_dlg">
                <div class="newlecture_title">
                    ${title}
                </div>
                <div class="newlecture_view">
                    ${message}\ntest
                </div>
                <div class="newlecture_action-panel">
                    <a href="" class="newlecture_btn btn-strong">OK</a>
                    <a href="" class="newlecture_btn newlecture_btn-cancel ml-2">CANCEL</a>
                </div>
            </div>
        </div>`;

        this.section.insertAdjacentHTML("beforeend", html);

        // var screenDiv = this.section.querySelector(".newlecture_screen");
        // Object.assign(screenDiv.style, {
        //     backgroundColor:"#0008",
        //     position:"fixed"
        // });

        var style = document.createElement("style");
        style.textContent = `.newlecture_screen{
            background-color: #0008;
            /* opacity:.6; */
            position: fixed;
            left: 0;
            top:0;
            width:100vw;
            height: 100vh;
            z-index: 100;   
        
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .newlecture_dlg{
            background-color: #fff;
            /* padding: 20px; */
            border-radius: 10px;

            position:relative;
            top:-100px;
            opacity : 0;

            transition: top .5s, opacity .5s;
        }

        .newlecture_dlg.show{
            top:0px;
            opacity: 1;
        }
        
        .newlecture_title{
            border-radius: 10px 10px 0 0;
            padding:10px;
            background-color: rgb(174, 218, 73);
            color:#fff;
        }
        .newlecture_view{
            padding: 20px;
        }
        .newlecture_action-panel{
            padding: 10px;
            border-top: 1px solid rgb(197, 197, 197);
            display: flex;
            justify-content: center;
        }
        
        .newlecture_btn {
            color: #212529;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            font-size: .9rem;
        
            border: 1px solid var(--color-bd);
            border-radius: 0.25rem;
            transition: color .15s ease-in-out,background-color .15s ease-in-out;      
            
            display: inline-block;
            padding: 0.4rem 0.9rem;    
        }
        
        .newlecture_btn:hover{
            background-color: #a8a8a8;
            border-color: #858585;
            color:#fff;
        }
        
        .btn-strong {
            color: #fff;
            background-color: #8cb34a;
            border-color: #67921e;
        }
        
        .btn-strong:hover{
            background-color: #669415;
            border-color: #67921e;
        }`;

        document.head.append(style);

        var dlgDiv = this.section.querySelector(".newlecture_dlg");
        
        setTimeout(function(){
            dlgDiv.classList.add("show");
        }, 0);
        
        var cancelButton = this.section.querySelector(".newlecture_btn-cancel");
        //var dlg = this;
        cancelButton.onclick = function(e){
            e.preventDefault();
            //console.log("취소 버튼이 눌렸습니다.");
            this.oncancel();
            this.section.remove();
            //console.log(this); // e.target
        }.bind(this);


        return true;
    }
};