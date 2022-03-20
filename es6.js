import t,{test2,test1} from "./module1.js";
import exam3,{test1 as m2test1, Exam as Exam2} from "./module2.js";


class DataService{    
    getList(callback){
        return new Promise(function(resolve, reject){
            // 데이터 요청하기
            setTimeout(function(){
                let result = {
                    count:123,
                    list:[
                        {id:1, title:"제목1"},
                        {id:2, title:"제목2"},
                        {id:3, title:"Hello1"},
                        {id:4, title:"Hello2"},
                        {id:5, title:"하하"}
                    ]
                };

                resolve(result);
                //reject(3);

            },100);
        });
    }
}


// ===============================================


let exam5 = {
    kor:10,
    eng:20,
    math:30,
    total(){
        return this.kor+this.eng+this.math;
    }
};

console.log(exam5.kor);
console.log(exam5.kor = 40);
console.log(exam5.total());

let exam5Proxy = new Proxy(exam5, {
    get(target, prop){   
        
        if(prop === "total")
            console.log("before check");
        //return target[prop];
        return Reflect.get(target, prop);
        //return target[prop];
        //return 100000000000;
    },
    set(target, prop, value){
        if(prop === "kor")
            if(value > 100){
                target[prop] = 100;
                return true;
            }

        target[prop] = value;
        return true; 
    }
});

console.log(exam5Proxy.kor);        // get(){}
console.log(exam5Proxy.eng);        // get(){}
exam5Proxy.kor = 400;  // set(){}
console.log(`total : ${exam5Proxy.total()}`);    // get(){}



console.log("=============================================");
// =============================================

exam3.kor = 10000;
console.log(exam3.total());// total 10070

t();
test1(); // total 10070
m2test1();

let exam2 = new Exam2();
console.log(exam2.total());
// -----------------------------------


// greeting(); // 각국 또는 각 객체의 인삿말을 출력하는 목적으로 사용

const greeting = Symbol();


class A{
    [greeting](){
        console.log("Hello");
    }    
}

class B{
    [greeting](){
        console.log("안녕하세요");
    }    
}

class C{
    greeting(){
        return 20;
    }
}

let a = new A();
let b = new B();
let c = new C();

// let objs = [a,b,c];
// for(let ob of objs)
//     console.log(ob[greeting]());

console.log("=========================");

let map1 = new Map();
map1.set("id", 1);
map1.set("title", "hello");
map1.set("writerId", "newlec");

let it = map1.keys();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);

for(let v of map1.keys())
    console.log(v);

// ---------------------------

class Exam{
    #kor;
    #eng;
    #math;
    #data;
    
    constructor(kor=30, eng=0, math){
        this.#kor = kor;
        this.#eng = eng;
        this.#math = math || 0;
        this.#data = [3,2,3,4,4];
    }

    get kor(){
        return this.#kor;
    }

    set kor(value){
        this.#kor = value;
    }

    get eng(){
        return this.#eng;
    }

    set eng(value){
        this.#eng = value;
    }

    get math(){
        return this.#math;
    }

    set math(value){
        this.#math = value;
    }

    total(){
        console.log(`kor:${this.#kor}, eng:${this.#eng}, math:${this.#math}`);
        return this.#kor + this.#eng + this.#math;
    }

    // static #Iterator = class{
    //     #index;
    //     #outer;
    //     constructor(outer){
    //         this.#index = -1;
    //         this.#outer = outer;
    //     }
    //     next(){
    //         this.#index++;
    //         switch(this.#index){
    //         case 0:
    //             return this.#outer.#kor;
    //         case 1:
    //             return this.#outer.#eng;
    //         case 2:
    //             return this.#outer.#math;
    //         case 3:
    //             return undefined;
    //         };
    //     }
    // };
    // iterater(){
    //     return new Exam.#Iterator(this);
    // }
    
    
    *iterator(){
        for(let v of this.#data)
            yield v;

        // yield this.#data[0];
        // yield this.#data[1];
        // yield this.#data[2];
        // yield this.#data[3];
        // yield this.#kor;
        // yield this.#eng;
        // yield this.#math;
    }
}
let exam1 = new Exam(10,20,30);
let iter = exam1.iterator();

for(let v of exam1.iterator())
    console.log(v);

// console.log(`iter.next():${iter.next().value}`);
// console.log(`iter.next():${iter.next().value}`);
// console.log(`iter.next():${iter.next().value}`);
// console.log(`iter.next():${iter.next().value}`);

class NewlecExam extends Exam{
    #com=0;

    constructor(kor, eng, math, com){
        super(kor, eng, math);
        this.#com = com;
    }

    //override
    total(){
        return super.total() + this.#com;
    }
}

let exam = new NewlecExam(10,10,10,10);




//exam.setKor(100);
//exam.setKor(exam.getKor()+1);
//exam.kor = 200;
//exam.kor++;
//console.log(`exam.kor is ${exam.#kor}`);
console.log(`total is ${exam.total()}`);

console.log(Exam.prototype.tot);

for(let key in exam)
    console.log(`key:${key}`);



function TestExam(){
    this.f1 = ()=>{
        console.log("f1");
    };

    this.f2 = function(){
        console.log("f2");
    };
}

let testExam = TestExam();
console.log(window.f1);

for(let key in testExam)
    console.log(key);


console.log("-----------------------------------");

function getValue(x){
    return 30*x;
}

function print(x=10, y=x+3, ...args){
    console.log(x);
    console.log(y);
    console.log(args);

    console.log(`arguments.length : ${arguments.length}`);
    console.log(`arguments[0] : ${arguments[0]}`);
}

print(undefined);
print(2,3);
print(2,3,4,5,6,7);


console.log("-----------------------------------");


let set = new Set([2,3,4,5,3,4,5,7]);

set.forEach(function(value, key){
    console.log(`key:${key},value:${value}`);
});

// for(let key in set)
//     console.log(key);
for(let value of set)
    console.log(value);
console.log("-----------------------------------");

let map = new Map();
map
.set("id", 1)
.set("title", "map 이란?");

console.log(map.size);
console.log(map.get("title"));
// map.delete("id");
// console.log(map.size);
// map.clear();
// console.log(map.size);
// console.log(map.has("title"));

map.forEach(function(value, key){
    console.log(`key:${key},value:${value}`);
});

for(let value of map.values())
    console.log(`value:${value}`);

for(let key of map.keys())
    console.log(`key:${key}`);

for(let arr of map.entries())
    console.log(`key:${arr[0]},value:${arr[1]}`);

// let [a,b] = [2,3];

for(let [key, value] of map.entries())
    console.log(`key:${key},value:${value}`);

