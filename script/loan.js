export default function CalcShedule({ percent, month, amount }, insertCommAThreeChars) {

    percent = (percent / 100) / 12    

    let K = (percent * Math.pow((1 + percent), month)) / (Math.pow((1 + percent), month) - 1);
    let month_Payment = Math.round(amount * K) + '';

    document.querySelector('.monthly_fee_text').innerText =
    `${insertCommAThreeChars(month_Payment)} ֏`
}