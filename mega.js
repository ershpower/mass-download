import {File} from 'https://unpkg.com/megajs/dist/main.browser-es.mjs'

document.addEventListener('DOMContentLoaded', () => {

    const textAreaMega = document.getElementById('mega-link-textarea');
    const downloadBtnMega = document.getElementById('download-btn-mega')

    const links = [];

    textAreaMega.addEventListener('change', (e) => {
        const value = e.target.value;
        const data = linkify.find(value);
        links.length = 0;
        data.forEach(item => {
            links.push(item.href);
        })
    })

    downloadBtnMega.addEventListener('click', () => {

        if (!links.length) {
            alert('В тексте не нашлось валидных ссылок');
            return;
        }

        let index = 0;

        const downloadNext = () => {

            if (index < links.length) {
                const fileLink = links[index];
                const [, fileId, fileKey] = fileLink.match(/\/file\/([a-zA-Z0-9_-]+)#([a-zA-Z0-9_-]+)/);

                const file = new File({
                    downloadId: fileId,
                    key: fileKey
                });

                file.loadAttributes((err, file) => {
                    if (err) {
                        console.error('Ошибка при загрузке атрибутов файла:', err);
                        return;
                    }

                    console.log(`Скачивание файла: ${file.name}`);

                    file.download((err, data) => {
                        if (err) {
                            console.error('Ошибка при скачивании:', err);
                            return;
                        }

                        const blob = new Blob([data], {type: 'application/octet-stream'});
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = file.name;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    });
                });
                index++;
                setTimeout(downloadNext, 1000)
            }
        }

        downloadNext();
    })
})