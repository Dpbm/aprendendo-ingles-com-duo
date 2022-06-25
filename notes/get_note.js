const RAW_URL = 'https://api.github.com/repos/Dpbm/aprendendo-ingles-com-duo/contents/notes/';

function createErrorElement(){
    const errorElement = document.createElement('p');
    const textNode = document.createTextNode('Erro ao tentar pegar o arquivo!')
    errorElement.appendChild(textNode);
    document.body.appendChild(errorElement);
}

function b64_to_utf8( str ) {
    return decodeURIComponent(window.atob( str ));
}

function convertMDToHTML(fileString){
    var converter = new showdown.Converter(),
    html      = converter.makeHtml(fileString);
    return html;
}



function setPageData(content,name){
    const fileString = b64_to_utf8(content);
    let html = fileString;

    if(name.includes('.md')) html = convertMDToHTML(fileString);


    document.open();
    document.write(html);
    document.close();
}



window.onload = function getNote(){
    const file = window.location.href.split('=')[1];
    const url = `${RAW_URL}${file}`;

    fetch(url)
        .then((response) => {
            if(!response.ok) {
                createErrorElement();
                return;
            }

            return response.json();
        })
        .then((responseJSON) => {
            const {content, name} = responseJSON;

            document.title = `Nota ${name}`;

            setPageData(content, name);
        })
        .catch(() => createErrorElement());
}