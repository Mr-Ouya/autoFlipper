var expect = require("chai").expect;

describe("canary test", function() {
  function selectNameState  (name) {
    var optionS;
        switch (name){
          case 0:
            name.val() === "Make";
            break;
          case 1:
            name.val() === "Model";
            break;
          case 2:
            name.val() === "Year";
            break;
          case 3:
             name.val() === "Year";
             break;
          case 4:
             name.val() === "Price";
             break;
          case 5:
              name.val() === "Price";
             break;
          
        }
  
  }

  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});
