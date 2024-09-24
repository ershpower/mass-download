document.addEventListener('DOMContentLoaded', () => {

    const textareaNode = document.getElementById('direct-link-textarea');
    const downloadBtn = document.getElementById('download-btn');

    const links = [];

    textareaNode.addEventListener('change', (e) => {
        const value = e.target.value;
        const data = linkify.find(value);
        links.length = 0;
        data.forEach(item => {
            links.push(item.href);
        })
    })
    downloadBtn.addEventListener('click', (e) => {
        if (!links.length) {
            alert('В тексте не нашлось валидных ссылок');
            return;
        }
        let index = 0;

        function downloadNext() {
            if (index < links.length) {
                const link = document.createElement('a');
                link.href = links[index];
                link.setAttribute('download', '');
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                index++;
                setTimeout(downloadNext, 1000);
            }
        }
        downloadNext();
    })
})
