const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const mongoose = require('mongoose');
// const AdminBro = require('admin-bro');
// const AdminBroExpress = require('@admin-bro/express');
// const AdminBroMongoose = require('@admin-bro/mongoose');





const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
// AdminBro.registerAdapter(AdminBroMongoose);

// const adminBro = new AdminBro({
//   databases: [mongoose],
//   rootPath: '/admin',
// });

// const router = AdminBroExpress.buildRouter(adminBro);
// app.use(adminBro.options.rootPath, router);



app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/nos-formations', (req, res) => {
    res.render('nos-formations');
  });

  app.get('/comment-ca-marche', (req, res) => {
    res.render('comment-ca-marche');
  });

  app.get('/contact', (req, res) => {
    res.render('contact');
  });
  
app.get('/boucherie-charcuterie-traiteur', (req, res) =>{
    res.render('boucherie-charcuterie-traiteur');
});

app.get('/boulangerie-patisserie', (req, res) =>{
    res.render('boulangerie-patisserie');
});

app.get('/bureautique', (req, res) =>{
    res.render('bureautique');
});

app.get('/management', (req, res) =>{
    res.render('management');
});

app.get('/langues', (req, res) =>{
    res.render('langues');
});

app.get('/poissonnerie', (req, res) =>{
    res.render('poissonnerie');
});

app.get('/chocolaterie', (req, res) =>{
    res.render('chocolaterie');
});

app.get('/epicerie-superette', (req, res) =>{
    res.render('epicerie-superette');
});

app.get('/haccp-duerp', (req, res) =>{
    res.render('haccp-duerp');
});

function envoyerEmail(destinataire, sujet, contenu) {
    // Configuration du transporteur de messagerie
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jeremy.simha@gmail.com',
            pass: 'ebwc ybsd arvy lgwn'
        }
    });

    // Options du message
    const mailOptions = {
        from: 'jeremy.simha@gmail.com',
        to: destinataire,
        subject: sujet,
        text: contenu
    };

    // Envoi du mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email envoyé: ' + info.response);
        }
    });
}

app.post('/submit_form', (req, res) => {
    const nom = req.body.nom;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const message = req.body.message;

    // Envoyer un e-mail à l'administrateur
    const sujetAdmin = 'Nouveau formulaire de contact soumis';
    const contenuAdmin = `Nom: ${nom}\nEmail: ${email}\nTéléphone: ${telephone}\nMessage:\n${message}`;
    envoyerEmail('jeremy.simha@gmail.com', sujetAdmin, contenuAdmin);

    // Envoyer un e-mail au client
    const sujetClient = 'Demande de rappel prise en compte';
    const contenuClient = 'Nous avons bien reçu votre demande de rappel. Nous vous contacterons bientôt.';
    envoyerEmail(email, sujetClient, contenuClient);

    // Réponse à la requête du formulaire
    res.send('Formulaire soumis avec succès.');
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});

 






