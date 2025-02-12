[
    document.querySelector('#amount'),
    document.querySelector('#month_count')
]
    .forEach(item => {
        item.addEventListener('input', function () {
            const value = this.value;
            const max = this.max;
            const min = this.min;
            const percentage = ((value - min) / (max - min)) * 100;

            this.style.background = `linear-gradient(to right, #0084ff, #002fff ${percentage}%, #cdd5e7 ${percentage}%)`;
        })
    })