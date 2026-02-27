export const BULLETINS = {
  ehaa: {
    id: 'ehaa',
    name: 'EHAA',
    fullName: 'Euskal Herriko Agintaritzaren Aldizkaria',
    fullNameEs: 'Boletin Oficial del Pais Vasco (BOPV)',
    territory: 'Euskal Autonomia Erkidegoa',
    url: 'https://www.euskadi.eus/web01-bopv/eu/bopv2/datos/Azkena.shtml',
    apiUrl: 'https://api.euskadi.eus/bopv',
    color: 'var(--ehaa-color)',
    bg: 'var(--ehaa-bg)',
    border: 'var(--ehaa-border)',
    colorHex: '#2b6cb0',
  },
  nao: {
    id: 'nao',
    name: 'NAO',
    fullName: 'Nafarroako Aldizkari Ofiziala',
    fullNameEs: 'Boletin Oficial de Navarra (BON)',
    territory: 'Nafarroako Foru Komunitatea',
    url: 'https://bon.navarra.es/eu/hasiera',
    color: 'var(--nao-color)',
    bg: 'var(--nao-bg)',
    border: 'var(--nao-border)',
    colorHex: '#9b2c2c',
  },
  bao: {
    id: 'bao',
    name: 'BAO',
    fullName: 'Bizkaiko Aldizkari Ofiziala',
    fullNameEs: 'Boletin Oficial de Bizkaia',
    territory: 'Bizkaia',
    url: 'https://www.bizkaia.eus/eu/bao',
    color: 'var(--bao-color)',
    bg: 'var(--bao-bg)',
    border: 'var(--bao-border)',
    colorHex: '#2f855a',
  },
  botha: {
    id: 'botha',
    name: 'BOTHA',
    fullName: 'Arabako Lurralde Historikoko Aldizkari Ofiziala',
    fullNameEs: 'Boletin Oficial del Territorio Historico de Alava',
    territory: 'Araba',
    url: 'https://www.araba.eus/BOTHA/Inicio/SGBO5001.aspx?Idi=eu',
    color: 'var(--botha-color)',
    bg: 'var(--botha-bg)',
    border: 'var(--botha-border)',
    colorHex: '#744210',
  },
  gao: {
    id: 'gao',
    name: 'GAO',
    fullName: 'Gipuzkoako Aldizkari Ofiziala',
    fullNameEs: 'Boletin Oficial de Gipuzkoa',
    territory: 'Gipuzkoa',
    url: 'https://egoitza.gipuzkoa.eus/eu/GAO',
    color: 'var(--gao-color)',
    bg: 'var(--gao-bg)',
    border: 'var(--gao-border)',
    colorHex: '#553c9a',
  },
};

export const BULLETIN_ORDER = ['ehaa', 'nao', 'bao', 'botha', 'gao'];

export const CATEGORIES = {
  xedapen_orokorrak: {
    label: 'Xedapen orokorrak',
    labelEs: 'Disposiciones generales',
  },
  administrazio_egintzak: {
    label: 'Administrazio egintzak',
    labelEs: 'Actos administrativos',
  },
  iragarkiak: {
    label: 'Iragarkiak',
    labelEs: 'Anuncios',
  },
  bestelakoak: {
    label: 'Bestelakoak',
    labelEs: 'Otros',
  },
  lanpoltsa: {
    label: 'Lan-poltsak eta enplegu publikoa',
    labelEs: 'Bolsas de empleo y empleo publico',
  },
  dirulaguntzak: {
    label: 'Dirulaguntzak',
    labelEs: 'Subvenciones y ayudas',
  },
  hirigintza: {
    label: 'Hirigintza eta ingurumena',
    labelEs: 'Urbanismo y medio ambiente',
  },
  zergak: {
    label: 'Zerga araudia',
    labelEs: 'Normativa fiscal',
  },
};
