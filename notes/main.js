const API_URL = 'https://api.github.com/repos/Dpbm/aprendendo-ingles-com-duo/git/trees/master?recursive=1';
const FILES_TO_IGNORE = new Set([
    'styles.css',
    'main.js',
    'index.html',
    'assets',
    'note.html',
    'get_note.js'
]);

let created = false;

const secondSection = document.getElementById('secondSection');



function createErrorElement(){
    if(created) return;

    const errorElement = document.createElement('p');
    const textNode = document.createTextNode('Erro ao tentar pegar os arquivos!')
    errorElement.appendChild(textNode);
    secondSection.appendChild(errorElement);

    created = true;
}


function createListOfNotes(tree){
    if(created) return;

    const title = document.createElement('h1');
    const titleTextNode = document.createTextNode('Arquivos de anotação');
    title.appendChild(titleTextNode);
    secondSection.appendChild(title);

    const ulList = document.createElement('ul');

    tree.forEach((node) => {
        const splicedNode = node.path.split('/');

        if(splicedNode.length < 2 || splicedNode[0] != 'notes' || FILES_TO_IGNORE.has(splicedNode[1])) return;

        const liElement = document.createElement('li');
        const liElementText = document.createTextNode(splicedNode[1]);
        const aTag = document.createElement('a');
        aTag.setAttribute('href', `${window.location}note.html?note=${splicedNode[1]}`);
        liElement.appendChild(liElementText);
        aTag.appendChild(liElement);
        ulList.append(aTag);
        
    })

    secondSection.appendChild(ulList);


    created = true;
}


window.onload = function getFiles(){


   fetch(API_URL)
        .then((response) => {
            if(!response.ok) {
                createErrorElement();
                return;
            }

            return response.json();
        })
        .then((responseJSON) => {
            const {tree} = responseJSON;
            createListOfNotes(tree);
            
        })
        .catch(() => createErrorElement());
        
        

       
}