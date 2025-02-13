import CalcShedule from './loan.js'

document.addEventListener('DOMContentLoaded', () => {

    const loanData = {
        amount: 10000000,
        month: 60,
        percent: 18.1
    }

    //scroll anim
    const boxes = document.querySelectorAll('.hidden');

    boxes.forEach(box => {
        const boxId = box.id;

        if (sessionStorage.getItem(`animationPlayed-${boxId}`)) {
            box.classList.remove('hidden');
        } else {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        box.classList.remove('hidden');
                        box.classList.add('visible');

                        sessionStorage.setItem(`animationPlayed-${boxId}`, 'true');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(box);
        }
    });

    // loan form insert
    const current_amount = document.querySelector('.current_amount')
    const amount = document.querySelector('#amount')

    amount.addEventListener('input', event => {
        loanData.amount = event.target.value

        const result = `${insertCommAThreeChars(event.target.value)} ֏`

        current_amount.innerText = result;

        CalcShedule(loanData, insertCommAThreeChars)
    })

    function insertCommAThreeChars(str) {
        return str.split('').reverse().join('')
            .replace(/(.{3})/g, '$1,')
            .replace(/,$/, '')
            .split('').reverse().join('')
    }

    const current_month = document.querySelector('.current_month')
    const month_count = document.querySelector('#month_count')

    month_count.addEventListener('input', event => {
        current_month.innerText = `${event.target.value} ամիս`
        loanData.month = parseInt(event.target.value)

        CalcShedule(loanData, insertCommAThreeChars)
    })

    // loan form checkbox (percent insert)
    const payday_checkbox = document.querySelector('#payday_checkbox')
    const percent_text = document.querySelector('.percent_text')

    payday_checkbox.addEventListener('input', event => {
        const value = event.target.checked ? `16.1` : '18.1'
        const output = `${event.target.checked ? `16.1` : '18.1'} %`

        loanData.percent = parseFloat(value)

        percent_text.innerText = output

        CalcShedule(loanData, insertCommAThreeChars)
    })

    // ico animation
    const iconsAnim = {
        doc_ico: lottie.loadAnimation({
            container: document.querySelector('.doc_ico'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: './animations/notes.json'
        }),

        selfie_ico: lottie.loadAnimation({
            container: document.querySelector('.selfie_ico'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: './animations/scan.json'
        }),

        money_ico: lottie.loadAnimation({
            container: document.querySelector('.money_ico'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: './animations/money.json'
        })
    }

    const MESSAGES = document.querySelectorAll('.message')

    function startAnim(element, CLASSNAME) {
        element.classList.add('message_anim')

        document.querySelector(`.${CLASSNAME}`).style.transform = 'translateY(-30%) scale(1.5)'

        iconsAnim[CLASSNAME].stop()
        iconsAnim[CLASSNAME].play()
    }

    function endAnim(element, CLASSNAME) {
        element.classList.remove('message_anim')

        document.querySelector(`.${CLASSNAME}`).style.transform = 'translateY(0%) scale(1)'
        iconsAnim[CLASSNAME].stop()
    }

    const msg_interval_st = {
        status: true,
        rec_timing: true
    }

    function timeOutSecond(iter, timestep) {
        let time = 0;
        let timeouting = { iter: null }
        const elms = {};

        MESSAGES.forEach((item, index) => {
            elms[item.getAttribute('data-ico')] = item
        })

        for (let i = 0; i <= iter; i++) {
            if (i > iter) msg_interval_st.rec_timing = false;

            let _item_ = elms[Object.keys(elms)[i]] || null;
            let _classname_ = Object.keys(elms)[i] || null;

            let _last_item_ = elms[Object.keys(elms)[i - 1]] || null;
            let _last_classname_ = Object.keys(elms)[i - 1] || null;

            if (msg_interval_st.rec_timing) {
                timeouting.iter = setTimeout(() => {
                    if (!_item_ || !_classname_) return false;

                    if (_last_item_ && _last_classname_) {
                        endAnim(_last_item_, _last_classname_)
                    }

                    startAnim(_item_, _classname_)

                    clearTimeout(timeouting.iter)
                    timeouting.iter = null
                }, time)

                time += timestep;
            }
        }
    }

    let interval;
    function messageAnimations(status = true) {
        msg_interval_st.status = status;

        if (msg_interval_st.status) {
            let first_iter = setTimeout(() => {
                timeOutSecond(3, 2500)
            }, 2000)

            interval = setInterval(() => {
                clearTimeout(first_iter);

                msg_interval_st.rec_timing = true;
                timeOutSecond(3, 3000)
                endAnim(MESSAGES[MESSAGES.length - 1], MESSAGES[MESSAGES.length - 1].getAttribute('data-ico'))
            }, 9000)
        } else {
            if (interval) clearInterval(interval);
        }
    }
    messageAnimations()

    function clock() {
        const now = new Date()
        const time = {
            hours: ('' + now.getHours()).padStart(2, 0),
            minutes: ('' + now.getMinutes()).padStart(2, 0),
            element: {
                hoursEl: document.querySelector('#digit_left'),
                minutesEl: document.querySelector('#digit_right')
            }
        }

        time.element.hoursEl.innerText = time.hours
        time.element.minutesEl.innerText = time.minutes

        const nextUpdate = 1000 - (now % 1000)
        setTimeout(clock, nextUpdate)
    }
    clock()

    const redirectingBtn = document.querySelector('.form_submit')

    redirectingBtn.addEventListener('click', () => {
        const attr = redirectingBtn.getAttribute('data-url')

        window.open(atob(attr.slice(3, attr.length)), '_blank')
    })

    const toLink = document.querySelector('.footer_link')

    toLink.addEventListener('click', () => {
        const attr = toLink.getAttribute('data-url')
        
        window.open(atob(attr.slice(3, attr.length)), '_blank')
    })
    
    const telLink = document.querySelector('#telnum')

    function isMobile () {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    }

    isMobile() ? telLink.setAttribute("href", "tel:8787") : telLink.removeAttribute("href")
})