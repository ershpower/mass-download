document.addEventListener('DOMContentLoaded', () => {

    const textareaNode = document.getElementById('textarea');
    const downloadBtn = document.getElementById('downloadBtn');

    const links = [];

    textareaNode.addEventListener('change', (e) => {
        const value = e.target.value;
        const data = linkify.find(value);
        links.length = 0;
        data.forEach(item => {
            links.push(item.href);
        })

        console.log(links)

    })


    // const downloadFromMega = (href) => {
    //     const iframe = document.createElement('iframe');
    //     iframe.src = href + "&output=embed";
    //     document.body.appendChild(iframe);
    // }
    //
    // const downloadFromLink = (href) => {
    //     console.log(href)
    //     const link = document.createElement('a');
    //     link.href = href;
    //     link.setAttribute('download', "");
    //     link.style.display = 'none';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //
    // }

    downloadBtn.addEventListener('click', (e) => {
        if(!links.length){
            alert('В тексте не нашлось валидных ссылок');
            return;
        }

        let index = 0 ;

        function downloadNext() {
            if (index < links.length) {
                const link = document.createElement('a');
                link.href = links[index];
                link.setAttribute('download', ''); // Установка атрибута для скачивания
                link.style.display = 'none';
                document.body.appendChild(link); // Добавляем ссылку в DOM
                link.click(); // "Кликаем" по ссылке для скачивания
                document.body.removeChild(link); // Удаляем ссылку из DOM
                index++;
                setTimeout(downloadNext, 1000); // Устанавливаем задержку 500 мс между загрузками
            }
        }

        downloadNext();
    })

})
