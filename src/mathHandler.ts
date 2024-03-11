//千分為標點符
export const toThousands = (number: number) => {
    let numStr = Math.abs(number || 0).toString(); // 取絕對值處理負數
    let parts = numStr.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1] || "";
  
    let result = "";
    while (integerPart.length > 3) {
      result = "," + integerPart.slice(-3) + result;
      integerPart = integerPart.slice(0, integerPart.length - 3);
    }
  
    if (number < 0) {
      result = "-" + integerPart + result; // 加回負號
    } else {
      result = integerPart + result;
    }
  
    return decimalPart ? result + "." + decimalPart : result;
  };