exports.getDate= function () {
    var today = new Date();
    var option={
        hour: 'numeric',
        hour12: false,
        minute:'numeric'
    }
    return today.toLocaleDateString("en-IN",option);
}

exports.getDay= function () {
    var today = new Date();
    var option={
        weekday:"long"
    }
    return today.toLocaleDateString("en-IN",option);
}
