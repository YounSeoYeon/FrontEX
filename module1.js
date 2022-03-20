import exam from "./module2.js";



export default function test(){
    console.log("module1 test function");
}

export function test1(){
    console.log("module1 test1 function");
    console.log(exam.total());
}

export function test2(){
    console.log("module1 test2 function");
}