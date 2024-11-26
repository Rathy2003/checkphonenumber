$(document).ready(function () {
    try {
        let newNumber  = checkPhoneNumber("96 50 51014");
        console.log(newNumber);  
    } catch (error) {
        console.log(error.message);
    }
});

function checkPhoneNumber(number){ // function to check valid or invalid phone number and organize phone number.
    if(/^[\d\s\+]{8,}$/.test(number)){ // check is phone number or url

        let countryCode = isHaveCountryCode(number); // get country code. ex: 855 or +855

        if(countryCode){ // get country code is 855 or +855
            let tempNumber = number.substring(countryCode.length);
            // check if have country code and phone number start with 0
            if(tempNumber.trim().substring(0,1) == "0"){
                // if contains 0 after 855 remove 0 and replace by space
                number = `${countryCode.length == 3 ? `+${countryCode}`: `${countryCode}`} ${tempNumber.trim().substring(1)}`;
                
            }else{
                 // if not contain 0 after 855 add space between country code and phonenumber
                 number = `${countryCode.length == 3 ? `+${countryCode}`: `${countryCode}`} ${tempNumber.trim()}`
            }            
        }else{ // num start with zero
            if(/^\d$/.test(number.trim().substring(0,1))){ // check fist character is digit or not
                if(number.trim().substring(0,1) != "0"){
                    number = `0${number.trim()}`; // if don't have number 0 at first position add one on first postion.
                }      
            }else{
                throw new Error("Invalid Phone Number");
            }
        }
        return number;
    }else{
        throw new Error("Invalid Phone Number");
    }
    function isHaveCountryCode(phonenumber){ // function to check have country code or not.
       const countryCodePattern = /(\+?855)/;
       if(countryCodePattern.test(phonenumber))
       {
        return countryCodePattern.exec(phonenumber)[0]; // return search array results.
       }
       return false;
    }
}