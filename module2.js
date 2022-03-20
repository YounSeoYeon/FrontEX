export function test(){
    console.log("module2 test function");
}

export function test1(){
    console.log("module2 test1 function");
}

// 함수를 제공
// 클래스를 제공

export class Exam{
    constructor(){
        this.kor = 0;
        this.eng = 30;
        this.math = 40;       
    }

    total(){
        return this.kor+this.eng+this.math;
    }
}

// 객체를 제공
export default new Exam();