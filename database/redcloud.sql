-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 16 jan. 2018 à 21:35
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `redcloud`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_imageUri` varchar(200) NOT NULL,
  `event_body` varchar(200) NOT NULL,
  `event_date` varchar(50) NOT NULL,
  `event_userInfo` varchar(200) NOT NULL,
  `event_title` varchar(200) NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`event_id`, `event_imageUri`, `event_body`, `event_date`, `event_userInfo`, `event_title`) VALUES
(1, '/images/cs.jpg', 'L\'action des joueurs de Counter-Strike se deroule en plusieurs manches, ou rounds, d\'une duree par defaut de cinq minutes, sur une carte de jeu, ou map.', '05.03.2017', 'Utilisateur', 'Enorme evenement CS!'),
(2, '/images/marioKart.jpg', 'Tous a vos manettes de Wii ! Le tournoi de MarioKart ouvre ses portes. Tous sur la ligne de depart, a vos marques, pret, partez!', '10.03.2017', 'User', 'Tournoi de MarioKart sur Wii!'),
(3, '/images/wow.jpg', 'Le plus grand tournoi de World of Warcraft ouvre ses portes, alors n\'attendez plus et venez vous y inscrire !', '17.04.2018', 'User', 'Evenement World of Warcraft!'),
(4, '/images/dofus.jpg', 'Qui n\'a jamais reve de pouvoir jouer a Dofus avec ses potes tout en sirotant une biere dans son bar favoris ? C\'etait une question rhetorique, venez au plus vite vous inscrire au tournoi Dofus !', '01.04.2018', 'Utilisateur', 'evenement Dofus'),
(5, '/images/pubg.jpg', 'Qui n\'a jamais reve de pouvoir jouer a Pubg avec ses potes tout en sirotant une biere dans son bar favoris ? Inscrivez-vous au tournoi de Players Unknown\'s Battlegrounds !', '10.05.2018', 'User', 'Evenement Pubg'),
(6, '/images/battlefield1.jpg', 'Qui n\'a jamais reve de pouvoir jouer a Dofus avec ses potes tout en sirotant une biere dans son bar favoris ? C\'etait une question rhetorique, venez au plus vite vous inscrire au tournoi Battlefield !', '06.04.2018', 'User', 'Evenement de Battlefield'),
(7, '/images/fifa18.jpg', 'Venez nombreux vous inscrire au tournoi de Fifa 2018 et profitez des nouveautes du bar pour vous requinquer entre deux parties.', '21.05.2018', 'Utilisateur', 'Evenement Fifa 2018'),
(8, '/images/fortnite.jpg', 'Venez nombreux vous inscrire au tournoi de Fifa 2018 et profitez des nouveautes du bar pour vous requinquer entre deux parties.', '21.03.2018', 'Utilisateur', 'Evenement Fortnite'),
(9, '/images/halo5.jpg', 'Le tournoi Halo 5 est enfin disponible dans notre bar et vous attend ! Nous vous attendons avec impatience.', '30.03.2018', 'Utilisateur', 'Evenement Halo 5'),
(10, '/images/leagueOfLegends.jpg', 'Le tournoi League of Legends est enfin disponible dans notre bar et vous attend ! Nous vous attendons avec impatience.', '30.06.2018', 'Utilisateur', 'Evenement League of Legends'),
(11, '/images/heroesOfTheStorm.jpg', 'Le tout nouveau tournoi de Heroes of the Storm vient d\'ouvrir. Inscris ta team pour y participer et venir passer un bon moment dans notre bar ! Attention les places sont limitees.', '12.06.2018', 'Utilisateur', 'Evenement Heroes of the Storm');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_nom` varchar(200) NOT NULL,
  `user_prenom` varchar(200) NOT NULL,
  `user_pseudo` varchar(200) NOT NULL,
  `user_ville` varchar(200) NOT NULL,
  `user_npa` varchar(50) NOT NULL,
  `user_datenaissance` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `user_nom`, `user_prenom`, `user_pseudo`, `user_ville`, `user_npa`, `user_datenaissance`, `user_email`, `user_password`) VALUES
(1, 'Utilisateur', 'Utilisateur', 'user', 'Geneve', '1218', '01.01.2000', 'user@hotmail.com', 'user'),
(2, 'Barreiro', 'Lindo', 'Flavinho', 'Annemasse', '1234', '03.11.1994', 'flavio@hotmail.com', 'password'),
(3, 'Gulen', 'Lucas', 'LucasHeg', 'Geneve', '1218', '01.01.1994', 'lucas.gulen@hotmail.ch', 'LucasHeg'),
(4, 'grep', 'grep', 'Grep', 'grep', '1200', '01.11.1994', 'flavio@gmail.com', 'Grep');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
