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
    const form = document.querySelectorAll('.form__body');
    form.forEach(item => {
        item.addEventListener('submit', function formSend(e) {
            e.preventDefault();
            const message = {
                success: "success",
                failure: "failure",
                loading: "img/icons/ajax-loader.gif"
            };
            const statusLoading = document.createElement('img');
            statusLoading.classList.add('form__message');
            statusLoading.src = message.loading;
            item.append(statusLoading);
            const req = new XMLHttpRequest();
            req.open('POST', 'https://formspree.io/f/mdopdnbb');
            const formData = new FormData(item);
            req.send(formData);
            req.addEventListener('load', () => {
                if (req.status === 200) {
                    item.reset();
                    statusLoading.remove();
                    setTimeout(() => {
                        closeModal();
                    }, 1000)
                    statusMessage(item, message.success);
                } else {
                    statusLoading.remove();
                    item.reset();
                    statusMessage(item, message.failure);
                }
            });
        });
    })



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
    //===============MODAL===============
    const modalWindow = document.querySelector('.modal'),
        contactBtn = document.querySelectorAll('.content__link')[0],
        closeBtn = document.querySelector('.modal__close');
    contactBtn.addEventListener('click', openModal);
    modalWindow.addEventListener('click', (e) => {
        if (e.target == modalWindow || e.target.classList.contains('modal__close')) {
            closeModal()
        }
    });

    function openModal() {
        modalWindow.classList.remove('hide');
        document.body.classList.add('lock');
    }

    function closeModal() {
        modalWindow.classList.add('hide');
        document.body.classList.remove('lock');

    }
});