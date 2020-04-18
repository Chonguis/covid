const data: {
  [key: string]: string | number;
}[] = [
  {
    "municipality": "Aguada",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Aguadilla",
    "number": 3,
    "percent": 0.8,
    
  },
  {
    "municipality": "Aguas Buenas",
    "number": 8,
    "percent": 2,
    
  },
  {
    "municipality": "Aibonito",
    "number": 3,
    "percent": 0.8,
    
  },
  {
    "municipality": "Añasco",
    "number": 4,
    "percent": 1,
    
  },
  {
    "municipality": "Arecibo",
    "number": 7,
    "percent": 1.8,
    
  },
  {
    "municipality": "Barranquitas",
    "number": 4,
    "percent": 1,
    
  },
  {
    "municipality": "Bayamón",
    "number": 29,
    "percent": 7.3,
    
  },
  {
    "municipality": "Cabo Rojo",
    "number": 7,
    "percent": 1.8,
    
  },
  {
    "municipality": "Caguas",
    "number": 20,
    "percent": 5.1,
    
  },
  {
    "municipality": "Camuy",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Canóvanas",
    "number": 3,
    "percent": 0.8,
    
  },
  {
    "municipality": "Carolina",
    "number": 27,
    "percent": 6.8,
    
  },
  {
    "municipality": "Cataño",
    "number": 4,
    "percent": 1,
    
  },
  {
    "municipality": "Cayey",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Ceiba",
    "number": 3,
    "percent": 0.8,
    
  },
  {
    "municipality": "Cidra",
    "number": 5,
    "percent": 1.3,
    
  },
  {
    "municipality": "Corozal",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Dorado",
    "number": 7,
    "percent": 1.8,
    
  },
  {
    "municipality": "Guánica",
    "number": 4,
    "percent": 1,
    
  },
  {
    "municipality": "Guayama",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Guaynabo",
    "number": 30,
    "percent": 7.6,
    
  },
  {
    "municipality": "Gurabo",
    "number": 4,
    "percent": 1,
    
  },
  {
    "municipality": "Hatillo",
    "number": 5,
    "percent": 1.3,
    
  },
  {
    "municipality": "Hormigueros",
    "number": 5,
    "percent": 1.3,
    
  },
  {
    "municipality": "Humacao",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Isabela",
    "number": "",
    "percent": 1.3,
    
  },
  {
    "municipality": "Juana Díaz",
    "number": 13,
    "percent": 3.3,
    
  },
  {
    "municipality": "Juncos",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Lajas",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Lares",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Las Piedras",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Loíza",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Luquillo",
    "number": 4,
    "percent": 1,
    
  },
  {
    "municipality": "Manatí",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Maunabo",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Mayagüez",
    "number": 15,
    "percent": 3.8,
    
  },
  {
    "municipality": "Moca",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Morovis",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Naguabo",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Naranjito",
    "number": 3,
    "percent": 0.8,
    
  },
  {
    "municipality": "Orocovis",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Ponce",
    "number": 8,
    "percent": 2,
    
  },
  {
    "municipality": "Quebradillas",
    "number": 9,
    "percent": 2.3,
    
  },
  {
    "municipality": "Rincón",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Río Grande",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "Sábana Grande",
    "number": 3,
    "percent": 0.8,
    
  },
  {
    "municipality": "Salinas",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "San Germán",
    "number": 4,
    "percent": 1,
    
  },
  {
    "municipality": "San Juan",
    "number": 60,
    "percent": 15.2,
    
  },
  {
    "municipality": "San Lorenzo",
    "number": 2,
    "percent": 0.5,
    
  },
  {
    "municipality": "San Sebastián",
    "number": 7,
    "percent": 1.8,
    
  },
  {
    "municipality": "Santa Isabel",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Toa Alta",
    "number": 8,
    "percent": 2,
    
  },
  {
    "municipality": "Toa Baja",
    "number": 12,
    "percent": 3,
    
  },
  {
    "municipality": "Trujillo Alto",
    "number": 12,
    "percent": 3,
    
  },
  {
    "municipality": "Vega Alta",
    "number": 7,
    "percent": 1.8,
    
  },
  {
    "municipality": "Vega Baja",
    "number": 3,
    "percent": 0.8,
    
  },
  {
    "municipality": "Villalba",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Yabucoa",
    "number": 1,
    "percent": 0.3,
    
  },
  {
    "municipality": "Yauco",
    "number": 7,
    "percent": 1.8,
    
  },
  {
    "municipality": "Nueva York",
    "number": 5,
    "percent": "",
    
  },
  {
    "municipality": "No disponible",
    "number": 324,
    "percent": "",
    
  }
]

export default data;