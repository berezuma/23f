// Sample data mimicking real bulletin entries for demonstration
// This will be replaced by real data fetched via GitHub Actions

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function getTwoDaysAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d.toISOString().split('T')[0];
}

export function generateSampleData() {
  const today = getToday();
  const yesterday = getYesterday();
  const twoDaysAgo = getTwoDaysAgo();

  return [
    // EHAA entries
    {
      id: 'ehaa-001',
      bulletinId: 'ehaa',
      date: today,
      bulletinNumber: '2026040',
      title: 'Hezkuntza Sailburuaren Agindua, ikasturte berrirako matrikulazio epea ezartzen duena',
      summary: 'Oinarrizko Hezkuntzako, Derrigorrezko Bigarren Hezkuntzako, Batxilergoko eta Lanbide Heziketako ikastetxe publikoetako matrikulazio epea eta prozedura arautzen da 2026-2027 ikasturterako.',
      category: 'xedapen_orokorrak',
      organism: 'Hezkuntza Saila',
      url: 'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml',
    },
    {
      id: 'ehaa-002',
      bulletinId: 'ehaa',
      date: today,
      bulletinNumber: '2026040',
      title: 'Ogasun eta Ekonomia Sailaren Ebazpena, zerga-araudiaren aldaketa onartzen duena',
      summary: 'Pertsona fisikoen errentaren gaineko zergaren erregelamenduaren aldaketa partzialari buruzko ebazpena, kenkarien eguneraketa barne.',
      category: 'zergak',
      organism: 'Ogasun eta Ekonomia Saila',
      url: 'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml',
    },
    {
      id: 'ehaa-003',
      bulletinId: 'ehaa',
      date: today,
      bulletinNumber: '2026040',
      title: 'Dirulaguntzen deialdia, kultur ekipamenduak hobetzeko',
      summary: 'Euskal Autonomia Erkidegoko udaletako kultur ekipamenduak hobetzeko eta berritzeko dirulaguntzen deialdia. Aurrekontu osoa: 3.500.000 euro.',
      category: 'dirulaguntzak',
      organism: 'Kultura eta Hizkuntza Politika Saila',
      url: 'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml',
    },
    {
      id: 'ehaa-004',
      bulletinId: 'ehaa',
      date: yesterday,
      bulletinNumber: '2026039',
      title: 'Osasun Sailburuaren Agindua, lehen mailako arretako zerbitzuak antolatzeko',
      summary: 'Lehen mailako arretako osasun zentroen antolaketa eta funtzionamendua arautzen dituen Agindua.',
      category: 'xedapen_orokorrak',
      organism: 'Osasun Saila',
      url: 'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml',
    },
    {
      id: 'ehaa-005',
      bulletinId: 'ehaa',
      date: yesterday,
      bulletinNumber: '2026039',
      title: 'Enplegu publikoko eskaintzaren deialdia: 45 lanpostu',
      summary: 'Eusko Jaurlaritzako administrazio orokorrean 45 lanpostu betetzeko deialdia. Epea: 20 egun natural.',
      category: 'lanpoltsa',
      organism: 'Gobernantza Publikoa eta Autogobernua Saila',
      url: 'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml',
    },

    // NAO entries
    {
      id: 'nao-001',
      bulletinId: 'nao',
      date: today,
      bulletinNumber: '42',
      title: 'Foru Agindua, Nafarroako Gobernuaren eraikin publikoen energia-eraginkortasuna hobetzeko plana onartzen duena',
      summary: 'Nafarroako eraikin publikoen klimatizazio eta isolamendu sistemen hobekuntza programa. 12 milioi euroko aurrekontua 2026-2028 aldirako.',
      category: 'xedapen_orokorrak',
      organism: 'Lurralde Antolaketa Departamentua',
      url: 'https://bon.navarra.es/eu/hasiera',
    },
    {
      id: 'nao-002',
      bulletinId: 'nao',
      date: today,
      bulletinNumber: '42',
      title: 'Irunerako hiri garraio elektriko sarearen proiektua',
      summary: 'Irunean garraio publiko elektrikoaren sarea hedatzeko proiektuaren jendaurreko erakusketa, 30 eguneko epean.',
      category: 'hirigintza',
      organism: 'Garraio Departamentua',
      url: 'https://bon.navarra.es/eu/hasiera',
    },
    {
      id: 'nao-003',
      bulletinId: 'nao',
      date: yesterday,
      bulletinNumber: '41',
      title: 'Nekazaritza eta abeltzaintzarako dirulaguntzak 2026',
      summary: 'Nafarroako nekazaritza eta abeltzaintza ustiategien modernizaziorako laguntzak. Aurrekontua: 8.200.000 euro.',
      category: 'dirulaguntzak',
      organism: 'Landa Garapena eta Ingurumena Departamentua',
      url: 'https://bon.navarra.es/eu/hasiera',
    },
    {
      id: 'nao-004',
      bulletinId: 'nao',
      date: yesterday,
      bulletinNumber: '41',
      title: 'Osasunbideako 28 lanposturen deialdia',
      summary: 'Osasunbidea-Nafarroako Osasun Zerbitzuko erizaintzako 28 lanposturen deialdi publikoa.',
      category: 'lanpoltsa',
      organism: 'Osasun Departamentua',
      url: 'https://bon.navarra.es/eu/hasiera',
    },

    // BAO entries
    {
      id: 'bao-001',
      bulletinId: 'bao',
      date: today,
      bulletinNumber: '45',
      title: 'Bizkaiko Foru Aldundiak industria txikientzako laguntzak iragarri ditu',
      summary: 'Bizkaiko industria txiki eta ertainen digitalizaziorako laguntza programa berria. Laguntza maximoa: 50.000 euro enpresa bakoitzeko.',
      category: 'dirulaguntzak',
      organism: 'Ekonomia Sustapena Saila',
      url: 'https://www.bizkaia.eus/eu/bao',
    },
    {
      id: 'bao-002',
      bulletinId: 'bao',
      date: today,
      bulletinNumber: '45',
      title: 'Hiri antolamenduko plan orokorraren aldaketa Mungia udalerrian',
      summary: 'Mungia udalerriko hiri antolamenduko plan orokorraren 12. aldaketa puntualaren behin betiko onarpena.',
      category: 'hirigintza',
      organism: 'Lurralde Plangintza Saila',
      url: 'https://www.bizkaia.eus/eu/bao',
    },
    {
      id: 'bao-003',
      bulletinId: 'bao',
      date: yesterday,
      bulletinNumber: '44',
      title: 'Zerga alorreko aldaketak: BEZaren erregelamendu berria',
      summary: 'Bizkaiko Lurralde Historikoko BEZaren erregelamenduaren aldaketa partzialaren behin betiko onarpena.',
      category: 'zergak',
      organism: 'Ogasun eta Finantza Saila',
      url: 'https://www.bizkaia.eus/eu/bao',
    },
    {
      id: 'bao-004',
      bulletinId: 'bao',
      date: twoDaysAgo,
      bulletinNumber: '43',
      title: '12 informatikari lanposturen deialdia Bizkaiko Foru Aldundian',
      summary: 'Bizkaiko Foru Aldundiko informatika zerbitzuetako 12 lanpostu betetzeko lehiaketa-oposizioa.',
      category: 'lanpoltsa',
      organism: 'Bizkaiko Foru Aldundia',
      url: 'https://www.bizkaia.eus/eu/bao',
    },

    // BOTHA entries
    {
      id: 'botha-001',
      bulletinId: 'botha',
      date: today,
      bulletinNumber: '24',
      title: 'Arabako nekazaritza lurren babesa bermatzeko foru araua',
      summary: 'Nekazaritza lurren babesa eta nekazaritza jardueraren iraunkortasuna bermatzeko foru araua onartu da.',
      category: 'xedapen_orokorrak',
      organism: 'Arabako Foru Aldundia',
      url: 'https://www.araba.eus/BOTHA/Inicio/SGBO5001.aspx?Idi=eu',
    },
    {
      id: 'botha-002',
      bulletinId: 'botha',
      date: today,
      bulletinNumber: '24',
      title: 'Gasteizko turismo jasangarriaren sustapen plana',
      summary: 'Gasteiz hiriaren turismo jasangarriaren sustapen plana, kultur ondarea eta natura-baliabideak ardatz dituela.',
      category: 'administrazio_egintzak',
      organism: 'Turismo eta Kirol Saila',
      url: 'https://www.araba.eus/BOTHA/Inicio/SGBO5001.aspx?Idi=eu',
    },
    {
      id: 'botha-003',
      bulletinId: 'botha',
      date: yesterday,
      bulletinNumber: '23',
      title: 'Kultur ekitaldietarako dirulaguntzak: 2026ko deialdia',
      summary: 'Arabako lurralde historikoko kultur ekitaldi eta jaietarako dirulaguntzen deialdia. 450.000 euroko aurrekontua.',
      category: 'dirulaguntzak',
      organism: 'Kultura Saila',
      url: 'https://www.araba.eus/BOTHA/Inicio/SGBO5001.aspx?Idi=eu',
    },

    // GAO entries
    {
      id: 'gao-001',
      bulletinId: 'gao',
      date: today,
      bulletinNumber: '38',
      title: 'Gipuzkoako garraio publikoaren sare berria 2026ko udatik aurrera',
      summary: 'Gipuzkoako autobus sarearen berrantolaketa, maiztasuna handituz eta ibilbide berriak sortuz, 2026ko ekainetik aurrera.',
      category: 'administrazio_egintzak',
      organism: 'Mugikortasun eta Garraio Saila',
      url: 'https://egoitza.gipuzkoa.eus/eu/GAO',
    },
    {
      id: 'gao-002',
      bulletinId: 'gao',
      date: today,
      bulletinNumber: '38',
      title: 'Enpresa berritzaileentzako laguntza programa',
      summary: 'Gipuzkoako enpresa txiki eta ertainen berrikuntza proiektuetarako laguntza programa. Guztira: 4.000.000 euro.',
      category: 'dirulaguntzak',
      organism: 'Ekonomia Sustapena, Landa Ingurunea eta Lurralde Oreka Saila',
      url: 'https://egoitza.gipuzkoa.eus/eu/GAO',
    },
    {
      id: 'gao-003',
      bulletinId: 'gao',
      date: yesterday,
      bulletinNumber: '37',
      title: 'Donostiako kostaldeko ingurunearen babes plana',
      summary: 'Donostiako kostaldeko ingurunearen babes eta kudeaketa plan bereziaren hasierako onarpena.',
      category: 'hirigintza',
      organism: 'Ingurumen eta Obra Hidraulikoak Saila',
      url: 'https://egoitza.gipuzkoa.eus/eu/GAO',
    },
    {
      id: 'gao-004',
      bulletinId: 'gao',
      date: yesterday,
      bulletinNumber: '37',
      title: '18 teknikari lanposturen deialdia Gipuzkoako Foru Aldundian',
      summary: 'Gipuzkoako Foru Aldundiko zerbitzu teknikoetako 18 lanpostu betetzeko deialdi publikoa.',
      category: 'lanpoltsa',
      organism: 'Gipuzkoako Foru Aldundia',
      url: 'https://egoitza.gipuzkoa.eus/eu/GAO',
    },
    {
      id: 'gao-005',
      bulletinId: 'gao',
      date: twoDaysAgo,
      bulletinNumber: '36',
      title: 'Ondare higiezinaren gaineko zergaren bonifikazioa energia berriztagarrientzat',
      summary: 'Energia berriztagarrien instalazioa duten higiezinen jabetza zergaren %50eko bonifikazioa.',
      category: 'zergak',
      organism: 'Ogasun eta Finantza Departamentua',
      url: 'https://egoitza.gipuzkoa.eus/eu/GAO',
    },
  ];
}
