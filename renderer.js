// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const ler = require('read-file-utf8');
const loki = require('lokijs');
const db = new loki('db.json');
const path = require('path');
const { remote } = require('electron');
const { BrowserWindow } = remote;

async function showPackageJsonVersion() {
    const dbJson = await ler(__dirname + '/db.json').then(result => { return result })
    db.loadJSON(dbJson);
    db.save();
}

function criarTabela(conteudo) {

    var tabela = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    conteudo.map((array, i) => {
        delete array.$loki;
        delete array.meta;
        if (i === 0) {
            var tr = document.createElement("tr");
            thead.appendChild(tr)
            for (var o = 0; o < Object.keys(array).length; o++) {
                var t = document.createElement("th");
                var texto = document.createTextNode(Object.keys(array)[o]);
                t.appendChild(texto);
                tr.appendChild(t);
            }
            tbody.appendChild(tr);
        }

        var trValue = document.createElement("tr");
        thead.appendChild(trValue);
        for (var o = 0; o < Object.keys(array).length; o++) {
            var td = document.createElement("td");
            var texValue = document.createTextNode(Object.values(array)[o]);
            td.appendChild(texValue);
            trValue.appendChild(td);
        }
        tbody.appendChild(trValue);

    })
    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    tabela.classList.add('table-striped')
    return tabela;
}

window.onload = function () {
    showPackageJsonVersion().finally(() => {
        const clientesData = db.getCollection('clientes');
        document.getElementById("tabela").appendChild(criarTabela(clientesData.data))
    })
    const button = document.getElementById('open');
    button.addEventListener('click', () => {
        createBrowserWindow();
    });

}



function createBrowserWindow() {
    let win = new BrowserWindow({
        width: 600,
        height: 400,
        hasShadow: true,
        modal: true,
        show:true,
        autoHideMenuBar:true,
        frame:true,
        webPreferences: {
            accessibleTitle: 'CadastroCliente',
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preloadCadastroCliente.js')
        }
    })

    win.loadFile('modalEditar.html')
    win.on('close', function () { 
        win = null;
        console.log(BrowserWindow.getAllWindows()[1].reload())
     })
}