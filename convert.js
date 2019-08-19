function convertYearToJapaneseEra(year, month, day){

    let rtJapaneseEra;
    let rtYear;
    let varYearArray = getYearArray();

    if(!numberFormatCheck(year)){
        return 'INVALID : NUMBERFORMAT YEAR';
    }
    if(!numberFormatCheck(month)){
        return 'INVALID : NUMBERFORMAT MONTH';
    }
    if(!numberFormatCheck(day)){
        return 'INVALID : NUMBERFORMAT DAY';
    }
    if(!checkDateFormat(year, month, day)){
        return 'INVALID : INCOLLECT DATE';
    }

    if (month.length < 2){
        month = '0' + month;
    }
    if (day.length < 2){
        day = '0' + day;
    }

    for (var i = 0; i < varYearArray.length; i++){
        if(parseInt(varYearArray[i].startDate) <= parseInt(year + month + day)){
            rtJapaneseEra = varYearArray[i].japaneseEra;
            rtYear = parseInt(year) - parseInt(varYearArray[i].startDate.substr(0, 4)) + 1;
            break;
        }
    }

    return rtJapaneseEra + rtYear + '年' + month + '月' + day + '日';

}


function convertJapaneseEraToYear(japaneseEra, year, month, day){

    let rtYear;
    var varYearArray = getYearArray();

    // format check
    if (!checkJapaneseEra(japaneseEra)){
        return 'INVALID : Japanese Era';
    }
    if(!numberFormatCheck(year)){
        return 'INVALID : NUMBERFORMAT YEAR';
    }
    if(!numberFormatCheck(month)){
        return 'INVALID : NUMBERFORMAT MONTH';
    }
    if(!numberFormatCheck(day)){
        return 'INVALID : NUMBERFORMAT DAY';
    }

    for(var i = 0; i < varYearArray.length; i++){
        if(japaneseEra == varYearArray[i].japaneseEra){
            rtYear = parseInt(varYearArray[i].startDate.substr(0, 4)) - 1 + parseInt(year);
            break;
        }
    }

    if (month.length < 2){
        month = '0' + month;
    }
    if (day.length < 2){
        day = '0' + day;
    }

    if(!checkDateFormat(rtYear, month, day)){
        return 'INVALID : INCOLLECT DATE';
    }

    return rtYear + '年' + month + '月' + day + '日';

}

function checkJapaneseEra(japaneseEra){

    var varYearArray = getYearArray();

    let japaneseEraList = [];
    for(var i = 0; i < varYearArray.length; i++){
        japaneseEraList.push(varYearArray[i].japaneseEra);
    }

    if (japaneseEraList.indexOf(japaneseEra) < 0){
        return false;
    }
    return true;
}

function numberFormatCheck(value){

    if (isNaN(value)){
        return false;
    }
    return true;
}

function checkDateFormat(year, month, day){

    let varYear = parseInt(year);
    let varMonth = parseInt(month);
    let varDay = parseInt(day);

    if (!(1 <= month && month <= 12 && 1 <= day && day <= 31)){
        return false;
    }
    
    let varDate = new Date(year, parseInt(month) -1, day);
    let dateMonth = varDate.getMonth() + 1
    if(varMonth != dateMonth ){
        return false;
    }

    return true;

}

function getYearArray(){

    var yearArray = [
        {
            japaneseEra : '令和'
            ,startDate : '20190501'
        },
        {
            japaneseEra : '平成'
            ,startDate : '19890108'
        },
        {
            japaneseEra : '昭和'
            ,startDate : '19261225'
        },
        {
            japaneseEra : '大正'
            ,startDate : '19120730'
        },
        {
            japaneseEra : '明治'
            ,startDate : '18680125'
        }
    ];

    return yearArray;

}