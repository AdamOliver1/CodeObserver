const CodeBlock = require('../models/CodeBlock')

exports.initCodeBlocks = async () => {
  // initial data
  let codeblocks = await CodeBlock.find();
  if (codeblocks.length == 0) {
    const titles = ['Fibonacci loops', 'Recursion', 'Strings', 'Math', 'Bubble Sort']
    const solutions = [
      `// program to generate fibonacci series up to n terms

        // take input from the user
        const number = parseInt(prompt('Enter the number of terms: '));
        let n1 = 0, n2 = 1, nextTerm;
        
        console.log('Fibonacci Series:');
        
        for (let i = 1; i <= number; i++) {   
            nextTerm = n1 + n2;
            n1 = n2;
            n2 = nextTerm;
        }`,
      `//Convert Binary to Decimal using recursion

        const test = (n) => {
            if (n === 0 || n === 1) 
            {
              return String(n)
            }
            return test(Math.floor(n / 2)) + String(n % 2)
          }`,
      `function string_reverse(str) 
          {
              return str.split("").reverse().join("");
          }`,
      `// Convert Celsius to Fahrenheit 
          function convertToF(celsius) {
            return celsius * 9/5 + 32
          }`,
      `function bubbleSort(array){
            for(var i = 0; i <= array.length-1; i++){             
                for(var j = 0; j < ( array.length - i -1); j++){
                    if(array[j] > array[j+1]){
                    var temp = array[j]
                    array[j] = array[j + 1]
                    array[j+1] = temp
                    }
                }
            }
            return array;
        }`



    ]
    const codes = [
      `// program to generate fibonacci series up to n terms

        // take input from the user
        const number = parseInt(prompt('Enter the number of terms: '));
        let n1 = 0, n2 = 1, nextTerm;
        
        console.log('Fibonacci Series:');
        //
        for (let i = 1; i <= number; i++) {         
            nextTerm = n1 + n2;
            n1 = n2;
            n2 = nextTerm;
        }`,
      `//Convert Binary to Decimal using recursion
        //
        const test = (n) => {
            if (n === 0 || n === 1) 
            {
              return String(n)
            }
            return test(Math.floor(n / 2)) + String(n % 2)
          }`,
      `function string_reverse(str) 
          {//
              return str.split("").reverse().join("");
          }`,
      `// Convert Celsius to Fahrenheit 
          function convertToF(celsius) {
            return celsius * 9/5 + 32//
          }`,
      `function bubbleSort(array){
            for(var i = 0; i <= array.length-1; i++){             
                for(var j = 0; j < ( array.length - i -1); j++){
                    if(array[j] > array[j+1]){
                    var temp = array[j]
                    array[j] = array[j + 1]
                    array[j+1] = temp
                    }//
                }
            }
            return array;
        }`
    ]

    for (let i = 0; i < titles.length; i++) {
      const codeblock = new CodeBlock({ title: titles[i], code: codes[i], solution: solutions[i] });
      await codeblock.save();
    }
  }
}

exports.getCodeBlocks = async () => {
  const codes = await CodeBlock.find();
  return codes;
}

exports.findById = async (id) => {
  return await CodeBlock.findById(id);

}