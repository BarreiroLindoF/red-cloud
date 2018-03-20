<?php

use Illuminate\Database\Seeder;

class TournoiTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tournoi')->insert([
            'titre' => 'Guerre du pouvoir',
            'imageUri' => 'wow.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 200,
            'prix_inscription' => 100,
            'event_id_event' => 3,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 1,
            'type_tournoi_id_type_tournoi' => 2,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Coupe Etoile Arc-En-Ciel',
            'imageUri' => 'marioKart.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 12,
            'prix_inscription' => 100,
            'event_id_event' => 2,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 2,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Oeuf de Pâques',
            'imageUri' => 'dofus.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 4,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 3,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Libère ton talent dans PUBG !',
            'imageUri' => 'pubg.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 50,
            'prix_inscription' => 100,
            'event_id_event' => 5,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 4,
            'type_tournoi_id_type_tournoi' => 2,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'FiFa',
            'imageUri' => 'fifa.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 7,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 5,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi BattleField 1',
            'imageUri' => 'battlefield1.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 6,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 6,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi Halo 5',
            'imageUri' => 'halo5.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 9,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 7,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi Fortnite',
            'imageUri' => 'fortnite.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 8,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 8,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Heroes of the Storm',
            'imageUri' => 'heroesOfTheStorm.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 11,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 9,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi de LOL',
            'imageUri' => 'lol.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 10,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 10,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi CS',
            'imageUri' => 'cs.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'event_id_event' => 1,
            'reglementUri' => 'go.pdf',
            'jeu_id_jeu' => 11,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi MarioKart',
            'imageUri' => 'marioKart.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'prix_inscription' => 100,
            'reglementUri' => 'go.pdf',
            'event_id_event' => 1,
            'jeu_id_jeu' => 11,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi World of Warcraft',
            'imageUri' => 'wow.jpg',
            'description' => 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation, so publishers use lorem ipsum when displaying a typeface or design in order to direct the focus to presentation.  Also approximates a typical distribution of spaces in English. \n\n The most common lorem ipsum text reads as follows: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n The text is derived from Cicero\'s De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it"). It is not known exactly when the text acquired its current standard form; it may have been as late as the 1960s. The passage was discovered by Richard McClintock, a Latin scholar who is the publications director at Hampden-Sydney College in Virginia, by searching for citings of the rarely used word in classical literature.',
            'participants_max' => 20,
            'reglementUri' => 'go.pdf',
            'prix_inscription' => 100,
            'event_id_event' => 1,
            'jeu_id_jeu' => 11,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
    }
}
