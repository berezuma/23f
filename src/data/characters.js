export const CHARACTERS = {
  TEJERO: {
    id: 'tejero',
    name: 'Antonio Tejero',
    role: 'Teniente Coronel de la Guardia Civil',
    color: '#e74c3c',
    description: 'Lideró el asalto al Congreso de los Diputados con un grupo de guardias civiles.',
  },
  MILANS: {
    id: 'milans',
    name: 'Jaime Milans del Bosch',
    role: 'Capitán General de la III Región Militar (Valencia)',
    color: '#e67e22',
    description: 'Se sublevó en Valencia sacando los tanques a la calle.',
  },
  REY: {
    id: 'rey',
    name: 'Juan Carlos I',
    role: 'Rey de España',
    color: '#3498db',
    description: 'Monarca que se opuso al golpe y ordenó a los militares mantener el orden constitucional.',
  },
  ARMADA: {
    id: 'armada',
    name: 'Alfonso Armada',
    role: 'General, ex-secretario del Rey',
    color: '#9b59b6',
    description: 'Propuso una "solución política" con un gobierno de concentración bajo su presidencia.',
  },
  CESID: {
    id: 'cesid',
    name: 'CESID',
    role: 'Centro Superior de Información de la Defensa',
    color: '#1abc9c',
    description: 'Servicio de inteligencia español. Varios miembros de la AOME participaron activamente en el golpe.',
  },
  SABINO: {
    id: 'sabino',
    name: 'Sabino Fernández Campo',
    role: 'Secretario General de la Casa del Rey',
    color: '#2ecc71',
    description: 'Papel clave en las comunicaciones con los golpistas y mandos militares desde la Zarzuela.',
  },
  GARCIA_CARRES: {
    id: 'garcia_carres',
    name: 'Juan García Carrés',
    role: 'Dirigente sindical ultraderechista',
    color: '#f39c12',
    description: 'Enlace civil de la conspiración, mantuvo conversaciones telefónicas con Tejero durante el asalto.',
  },
};

export const CHARACTER_LIST = Object.values(CHARACTERS);
