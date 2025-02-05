const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");

describe ('',()=>{

    test("",() =>{
        try{
            let result = isEven(4);
        }
        catch(e){
            expect(e).not.toBeNull();
            expect(e.message).toBe("Input must be a number");
        } 
    });


    test("",() =>{
        expect(isEven(4)).toBe(true);
    });
})

describe ('',()=>{

    test("",() =>{
        try{
            let result = calculateTotalPrice(4);
        }
        catch(e){
            expect(e).not.toBeNull();
            expect(e.message).toBe("Prices must be an array");
        } 
    });

    test("",() =>{
        try{
            let result = calculateTotalPrice(4);
        }
        catch(e){
            expect(e).not.toBeNull();
            expect(e.message).toBe("Prices must be an array");
        } 
    });


})

