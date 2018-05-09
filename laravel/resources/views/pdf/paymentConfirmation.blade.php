<!DOCTYPE html>
<html lang="en">
<style>
    #clearfix::after {
        content: "";
        display : table;
        clear: both;
        margin-left: 68px;
        padding-left: 68px;
    }


    #addCompany {
        display: flex;
        float:right;
        justify-content: flex-end;
    }

    a {
        color: #5D6975;
        text-decoration: underline;
    }

    body {
        position: relative;
        width: 21cm;
        height: 29.7cm;
        margin: 0 auto;
        color: #001028;
        background: #FFFFFF;
        font-family: Arial, sans-serif;
        font-size: 12px;
        font-family: Arial;
    }

    header {
        padding-bottom: 10px;
        margin-right: 50px;
        margin-left: 150px;
    }

    #logo {
        text-align: right;
        margin-bottom: 50px;
        margin-right: 35px;
        margin-top: 100px;
    }

    #logo img {
        width: 90px;}

    h1 {
        border-top: 1px solid  #5D6975;
        border-bottom: 1px solid  #5D6975;
        color: #5D6975;
        font-size: 2.4em;
        line-height: 1.4em;
        font-weight: normal;
        text-align: center;
        background: url(../../resources/views/pdf/dimension.png);
        width: 630px;
        margin-left: 130px;
        margin-right: 57px;
    }

    #project {
        float: left;
    }

    #project span {
        color: #5D6975;
        text-align: right;
        width: 52px;
        margin-right: 10px;
        display: inline-block;
        font-size: 0.8em;
    }

    #test {
        color: #5D6975;
        width: 52px;
        margin-right: 10px;
        display: inline-block;
        text-align: right;
        font-size: 0.8em;
    }

    #company {
        float: right;
        text-align: right;
    }

    @page {
        margin-left: -.5in;
        margin-top: -.5in;
    }

    #project div,
    #company div {
        white-space: nowrap;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 20px;
        margin-left: 100px;
        margin-right: 68px;
    }

    table tr:nth-child(2n-1) td {
        background: #F5F5F5;
    }

    table th,
    table td {
        text-align: left;
    }

    table th {
        padding: 5px 20px;
        color: #5D6975;
        border-bottom: 1px solid #C1CED9;
        white-space: nowrap;
        font-weight: normal;
    }

    table .service,
    table .desc {
        text-align: left;
    }

    table td {
        padding: 20px;
        text-align: left;
    }

    table td.unit,
    table td.qty,
    table td.total {
        font-size: 1.2em;
    }

    table td.grand {
        border-top: 1px solid #5D6975;
    }

    #notices .notice {
        color: #5D6975;
        font-size: 1.2em;
        margin-left: 140px;
    }

    footer {
        color: #5D6975;
        width: 100%;
        position: absolute;
        bottom: 0;
        padding-top: 1px;
        border-top: 1px solid #C1CED9;
        text-align: center;
        margin-left: 135px;
        margin-right: 35px;
    }
</style>
<head>
    <meta charset="utf-8">
    <title>Example 1</title>

</head>
<body>
<div id="logo">
    <img src="images/logo/logo_sans_cadre.png">
</div>

<h1> Confirmation de paiement </h1>
<br/><br/>
<header id="clearfix" >

    <div id="addCompany">
        <div>RedCloud Sàrl<br/> Rue de la Tambourine 17 <br/> 1227 Carouge <br/> <a href="mailto:{{$mailCompany}}">{{$mailCompany}}</a></div>
    </div>

    <div id="project">
        <br/><br/><br/><br/>
        <div><span>Utilisateur</span>{{$userName}}</div>
        <div><span>Nom d'équipe</span>{{$userTeam}}</div>
        <div><span>Email</span>{{$mailUser}}</div>
        <div><span>Date</span>{{$dateDuJour}}</div>
    </div>
</header>
<main>
    <br/><br/>
    <table>
        <thead >
        <tr >
            <th>IMAGE</th>
            <th>TOURNOI</th>
            <th>DATE ET HEURE</th>
            <th>STATUT</th>
            <th>PRIX</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><img style="height: 40px; width: 60px;" src="images/tournaments/{{$imageTournoi}}"></td>
            <td>{{$tournoiNom}}</td>
            <td>{{$dateTournoi}}, {{$heureTournoi}}</td>
            <td>Payé</td>
            <td>{{$tournoiPrix}}</td>
        </tr>
        <tr>
            <td colspan="4" class="grand total">TOTAL</td>
            <td style="border-top : 1px solid #5D6975;">CHF {{$tournoiPrix}}.-</td>
        </tr>
        </tbody>
    </table>
    <br/><br/>
    <div id="notices">
        <div style="margin-left: 135px;">NOTICE:</div>
        <div class="notice">Vous pouvez demander un remboursement via votre liste d'inscriptions dans l'application ou par mail jusqu'à 48h avant le début du tournoi.</div>
    </div>
</main>
<br/>
<footer>
    Ce document fait office de preuve de paiment et est à présenter en cas de problème.
</footer>
</body>
</html>