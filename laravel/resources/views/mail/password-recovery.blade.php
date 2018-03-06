<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <style>
            body { padding: 0px; margin: 0px;}
            .black-background { background-color: black; color: rgb(231, 3, 26);}
            .lightgrey-background { background-color: lightgrey; }
            .center { text-align: center; }
            .no-margin-padding { padding: 0px; margin: 0px;}
            img { height: 22%; width: 22%; }
        </style>
    </head>
    <body style="font-family: 'Roboto', sans-serif;">
        <table style="width:100%">
            <tbody>
            <tr>
                <td width="100%" class="black-background center">
                    <img src="{{ asset('images/logo/logo.png') }}" alt="Logo RedCloud">
                </td>
            </tr>
            <tr>
                <td width="100%" class="center">
                    <h1>Récuperation de mot de passe</h1>
                </td>
            </tr>
            <tr class="no-margin-padding">
                <td class="center no-margin-padding">
                    <h2 class="no-margin-padding">Code :</h2>
                </td>
            </tr>
            <tr class="no-margin-padding">
                <td class="center no-margin-padding">
                    <h2 class="lightgrey-background no-margin-padding">{{ $code }}</h2>
                </td>
            </tr>
            </tbody>
        </table>
        <p>
        <h3>Si nous n'avez pas essayé de récupérer votre mot de passe, vous pouvez ignorer cet email.<h3>
        </p>
    </body>
</html>