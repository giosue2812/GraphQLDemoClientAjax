const xhrBooks = new XMLHttpRequest();

xhrBooks.open(
    "POST",
    "http://localhost:3000/graphql",
    true);
xhrBooks.setRequestHeader(
    "Content-Type",
    "Application/json");

let queryBooks = {query:`{
    livres:books{
        Titre:titre,
        Auteur:author{
            Nom:name
        }
    }
}`}

xhrBooks.onreadystatechange = function () {
    if(xhrBooks.readyState === XMLHttpRequest.DONE && xhrBooks.status === 200){
        let div = document.getElementById('booksListe');
        let ul = document.createElement('ul');
        div.appendChild(ul);

        const result = JSON.parse(xhrBooks.responseText);

        result.data.livres.forEach(function(item){
            let li = document.createElement('li');
            li.innerHTML = item.Titre + ": L'auteur de ce livre est: " + item.Auteur.Nom;
            ul.appendChild(li)
        })
    }
}

function sendNewBook(book,author) {
    if(book !== "" && author !== ""){
        let authorID = 0
        const XHRaddBook = new XMLHttpRequest();
        XHRaddBook.open(
            "POST",
            "http://localhost:3000/graphql",
            true);
        XHRaddBook.setRequestHeader("Content-Type","application/json");
        let addBook = {query:`mutation{
            addBook(titre:"${book}",name:"${author}"){
                titre
            }
        }`
        }
        XHRaddBook.onreadystatechange = function () {
            if(XHRaddBook.readyState === XMLHttpRequest.DONE && XHRaddBook.status === 200){
                const result = JSON.parse(xhrBooks.responseText);
                let div = document.getElementById("book");
                let p = document.createElement("p");
                div.appendChild(p);
                p.innerHTML = "Le livre est crée: " + book;
            }
        }
        XHRaddBook.send(JSON.stringify(addBook));
    }
}
xhrBooks.send(JSON.stringify(queryBooks));
