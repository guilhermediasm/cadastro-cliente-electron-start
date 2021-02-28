const { remote } = require('electron');
const { BrowserWindow } = remote;
const ler = require('read-file-utf8');
const loki = require('lokijs');
const db = new loki('db.json');

window.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#salvar').addEventListener('click', (e) => {
        e.preventDefault();
        //alert(document.querySelector('#nome').value)
        let data = {
            nome: document.querySelector('#nome').value,
            cpf: document.querySelector('#cpf').value,
            telefone: document.querySelector('#telefone').value
        }
        const response = doesFileExist(__dirname + '/db.json');

        if (response) {
            ler(__dirname + '/db.json').then(dbJson => {
                db.loadJSON(dbJson);

                saveClienteCollection(data);

            })
        } else {
            saveClienteCollection(data);
        }

    })

    document.querySelector('#close').addEventListener('click', (e) => {
        e.preventDefault();

        BrowserWindow.getAllWindows()[0].close();

    })
})

function saveClienteCollection(data) {
    try {
        const clientes = db.addCollection('clientes');
        clientes.insert(data);
        db.save();
        alert('Salvo com sucesso')
        document.querySelector('#cadastro-cliente').reset()
    } catch (error) {
        console.log(error)
    }
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);

    try {
        xhr.send();
        console.log("File exists");
        return true;

    } catch (error) {
        console.log("File doesn't exist");
        return false;
    }

}