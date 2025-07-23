<?php
// fileName: add_speakers.php

// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include necessary files
require_once __DIR__ . '/api/config/database.php';
require_once __DIR__ . '/api/models/Speaker.php';

echo "Starting speaker data insertion...\n\n";

// Database connection
$database = new Database();
$db = $database->connect();

if ($db === null) {
    echo "Error: Could not connect to the database. Please check your api/config/database.php file.\n";
    exit();
}

$speakerModel = new Speaker($db);

// Define speaker data
$speakers_data = [
    [
        'name' => 'Maria Da Graça RUANO',
        'title' => 'Associate Professor',
        'institution' => 'University of Algarve, Portugal.',
        'bio' => 'Maria da Graça Ruano (female) received her Ph.D. in Electronic Engineering from the University of Wales, United Kingdom in 1992. She started her professional activity in 1982 at the University of Aveiro, joining in 1992 the Department of Electronics Engineering and Informatics of the University of Algarve, where she currently holds a tenure associate professor position. Her research interests are on bio-signal processing, classification and modelling, particularly devoted to cardiovascular disorders and their interaction with diabetes, and, ultrasound-based non-invasive temperature assessment.
She published over 110 research publications in refereed journals and conferences and edited 4 books and 11 book chapters. She was involved in program committees and organization of national and international conferences, having participated in the technical committees of over 100 conferences.
She maintains a 10-yearly average of scientific journals articles revision since 2013 (mainly Elsevier, Springer, IEEE).
She has served as project or team leader in several projects (mainly international).
https://scholar.google.com/citations?user=Fhfk2awAAAAJ&hl=pt-PT
http://orcid.org/0000-0002-0014-9257

INTERNATIONAL PROJECTS (3)
FrailCheck: Diseño y desarrollo de un sistema de detección y análisis de la actividad física y pautas de comportamiento para ayuda al diagnóstico de la fragiliad A. Ruano, M. Ruano, J. Dominguez, A. Martín, A. Hernandez, J. Ureña, 2018-2020
Link: Linking Excellence in Biomedical knowledge and Computational Intelligence Research for personalized management of CVD within PHC R. Paiva, P. Carvalho, J. Henriques, T. Rocha, S. Paredes, C. Teixeira, M. Ruano, Joel P. Arrais, 2016-2019
ThermoResponse-Thermo-responsive ultrasonographic tissue analysis: towards a new imaging modality C. Teixeira, W. Pereira, M. Ruano, A. Alvarenga, A. Fontes, 2014-2016',
        'image' => null // No image provided, so set to null
    ],
    [
        'name' => 'Yassine RUICHEK',
        'title' => 'Full Professor',
        'institution' => 'University of Technology of Belfort-Montbéliard, CIAD Lab., Belfort, France',
        'bio' => 'Publication Topics: Feature extraction, object detection, image motion analysis, image sequences, image segmentation, video signal processing, image classification, learning (artificial intelligence), convolutional neural nets, image enhancement, mobile robots, optical radar, robot vision, singular value decomposition, traffic engineering computing, computer vision, image colour analysis, image recognition, image restoration, object recognition, road traffic, tensors, Gaussian processes, Global Positioning System, SLAM (robots)

Biography: Yassine Ruichek (Senior Member, IEEE) received the Ph.D. degree in control and computer engineering and the Habilitation à Diriger des Recherches (HDR) degree in physic science from the University of Lille, France, in 1997 and 2005, respectively. Since 2007, he has been a Full Professor with the University of Technology of Belfort-Montbéliard (UTBM). His research interests include computer vision, image processing and analysis, pattern recognition, data fusion, and localization, with applications in intelligent transportation systems and video surveillance.(Based on document published on 2 August 2021).',
        'image' => null
    ],
    [
        'name' => 'Antonio RUANO',
        'title' => 'Associate Professor with Habilitation',
        'institution' => 'University of Algarve, Portugal.',
        'bio' => 'Past (2008-2014) IFACTC on Computational Intelligence in Control Chairman
* Vice-Chairman for the Trienniums 2015-2021
* IEEE Senior Member (Computational Intelligence and Control Systems Societies)
* Associate Professor with Habilitation, University of Algarve, Portugal.

Background: Ruano, Antonio Eduardo Barros was born on September 14, 1959 in Espinho, Portugal. Son of Antonio Delfim Furriel and Maria C.F. (Barros) Ruano.

Education: Graduate in Electrical Engineering, University Aveiro, Portugal, 1982. Master of Science in Electrotech. Engineering, University Coimbra, Portugal, 1989. Doctor of Philosophy in Electronic Engineering, University Wales, Bangor, 1993.

Carreer: Demonstrator University Aveiro, 1981-1982, assistant professor University Aveiro, 1982-1992. auxiliar professor Portugal, University of Algarve, 1993-1996, associate professor University of Algarve, 1996-2004, associate professorwith tenure and habilitation, University of Algarve, 2004

Publications: Author and co-author of more than 250 publications among books, book chapters, journal and conference publications. - Orcid ID: 0000-0002-6308-8666 - Scopus ID: 7004284159 - Research ID: B-4135-2008 - Google Scholar ID: wrYUbVgAAAAJ&hl',
        'image' => null
    ],
    [
        'name' => 'Ahmed LAKHSSASSI',
        'title' => 'Titular Professor',
        'institution' => 'Université du Québec en Outaouais (UQO), LIMA laboratory, CANADA',
        'bio' => 'Affiliation: Responsible of the LIMA laboratory CANADA, received the B.Ing. and M.Sc.A in electrical engineering from Université du Québec (UQTR), Québec, Canada in 1988 and 1990 respectively.

Biography: He also received the Ph.D. in Energy and Material sciences in 1995 from INRS-Energie et Materiaux Montréal, Québec, Canada. A year also, he had become a professor of Electro-thermo-mechanical aspects at NSERC -Hydro-Quebec Industrial Research Chair at Electrical Engineering Department of the UQTR. Since 1998, he has been with UQO (Université du Québec en Outaouais), where he is currently titular professor and responsible of the LIMA laboratory LIMA (Advanced Microsystem Engineering Laboratory) developing algorithms for Microsystems thermo-mechanical monitoring and associated distributed sensors network. His research interest is the fields of automatic IP porting tools between different technology nodes and LAIC systems thermo-mechanical prediction unit and monitoring methods to sustain transient thermo-mechanical stress peaks reliability. He is the author/co-author of more than 150 scientific publications and research report, and thesis advisor of 60 graduate and undergraduate students who completed their studies.',
        'image' => null
    ],
    [
        'name' => 'Adam W SKOREK',
        'title' => 'Professor, IEEE Electron Devices Society Distinguished Lecturer',
        'institution' => 'University of Quebec at Trois-Rivières (UQTR), CANADA',
        'bio' => 'Background: Adam Waldemar Skorek (December 24, 1956) is a Canadian University Professor and a Polish Engineer. He was born in Krzczonow, Lublin, Poland.

Education: Prof. Adam Waldemar Skorek, M\'87, SM\'90, F\'09 completed Master of Electrical Engineering Program at Bialystok University of Technology (Poland) receiving both Master and Engineer degrees in 1980. He received a Doctor of Technical Sciences Degree in Electrical Engineering at Warsaw University of Technology (Poland) in 1983. On 1987, he joined the University of Quebec at Trois-Rivières (UQTR), where currently, he is a Full Professor and Director of the Research Group on Industrial Electronics.

Carreer: He founded the UQTR4s Electro-Thermal Management Laboratory which succeeded both the NanoHeat Laboratory and the UQTR4s Industrial ElectroHeat Laboratory founded and directed by himself since 1989. He is conducting the electrical engineering courses for bachelors, masters and Ph.D. students. His research works was granted by NSERC, CFI, FRQNT, MITACS and industry. He published and co-published over 130 papers including works on High Performance Computing applications in electro-thermal analysis. He is currently representative of the UQTR at the Canadian Microelectronics Corporation. Volunteering more than 30 years in IEEE, he contributed on various positions including the IEEE Fellow Committee Member and the IEEE MGA Awards and Recognition Committee Chair.

Awards and recognition: Recipient of the Knight\'s Cross of the Order of Merit of the Republic of Poland, awarded by the President of the Republic of Poland (2015) Recipient of the Medal of Governors of the University of Quebec (2014) Elected Full Member of the Academy of Engineering in Poland (2013) Recipient of the Queen Elizabeth II Diamond Jubilee Medal (2012) Elected Fellow of the Institute of Electrical and Electronics Engineers (IEEE) in 2009 Recipient of the 2006 IEEE RAB Leadership Award - "In recognition of his dynamic leadership and significant contributions in promoting IEEE and the engineering profession" Recipient of the 2005 IEEE Canada Wallace S. Read Outstanding Service Award - "In recognition of service to the profession and to the society" Recipient of the Gold Cross of the Order of Merit, awarded by the President of the Republic of Poland (2004) Elected Fellow of the Engineering Institute of Canada in 2004',
        'image' => null
    ],
    [
        'name' => 'Mohamed HIMDI',
        'title' => 'Professeur of University, Head of the High Frequency and Antenna Department',
        'institution' => 'IETR, University of Rennes 1, France',
        'bio' => 'Background: MOHAMED HIMDI was born in Fez imperial city of Morocco

Education: MOHAMED HIMDI received the Ph.D. degree in signal processing and telecommunications from the University of Rennes 1, France in 1990. Since 2003, he has been a Professor with the University of Rennes 1, and the Head of the High Frequency and Antenna Department until 2013, of IETR.

Research: He has authored or co-authored 131 journal papers and over 270 papers in conference proceedings. He has also co-authored 10 book chapters. He holds 39 patents. His research activities concern passive and active millimeter-wave antennas. His research also includes development of new architectures of antenna arrays, and new three-dimensional (3-D) antenna technologies. He was Laureate of the 2d National Competition for the Creation of Enterprises in Innovative Technologies in 2000 (Ministry of Industry and Education). In March 2015 he received the JEC-AWARD at Paris on Pure composite material antenna embedded into a motorhome roof for the Digital Terrestrial Television reception. Finalist in category "Information Technologies & Security" of international Competition innovative start-ups Hello Tomorrow Challenge 2015 (24-26 June 2015 Paris).',
        'image' => null
    ]
];

$success_count = 0;
$fail_count = 0;

foreach ($speakers_data as $speaker_data) {
    echo "Attempting to add speaker: " . $speaker_data['name'] . "...\n";
    try {
        // Check if a speaker with the same name and institution already exists to prevent duplicates
        $stmt = $db->prepare("SELECT COUNT(*) FROM speakers WHERE name = :name AND institution = :institution");
        $stmt->execute([
            'name' => $speaker_data['name'],
            'institution' => $speaker_data['institution']
        ]);
        if ($stmt->fetchColumn() > 0) {
            echo "Skipping: Speaker '{$speaker_data['name']}' from '{$speaker_data['institution']}' already exists.\n";
            continue; // Skip to the next speaker
        }

        if ($speakerModel->create($speaker_data)) {
            echo "Successfully added speaker: " . $speaker_data['name'] . "\n";
            $success_count++;
        } else {
            echo "Failed to add speaker: " . $speaker_data['name'] . "\n";
            $fail_count++;
        }
    } catch (PDOException $e) {
        echo "Database error for speaker {$speaker_data['name']}: " . $e->getMessage() . "\n";
        $fail_count++;
    } catch (Exception $e) {
        echo "An unexpected error occurred for speaker {$speaker_data['name']}: " . $e->getMessage() . "\n";
        $fail_count++;
    }
}

echo "\n--- Insertion Summary ---\n";
echo "Successfully added: " . $success_count . " speakers.\n";
echo "Failed to add: " . $fail_count . " speakers.\n";
echo "-------------------------\n";

// Close the database connection
$db = null;
?>
