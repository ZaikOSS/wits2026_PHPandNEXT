<?php
// insert-committees.php
require_once('config/database.php');
require_once('models/Committee.php');

$db = (new Database())->connect();
$model = new Committee($db);

// Define all committees and members
$committees = [
    'Honorary Committee' => [
        ['name' => 'MRABET Radouane', 'role' => 'President of SMBA University', 'description' => 'Fez, Morocco'],
        ['name' => 'LAHRACH Abderrahim', 'role' => 'Director of ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'IJJAALI Mustapha', 'role' => 'Dean of FST', 'description' => 'SMBA University, Fez, Morocco']
    ],
    'Organizing Committee' => [
        ['name' => 'ALAMI MARKTANI Malika', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'CHOUGRAD Hiba', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'BENNANI DOSSE Saad', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'BELKEBIR Hicham', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'NFAOUI El Hbib', 'role' => 'FS', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'ZAZ Ghita', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco']
    ],
    'Steering Committee' => [
        ['name' => 'BENNANI DOSSE Saad', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'EL FADILI Hakim', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'LAKHRISSI Youness', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'MANSOURI Anass', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco']
    ],
    'Special Issues Committee' => [
        ['name' => 'NORMA Alias', 'role' => 'Ibnu Sina Institute for Scientific & Industrial Research (ISI-SIR)', 'description' => 'Faculty of Science, University Teknologi Malaysia, 81310, UTM Skudai, Johor, MALAYSIA']
    ],
    'International Committee' => [
        ['name' => 'LAKHSSASSI Ahmed', 'role' => 'University of Quebec in Outaouais', 'description' => 'CANADA'],
        ['name' => 'RAMDANI Mohamed', 'role' => 'ESEO Angers', 'description' => 'FRANCE'],
        ['name' => 'RUANO Maria Da Garca', 'role' => 'Univ do Algarve', 'description' => 'Faro, PORTUGAL'],
        ['name' => 'RUICHEK Yassine', 'role' => 'UTBM', 'description' => 'Belfort, FRANCE'],
        ['name' => 'RUANO Antonio Eduardo De Barros', 'role' => 'Univ do Algarve', 'description' => 'Faro, PORTUGAL'],
        ['name' => 'EL KHAMLICHI DRISSI Khalil', 'role' => 'Clermont Auvergne Univ, Ins Pascal', 'description' => 'FRANCE']
    ],
    'Keynote Committee' => [
        ['name' => 'LATRACH Mohamed', 'role' => 'ESEO Angers', 'description' => 'FRANCE']
    ],
    'Technical Committee' => [
        ['name' => 'ABRI Mehadji', 'role' => 'Tlemcen University', 'description' => 'ALGERIA'],
        // Add all other technical committee members here following the same pattern
        ['name' => 'ZAZ Ghita', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco']
    ],
    'Financial Committee' => [
        ['name' => 'BENNANI DOSSE Saad', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'LAKHRISSI Younes', 'role' => 'ENSA', 'description' => 'SMBA University, Fez, Morocco']
    ],
    'Junior Committee' => [
        ['name' => 'AMARTY Naima', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'DOUMAL Zouhir', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'IDRISSI JANATI Zineb', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'MIJITABA EL HADJI Sahirou Ali', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'OUZINE Jamila', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco'],
        ['name' => 'RASSIL Asmaa', 'role' => 'FS', 'description' => 'Chouaïb Doukkali University, El Jadida, MOROCCO']
    ],
    'Web Team' => [
        ['name' => 'ZAKARIA OUADIFI', 'role' => 'ENSA FES', 'description' => 'MOROCCO'],
        ['name' => 'HAMEZA JANATI', 'role' => 'ENSA FES', 'description' => 'MOROCCO']
    ]
];

// Insert all committees and members
$totalInserted = 0;
foreach ($committees as $category => $members) {
    foreach ($members as $member) {
        $data = [
            'name' => $member['name'],
            'role' => $member['role'],
            'description' => $member['description'],
            'category' => $category
        ];
        
        try {
            if ($model->create($data)) {
                $totalInserted++;
                echo "Added: " . $member['name'] . " (" . $category . ")<br>";
            }
        } catch (Exception $e) {
            echo "Error adding " . $member['name'] . ": " . $e->getMessage() . "<br>";
        }
    }
}

echo "<h2>Completed!</h2>";
echo "<p>Total members inserted: $totalInserted</p>";

// Add this button to easily navigate back to the admin panel
echo '<a href="dashboard.php" style="display: inline-block; margin-top: 20px; padding: 10px 15px; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Return to Dashboard</a>';
?>