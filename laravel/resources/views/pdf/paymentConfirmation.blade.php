<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Example 1</title>
    <link rel="stylesheet" href="style.css" media="all" />
</head>
<body>
<header class="clearfix">
    <div id="logo">
        <img src="./images/logo.png">
    </div>
    <h1>Confirmation de paiement</h1>
    <div id="company" class="clearfix">
        <div>RedCloud Sàrl</div>
        <div>Route de la Tambourine 17 <br /> 1227 Carouge</div>
        <div>079.666.33.22</div>
        <div><a href="mailto:redcloud@redcloud.com">redcloud@redcloud.com</a></div>
    </div>
    <div id="project">
        <div><span>Sujet</span>Inscription </div>
        <div><span>CLIENT</span>{{$userName}}</div>
        <!--<div><span>ADDRESS</span></div>-->
        <div><span>EMAIL</span> <a href="mailto:john@example.com">{{$userMail}}</a></div>
        <div><span>DATE</span> .......</div>
    </div>
</header>
<main>
    <table>
        <thead>
        <tr>
            <th class="service">Statut</th>
            <th class="desc">Nom du tournoi</th>
            <th>Date du tournoi</th>
            <th>Heure de début</th>
            <th>Montant</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td class="service">Payé</td>
            <td class="desc">{{$tournoiNom}}}</td>
            <td >{{$dateTournoi}}</td>
            <td >{{$heureTournoi}}</td>
            <td >{{$tournoiPrix}}</td>
        </tr>
        <tr>
            <td colspan="4" class="grand total">TOTAL PAYÉ</td>
            <td class="grand total">{{$tournoiPrix}}</td>
        </tr>
        </tbody>
    </table>
    <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">Il vous est possible d'annuler votre inscription à ce tournoi au plus tard 2 jours avant son commencement.</div>
    </div>
</main>
<footer>
    Ce mail fait office de preuve de paiement. En cas de problème, merci de nous contacter par mail.
</footer>
</body>
</html>