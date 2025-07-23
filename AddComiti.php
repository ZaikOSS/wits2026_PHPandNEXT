<?php
// insert-committees.php
require_once('api/config/database.php'); // Corrected path assuming script is in project root
require_once('api/models/Committee.php'); // Corrected path

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
        // Existing entry
        ['name' => 'ZAZ Ghita', 'role' => 'FST', 'description' => 'SMBA University, Fez, Morocco'],
        // New entries for Technical Committee
        ['name' => 'ABRI Mehadji', 'role' => 'Member', 'description' => 'Tlemcen University, ALGERIA'],
        ['name' => 'ADEL ALI ABOU El-Ela', 'role' => 'Member', 'description' => 'Faculty of Engineering, Menoufia University, EGYPT'],
        ['name' => 'ADIB Abdellah', 'role' => 'Member', 'description' => 'FST Mohamadia, MOROCCO'],
        ['name' => 'ADNANE Yassine', 'role' => 'Member', 'description' => 'Le Havre University, Le Havre, FRANCE'],
        ['name' => 'AHAITOUF Abdelaziz', 'role' => 'Member', 'description' => 'FP of Taza, SMBA University, MOROCCO'],
        ['name' => 'AHAITOUF Ali', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'AISSAOUI Karima', 'role' => 'Member', 'description' => 'ENSA, Mohamed I University, Oujda, MOROCCO'],
        ['name' => 'AISSAT Abdelkader', 'role' => 'Member', 'description' => 'Department of Electronics, University of Blida, ALGERIA'],
        ['name' => 'AIT KBIR M\'hamed', 'role' => 'Member', 'description' => 'FST, Abdelmalek Essaadi University, Tanger, MOROCCO'],
        ['name' => 'AIT MADI Abdessalam', 'role' => 'Member', 'description' => 'ENSA, Kenitra, MOROCCO'],
        ['name' => 'AKIL MOhamed', 'role' => 'Member', 'description' => '(A2SI) Groupe ESIEE, FRANCE'],
        ['name' => 'AKSASSE Brahim', 'role' => 'Member', 'description' => 'FP Errachidia, Moulay Ismail University, MOROCCO'],
        ['name' => 'ALAMI MARKTANI Malika', 'role' => 'Member', 'description' => 'ENSA, SMBA, Fez, MOROCCO'],
        ['name' => 'ALAOUI Chakib', 'role' => 'Member', 'description' => 'INSA, EUROMED University, Fez, MOROCCO'],
        ['name' => 'ALAOUI CHRIFI Meriem', 'role' => 'Member', 'description' => 'Valenciennes University, FRANCE'],
        ['name' => 'ALAOUI TALIBI Mohammed', 'role' => 'Member', 'description' => 'FST SMBA University, Fez, MOROCCO'],
        ['name' => 'ALFIDI Mohammed', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'ALLOUHI Amine', 'role' => 'Member', 'description' => 'EST, SMBA University, Fez, MOROCCO'],
        ['name' => 'ALMUDENA Suarez Rodriguez', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'AMARA KORBA Abdelaziz', 'role' => 'Member', 'description' => 'Badji Mokhtar, Annaba University, ALGERIA'],
        ['name' => 'AMRAQUI Samir', 'role' => 'Member', 'description' => 'FS, Mohammed I University, Oujda, MOROCCO'],
        ['name' => 'AMROUCHE Abderrahmane', 'role' => 'Member', 'description' => 'USTHB, ALGERIA'],
        ['name' => 'AMROUNE Mohammed', 'role' => 'Member', 'description' => 'University of Larbi Tebessi, Tebessa, ALGERIA'],
        ['name' => 'AUBERT Hervé', 'role' => 'Member', 'description' => 'National Polytechnical Institute, Toulouse, FRANCE'],
        ['name' => 'BABU K. Vasu', 'role' => 'Member', 'description' => 'vasireddy venkatadri institute of technology, INDIA'],
        ['name' => 'BADRI Abdelmajid', 'role' => 'Member', 'description' => 'FST of Mohammedia, Hassan II University, MOROCCO'],
        ['name' => 'BAEK Donghyun', 'role' => 'Member', 'description' => 'Chung-Ang University, SOUTH KOREA'],
        ['name' => 'BAGHDAD Abdennaceur', 'role' => 'Member', 'description' => 'FST of Mohammedia, Hassan II University, MOROCCO'],
        ['name' => 'BALBOUL Younes', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'BEN SLIMA Mohamed', 'role' => 'Member', 'description' => 'ENET\'COM, Sfax, TUNISIA'],
        ['name' => 'BENAISSA Ezzeddine', 'role' => 'Member', 'description' => 'Le Havre University, Le Havre, FRANCE'],
        ['name' => 'BENAISSA Mounir', 'role' => 'Member', 'description' => 'University of Sfax, TUNISIA'],
        ['name' => 'BENAMAR Nabil', 'role' => 'Member', 'description' => 'EST, UMI, Meknes, MOROCCO'],
        ['name' => 'BENDJENNA Hakim', 'role' => 'Member', 'description' => 'University of Larbi Tebessi, Tebessa, ALGERIA'],
        ['name' => 'BENHADDOU Driss', 'role' => 'Member', 'description' => 'University of Houston, USA'],
        ['name' => 'BENHALA Bachir', 'role' => 'Member', 'description' => 'FS, University of My Ismail, Meknes, MOROCCO'],
        ['name' => 'BENNANI DOSSE Saad', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'BENNIS Mehdi', 'role' => 'Member', 'description' => 'Centre for Wireless Communication, University of Oulu, FINLAND'],
        ['name' => 'BERRADA Ismail', 'role' => 'Member', 'description' => 'FSDM, SMBA University, Fez, MOROCCO'],
        ['name' => 'BERRADA Mohammed', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'BOUAYAD Anas', 'role' => 'Member', 'description' => 'FSDM, SMBA University, Fez, MOROCCO'],
        ['name' => 'BOUDRAA Bachir', 'role' => 'Member', 'description' => 'USTHB, ALGERIA'],
        ['name' => 'BOURIDANE Ahmed', 'role' => 'Member', 'description' => 'University of Newcastle, UK'],
        ['name' => 'BOUTABA Raouf', 'role' => 'Member', 'description' => 'University of Waterloo, CANADA'],
        ['name' => 'BOUTEJDAR Ahmed', 'role' => 'Member', 'description' => 'DFG, Braunschweig-Bonn, GERMANY'],
        ['name' => 'BRI Seddik', 'role' => 'Member', 'description' => 'EST, Moulay Ismail University, Meknes, MOROCCO'],
        ['name' => 'CANO Juan Luis', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'CARVALHO Marcelo', 'role' => 'Member', 'description' => 'University of Brasilia (UnB), BRAZIL'],
        ['name' => 'CASANEUVA Alicia', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'CHAOUNI Abdelali', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'CHARREL Pierre-Jean', 'role' => 'Member', 'description' => 'University of Toulouse 2, FRANCE'],
        ['name' => 'CHERITI Ahmed', 'role' => 'Member', 'description' => 'Quebec University, Trois-Rivières, CANADA'],
        ['name' => 'CHERROUD Mohamed', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'CHETIOUI Kaouthar', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'CHOUGRAD Hiba', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'CHOUINARD Jean-Yves', 'role' => 'Member', 'description' => 'Faculty of sciences University of Laval, CANADA'],
        ['name' => 'CHUNG Lawrence', 'role' => 'Member', 'description' => 'University of Texas, USA'],
        ['name' => 'CONCEICAO EusébioCONCEICAO Eusébio', 'role' => 'Member', 'description' => 'FCT - University of Algarve, PORTUGAL'],
        ['name' => 'COSTEN Fumie', 'role' => 'Member', 'description' => 'SEEE, University of Manchester, UK'],
        ['name' => 'COULETTE Bernard', 'role' => 'Member', 'description' => 'University of Toulouse 2, FRANCE'],
        ['name' => 'CYRILLE Bertelle', 'role' => 'Member', 'description' => 'Le Havre University, Le Havre, FRANCE'],
        ['name' => 'DARENA Frantisek', 'role' => 'Member', 'description' => 'Mendel University, CZECH'],
        ['name' => 'DAS Sudipta', 'role' => 'Member', 'description' => 'IMPS College of Engineering and Technology, INDIA'],
        ['name' => 'DECROZE Cyril', 'role' => 'Member', 'description' => 'FST Limoges, FRANCE'],
        ['name' => 'DEGAUQUE Pierre', 'role' => 'Member', 'description' => 'Telice, USTL-Lille, FRANCE'],
        ['name' => 'DENIDNI Tayeb Ahmed', 'role' => 'Member', 'description' => 'INRS, CANADA'],
        ['name' => 'DERDOUR Makhlouf', 'role' => 'Member', 'description' => 'University of Larbi Tebessi, Tebessa, ALGERIA'],
        ['name' => 'DESPAUX Gilles', 'role' => 'Member', 'description' => 'IES University of Montpellier, FRANCE'],
        ['name' => 'DHRAIEF Amine', 'role' => 'Member', 'description' => 'University of Manouba, TUNISIA'],
        ['name' => 'DINH THUC Nguyen', 'role' => 'Member', 'description' => 'FIT- Hochiminh University, VIETNAM'],
        ['name' => 'DOUSSET Bernard', 'role' => 'Member', 'description' => 'UPS, Toulouse, FRANCE'],
        ['name' => 'DRISSI M\'Hamed', 'role' => 'Member', 'description' => 'INSA de Rennes, FRANCE'],
        ['name' => 'EL AZZAB Driss', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'EL ALAMI Ali', 'role' => 'Member', 'description' => 'FST, Moulay Ismail University, Errachidia, MOROCCO'],
        ['name' => 'EL ANSARI Mohamed', 'role' => 'Member', 'description' => 'FS, Moulay Ismail University, Meknes, MOROCCO'],
        ['name' => 'EL AYACHI Moussa', 'role' => 'Member', 'description' => 'ENSA-Oujda, MOROCCO'],
        ['name' => 'EL BEKKALI Moulhime', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'EL BEQQALI Omar', 'role' => 'Member', 'description' => 'FSDM, SMBA University, Fez, MOROCCO'],
        ['name' => 'EL BOUSHAKI Abdessamad', 'role' => 'Member', 'description' => 'FST, Cadi Ayyad University, Marrakesh, MOROCCO'],
        ['name' => 'EL FADILI Hakim', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'EL GHAZI Mohammed', 'role' => 'Member', 'description' => 'EST, SMBA University, Fez, MOROCCO'],
        ['name' => 'EL GIBARI Mohammed', 'role' => 'Member', 'description' => 'IETR University of Nantes, FRANCE'],
        ['name' => 'EL HASSANI Hind', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'EL KHAMLICHI DRISSI Khalil', 'role' => 'Member', 'description' => 'Clermont Auvergne Univ, Ins Pascal, FRANCE'],
        ['name' => 'EL MARKHI Hassane', 'role' => 'Member', 'description' => 'FST of Fez, SMBA University, MOROCCO'],
        ['name' => 'EL MOUSSAOUI Hassan', 'role' => 'Member', 'description' => 'FST of Fez, SMBA University, MOROCCO'],
        ['name' => 'EL OUARDI Abdelhafid', 'role' => 'Member', 'description' => 'Université Paris Sud, Orsay, FRANCE'],
        ['name' => 'EL OUAZZANI Nabih', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'ES-SBAI Najia', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'EVGENY Ivashko', 'role' => 'Member', 'description' => 'IAMR KRC RAS , RUSSIA'],
        ['name' => 'EZZAZI Imad', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'FARCHI Abdelmajid', 'role' => 'Member', 'description' => 'FST, Hassan I University, Settat, MOROCCO'],
        ['name' => 'FARHANE Youness', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'FERREIRA Pedro', 'role' => 'Member', 'description' => 'Faculty of Sciences, University of Lisbon, PORTUGAL'],
        ['name' => 'FOSHI Jaouad', 'role' => 'Member', 'description' => 'FST Errachidia, Moulay Ismail University, MOROCCO'],
        ['name' => 'FRANT Terril', 'role' => 'Member', 'description' => 'Peking University, CHINA'],
        ['name' => 'GARCIA Jose Angel', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'GARGOURI Faiez', 'role' => 'Member', 'description' => 'University of Sfax, TUNISIA'],
        ['name' => 'GHFIR Younes', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'GHERABI Noureddine', 'role' => 'Member', 'description' => 'ENSAK, Hassan-I University, Khouribga, MOROCCO'],
        ['name' => 'GHOUALMI-ZINE Nacira', 'role' => 'Member', 'description' => 'Badji Mokhtar, Annaba University, ALGERIA'],
        ['name' => 'GHOUILI Jamel', 'role' => 'Member', 'description' => 'Moncton University, CANADA'],
        ['name' => 'GHOUMID Kamal', 'role' => 'Member', 'description' => 'ENSA, UMP, Oujda, MOROCCO'],
        ['name' => 'GILARD Raphaël', 'role' => 'Member', 'description' => 'IET de Rennes, FRANCE'],
        ['name' => 'GONZALEZ Huerta Javier', 'role' => 'Member', 'description' => 'University of Polytechnic-Valencia, SPAIN'],
        ['name' => 'GRANDE Ana', 'role' => 'Member', 'description' => 'Valladolid University, SPAIN'],
        ['name' => 'GUARDADO Amparo Herrera', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'GUENNOUN zouhair', 'role' => 'Member', 'description' => 'EMI, Mohamed V University, Rabat, MOROCCO'],
        ['name' => 'HABIB Ayad', 'role' => 'Member', 'description' => 'FLSH, Mohamadia, MOROCCO'],
        ['name' => 'HAFFAF Hafid', 'role' => 'Member', 'description' => 'University of Oran, ALGERIA'],
        ['name' => 'HAJAMI Abdelmajid', 'role' => 'Member', 'description' => 'ENSIAS, Mohammed V University, Rabat, MOROCCO'],
        ['name' => 'HAJJI Bekkay', 'role' => 'Member', 'description' => 'ENSA, UMP, Oujda, MOROCCO'],
        ['name' => 'HARIRI Said', 'role' => 'Member', 'description' => 'Ecole des Mines de Douai, FRANCE'],
        ['name' => 'HARKAT Houda', 'role' => 'Member', 'description' => 'Institut of telecommunications, Aveiro University, PORTUGAL'],
        ['name' => 'HASSANEIN Hossam', 'role' => 'Member', 'description' => 'Queen\'s University, Kingston, Ontario, CANADA'],
        ['name' => 'HEFNAWI Mostafa', 'role' => 'Member', 'description' => 'Royal Military College, CANADA'],
        ['name' => 'HERRERA Amparo', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'HIMDI Mohamed', 'role' => 'Member', 'description' => 'ESIR, University of Rennes-1, FRANCE'],
        ['name' => 'HINAJE Said', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'HRAOUI Said', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'IBANES Tomas Fernandez', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'IDRISSI KHAMLICHI Youness', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'IJAZ Bilal', 'role' => 'Member', 'description' => 'COMSATS Institute of Info Techno, Islamabad, PAKISTAN'],
        ['name' => 'JAFARGHOLI Amir', 'role' => 'Member', 'description' => 'Amir Kabir University of Technology, IRAN'],
        ['name' => 'JAGDISH Chand Bansal', 'role' => 'Member', 'description' => 'South Asian University, New Delhi, INDIA'],
        ['name' => 'JAMES Michel', 'role' => 'Member', 'description' => 'Univ Blaise Pascal, Clermont-Ferrand, FRANCE'],
        ['name' => 'JAMIL Abdelmajid', 'role' => 'Member', 'description' => 'EST, SMBA University, Fez, MOROCCO'],
        ['name' => 'JARARWEH Yaser', 'role' => 'Member', 'description' => 'University of Science and Technology, JORDON'],
        ['name' => 'JAROU Tariq', 'role' => 'Member', 'description' => 'ENSA of Kenitra, MOROCCO'],
        ['name' => 'João Manuel R. S. Tavares', 'role' => 'Member', 'description' => 'Universidade do Porto, PORTUGAL'],
        ['name' => 'JORIO Mohammed', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'JUNWU TAO', 'role' => 'Member', 'description' => 'INPT of Toulouse, Toulouse, FRANCE'],
        ['name' => 'JURETA Ivan', 'role' => 'Member', 'description' => 'University of Namur, Namur, BELGIUM'],
        ['name' => 'KABBAJ Mohammed Nabil', 'role' => 'Member', 'description' => 'FSDM, SMBA University, Fez, MOROCCO'],
        ['name' => 'KARA Ali', 'role' => 'Member', 'description' => 'Atilim University, TURKEY'],
        ['name' => 'KHAISSIDI Ghizlane', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'KHALIL Mohammed', 'role' => 'Member', 'description' => 'FST Mohamadia, MOROCCO'],
        ['name' => 'KHIREDDINE Abdelkrim', 'role' => 'Member', 'description' => 'Fac of Technology, University A/Mira Bejaia, ALGERIA'],
        ['name' => 'KLILOU Abdessamad', 'role' => 'Member', 'description' => 'FST of Beni-Mellal, MOROCCO'],
        ['name' => 'KOUKAM Abderrafiaa', 'role' => 'Member', 'description' => 'UTBM, Belfort, FRANCE'],
        ['name' => 'LAHRECH Khadija', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'LAKHRISSI Younes', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'LAKHSSASSI Ahmed', 'role' => 'Member', 'description' => 'University of Quebec in Outaouais, CANADA'],
        ['name' => 'LAMHAMDI Tijani', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'LATRACH Mohamed', 'role' => 'Member', 'description' => 'ESEO Angers, FRANCE'],
        ['name' => 'LEBBAR Hassan', 'role' => 'Member', 'description' => 'FST of Mohammedia, Hassan II University, MOROCCO'],
        ['name' => 'LE CLEZIO Emmanuel', 'role' => 'Member', 'description' => 'IES University of Montpellier, FRANCE'],
        ['name' => 'LEGHRIS Cherkaoui', 'role' => 'Member', 'description' => 'FST Mohamadia, MOROCCO'],
        ['name' => 'LIU Lin', 'role' => 'Member', 'description' => 'University of Tsinghua, CHINA'],
        ['name' => 'M. James Stephen', 'role' => 'Member', 'description' => 'Wellfare Engineering College, Visakhapatnam. A.P, INDIA'],
        ['name' => 'Magdalena Salazar Palma', 'role' => 'Member', 'description' => 'Universidad Carlos III de Madrid, SPAIN'],
        ['name' => 'MAHER Hassan', 'role' => 'Member', 'description' => 'University of Sherbrooke, CANADA'],
        ['name' => 'MANSOURI Anass', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'MANTORO Teddy', 'role' => 'Member', 'description' => 'Universitas Siswa Bangsa International, MALAYSIA'],
        ['name' => 'MASMOUDI Nouri', 'role' => 'Member', 'description' => 'ECOLE NATIONALE DE SFAX, TUNISIA'],
        ['name' => 'MASSICOTTE Daniel', 'role' => 'Member', 'description' => 'Quebec University, Trois-Rivières, CANADA'],
        ['name' => 'MATSUHISA Takashi', 'role' => 'Member', 'description' => 'Ibaraki National College of Technology, JAPAN'],
        ['name' => 'MAZARI Bélahcène', 'role' => 'Member', 'description' => 'Groupe CESI, FRANCE'],
        ['name' => 'MAZER Said', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'MECHAQRANE Abdellah', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'MELLIT Adel', 'role' => 'Member', 'description' => 'University of Jijel, ALGERIA'],
        ['name' => 'MERABET Boualem', 'role' => 'Member', 'description' => 'University of Mascara, ALGERIA'],
        ['name' => 'MERIC Stéphane', 'role' => 'Member', 'description' => 'IET de Rennes, FRANCE'],
        ['name' => 'MOTAHHIR Saad', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'MOUMEN Anis', 'role' => 'Member', 'description' => 'ENSA of Kenitra, Ibn Tofail University, MOROCCO'],
        ['name' => 'MOUMKINE Nourddine', 'role' => 'Member', 'description' => 'FST Mohamadia, MOROCCO'],
        ['name' => 'MRABTI Mostafa', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'MYLOPOULOS John', 'role' => 'Member', 'description' => 'University of Trento, ITALY'],
        ['name' => 'NAJAH said', 'role' => 'Member', 'description' => 'FST, SMB university, Fez, MOROCCO'],
        ['name' => 'NAJDAWI Anas', 'role' => 'Member', 'description' => 'Canadian University Dubai, U.A.E'],
        ['name' => 'NASSER Jamalkhan', 'role' => 'Member', 'description' => 'University of Hertfordshire, UK'],
        ['name' => 'NAVEED Bin Rais', 'role' => 'Member', 'description' => 'AUST, U.A.E'],
        ['name' => 'NFAOUI El Hbib', 'role' => 'Member', 'description' => 'FSDM, SMBA University, Fez, MOROCCO'],
        ['name' => 'NOURELDIN Aboelmagd', 'role' => 'Member', 'description' => 'Royal Military College of Canada, CANADA'],
        ['name' => 'NOUVEL Fabienne', 'role' => 'Member', 'description' => 'INSA-Rennes, FRANCE'],
        ['name' => 'NURUL Mahmood', 'role' => 'Member', 'description' => 'Aalborg University, DENMARK'],
        ['name' => 'OUAHABI Abdeldjalil', 'role' => 'Member', 'description' => 'University of Tours, FRANCE'],
        ['name' => 'OUAZZANI Jamil Mohammed', 'role' => 'Member', 'description' => 'UPF, Fez, MOROCCO'],
        ['name' => 'OUGHDIR Lahcen', 'role' => 'Member', 'description' => 'ENSA, SMBA University, Fez, MOROCCO'],
        ['name' => 'PATHAN Al-Sakib Khan', 'role' => 'Member', 'description' => 'Southeast University, BANGLADESH'],
        ['name' => 'PESCAPE Antonio', 'role' => 'Member', 'description' => 'University of Naples, ITALY'],
        ['name' => 'PRUNCU Catalin Iulian', 'role' => 'Member', 'description' => 'University of Birmingham, UK'],
        ['name' => 'PUENTE Antonio Tazon', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'QJIDAA Hassan', 'role' => 'Member', 'description' => 'FS, SMBA University, Fez, MOROCCO'],
        ['name' => 'RAFFAELLI Carla', 'role' => 'Member', 'description' => 'University of Bologna, Bologna, ITALY'],
        ['name' => 'RAMDANI Mohamed', 'role' => 'Member', 'description' => 'ESEO, Angers, FRANCE'],
        ['name' => 'RHALLABI Ahmed', 'role' => 'Member', 'description' => 'PCM IMN Nantes, FRANCE'],
        ['name' => 'RIDDA Mohamed', 'role' => 'Member', 'description' => 'University of Larbi Tebessi, Tebessa, ALGERIA'],
        ['name' => 'RIFI Mounir', 'role' => 'Member', 'description' => 'EST, Casablanca, MOROCCO'],
        ['name' => 'ROOSE Philippe', 'role' => 'Member', 'description' => 'University of Pau, FRANCE'],
        ['name' => 'ROY Avisankar', 'role' => 'Member', 'description' => 'Haldia Institute of Technology, INDIA'],
        ['name' => 'RUANO António Eduardo De Barros', 'role' => 'Member', 'description' => 'Univ do Algarve, Faro, PORTUGAL'],
        ['name' => 'RUANO Maria Da Graça', 'role' => 'Member', 'description' => 'Universidade do Algarve, Faro, PORTUGAL'],
        ['name' => 'RUICHEK Yassine', 'role' => 'Member', 'description' => 'UTBM, Belfort, FRANCE'],
        ['name' => 'SABRI Abdelouahed', 'role' => 'Member', 'description' => 'FS, SMBA University, Fez, MOROCCO'],
        ['name' => 'SADOGHI Mohammad', 'role' => 'Member', 'description' => 'University of Toronto, CANADA'],
        ['name' => 'SALEEM Rashid', 'role' => 'Member', 'description' => 'University of Engineering and Technology, PAKISTAN'],
        ['name' => 'SANCHEZ Angel Mediavilla', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'SENOUCI Sidi-Mohammed', 'role' => 'Member', 'description' => 'University of Bourgogne, FRANCE'],
        ['name' => 'SERHANI Mohamed Adel', 'role' => 'Member', 'description' => 'CIT, UAE University, U.A.E'],
        ['name' => 'SHETA Alaa', 'role' => 'Member', 'description' => 'Electronics Research Institute, Giza, EGYPT'],
        ['name' => 'SICARD Etienne', 'role' => 'Member', 'description' => 'INSA, Toulouse, FRANCE'],
        ['name' => 'SIDDIQI Imran', 'role' => 'Member', 'description' => 'University of Bahria, PAKISTAN'],
        ['name' => 'SLIMANI Abdellatif', 'role' => 'Member', 'description' => 'FST, SMBA University, Fez, MOROCCO'],
        ['name' => 'SRIKANTA Patnaik', 'role' => 'Member', 'description' => 'SOA University & I.I.M.T., Bhubaneswar, INDIA'],
        ['name' => 'TALBI Larbi', 'role' => 'Member', 'description' => 'University of Quebec CANADA'],
        ['name' => 'TAO Junwu', 'role' => 'Member', 'description' => 'ENSEEIHT-LAPLACE, Toulouse University, FRANCE'],
        ['name' => 'TARBOUCHI Mohamed', 'role' => 'Member', 'description' => 'Royal Military College, Kingston, Ontario, CANADA'],
        ['name' => 'TAREK M Sobh', 'role' => 'Member', 'description' => 'School of Engineering, University of Bridgeport, U.S.A'],
        ['name' => 'TEMCAMANI Farid', 'role' => 'Member', 'description' => 'ENSEA, Cergy Pontois, FRANCE'],
        ['name' => 'TISSIER Jérôme', 'role' => 'Member', 'description' => 'ESEO-IETR Angers, FRANCE'],
        ['name' => 'TLEMSANI Redouane', 'role' => 'Member', 'description' => 'Univ of Sciences and Technologies of Oran, ALGERIA'],
        ['name' => 'VAIDYANATHAN Sundarapandian', 'role' => 'Member', 'description' => 'Vel Tech, INDIA'],
        ['name' => 'VASILAKOS Athanasios', 'role' => 'Member', 'description' => 'University of Western Macedonia, GREECE'],
        ['name' => 'VEGAS Angel', 'role' => 'Member', 'description' => 'University of Cantabria, SPAIN'],
        ['name' => 'VIZCAINO Aurora', 'role' => 'Member', 'description' => 'University of Castilla-La Mancha, SPAIN'],
        ['name' => 'VLADIMIR Mazalov', 'role' => 'Member', 'description' => 'IAMR KRC RAS, RUSSIA'],
        ['name' => 'WAHBI Azeddine', 'role' => 'Member', 'description' => 'FS Aïn Chock, University Hassan II, Casablanca, MOROCCO'],
        ['name' => 'WALDEMAR SKOREK Adam', 'role' => 'Member', 'description' => 'University of Quebec at Trois-Rivières, CANADA'],
        ['name' => 'WHALEN Michael', 'role' => 'Member', 'description' => 'University of Minnesota, U.S.A'],
        ['name' => 'WIESBECK Werner', 'role' => 'Member', 'description' => 'Inst of Radio Freq Engineering and Electronics, GERMANY'],
        ['name' => 'YAHYAOUY Ali', 'role' => 'Member', 'description' => 'FS Fez, MOROCCO'],
        ['name' => 'YAMANA Hayato', 'role' => 'Member', 'description' => 'Waseda University, JAPAN'],
        ['name' => 'YAO Xin', 'role' => 'Member', 'description' => 'School of Computer Science, University of Birmingham, UK'],
        ['name' => 'YU-DONG Zhang', 'role' => 'Member', 'description' => 'University of Leicester, ENGLAND'],
        ['name' => 'ZHANG Qingfeng', 'role' => 'Member', 'description' => 'South University of Science and Technology, CHINA'],
        ['name' => 'ZOUITEN Mohammed', 'role' => 'Member', 'description' => 'FP of Taza, SMBA University, MOROCCO']
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
            // Check if the member already exists to prevent duplicates
            $stmt = $db->prepare("SELECT COUNT(*) FROM committees WHERE name = :name AND category = :category");
            $stmt->execute([
                'name' => $member['name'],
                'category' => $category
            ]);

            if ($stmt->fetchColumn() > 0) {
                echo "Skipping: " . $member['name'] . " already exists in " . $category . "<br>";
                continue; // Skip to the next member
            }

            if ($model->create($data)) {
                $totalInserted++;
                echo "Added: " . $member['name'] . " (" . $category . ")<br>";
            } else {
                echo "Error adding " . $member['name'] . " (" . $category . "): Unknown error.<br>";
            }
        } catch (Exception $e) {
            echo "Error adding " . $member['name'] . " (" . $category . "): " . $e->getMessage() . "<br>";
        }
    }
}

echo "<h2>Completed!</h2>";
echo "<p>Total new members inserted: $totalInserted</p>";

// Add this button to easily navigate back to the admin panel
echo '<a href="dashboard.php" style="display: inline-block; margin-top: 20px; padding: 10px 15px; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Return to Dashboard</a>';
?>
