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

    })


    const downloadFromMega = (href) => {
        const iframe = document.createElement('iframe');
        iframe.src = href + "&output=embed";
        document.body.appendChild(iframe);
    }

    const downloadFromLink = (href) => {
        const link = document.createElement('a');
        link.href = href;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    downloadBtn.addEventListener('click', (e) => {
        if(!links.length){
            alert('В тексте не нашлось валидных ссылок');
            return;
        }

        let index = 0 ;

        const startDownload = () => {
            const currentLink = links[index];
            if(currentLink.includes('mega')){
                downloadFromMega(currentLink);
            }else{
                downloadFromLink();
            }
            index++;
            setTimeout(startDownload, 1300);
            if(index === links.length){
                alert('Скачено');
                index = 0;
            }

        }

        startDownload();
    })

})
