document.addEventListener('DOMContentLoaded', () => {
    //===================BURGER===================
    function burger() {
        document.querySelector('.menu-header__icon').addEventListener('click', () => {
            document.querySelector('.menu-header__icon').classList.toggle('active');
            document.querySelector('.menu-header__menu').classList.toggle('active');
            document.body.classList.toggle('lock');
        })
    }
    burger();

    //===============TABS===============
    function tab() {
        let tabHead = document.querySelectorAll('.tab-item'),
            tabContent = document.querySelectorAll('.tab-content'),
            tabName;
        tabHead.forEach(item => {
            item.addEventListener('click', selectTabNav)
        });

        function selectTabNav() {
            tabHead.forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            tabName = this.getAttribute('data-tab-name');
            console.log(tabName);

            selectTabContent(tabName);
        }

        function selectTabContent(tabName) {
            tabContent.forEach(item => {
                console.log(item.getAttribute('data-tab-name'));
                if (item.classList.contains(tabName)) {
                    console.log('yes');
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                    console.log('no');
                }
            });
        }
    }
    tab();
    //================IBG================
    const ibg = () => {
        const bg = document.querySelectorAll('.ibg');
        for (let i = 0; i < bg.length; i++) {
            if (bg[i].querySelector('img')) {
                bg[i].style.backgroundImage = `url(${bg[i].querySelector('img').getAttribute('src')})`;
            }
        }
    };
    ibg();
    //==============FORM==============
    const form = document.querySelector('.form__body');
    form.addEventListener('submit', formSend);


    function formSend(e) {
        e.preventDefault();
        const message = {
            success: "success",
            failure: "failure",
            loading: "img/icons/ajax-loader.gif"
        };
        const req = new XMLHttpRequest();
        req.open('POST', 'https://formspree.io/f/mdopdn');
        const formData = new FormData(form);
        req.send(formData);
        req.addEventListener('load', () => {
            if (req.status === 200) {
                form.reset();
                statusMessage(form, message.success);
            } else if (req.send < 200) {
                statusLoading(form, message.loading);
            } else {
                statusMessage(form, message.failure);
            }
        });
    }

    function statusMessage(form, message) {
        form.classList.add('hide');
        const messageBox = document.createElement('div');
        messageBox.classList.add('form__message');
        messageBox.innerHTML = `
        <h3>${message}</h3>`;
        form.parentElement.append(messageBox);
        setTimeout(() => {
            messageBox.remove();
            form.classList.remove('hide');

        }, 2000);
    }

    function statusLoading(form, message) {
        form.classList.add('hide');
        const messageBox = document.createElement('img');
        messageBox.classList.add('form__message');
        messageBox.src = message;
        form.parentElement.append(messageBox);
        setTimeout(() => {
            messageBox.remove();
            form.classList.remove('hide');

        }, 2000);
    }
});