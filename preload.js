// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
//const DataStore = require("./dataStore");
const loki = require('lokijs');
const db = new loki('db.json');
const clientes = db.addCollection('clientes');


window.addEventListener('DOMContentLoaded', () => {
  //console.log(electron)
  //openModal()

  /*   document.querySelector('#salvar').addEventListener('click', (e) => {
      e.preventDefault();
      //alert(document.querySelector('#nome').value)
      let data = {
        nome: document.querySelector('#nome').value,
        cpf: document.querySelector('#cpf').value,
        telefone: document.querySelector('#telefone').value
      }
      clientes.insert(data);
      db.save();
      alert('Salvo com sucesso')
      document.querySelector('#cadastro-cliente').reset()
    }) */
})


