// Coordinates are approximate city-centre points, sufficient for weather lookups.
// This list is the source of truth for "all cities of Punjab" coverage; the
// search bar also falls back to live geocoding for any city not listed here.
const punjabCities = [
  { name: 'Lahore', lat: 31.5497, lon: 74.3436 },
  { name: 'Faisalabad', lat: 31.4187, lon: 73.0791 },
  { name: 'Rawalpindi', lat: 33.5651, lon: 73.0169 },
  { name: 'Multan', lat: 30.1575, lon: 71.5249 },
  { name: 'Gujranwala', lat: 32.1877, lon: 74.1945 },
  { name: 'Sialkot', lat: 32.4945, lon: 74.5229 },
  { name: 'Bahawalpur', lat: 29.3956, lon: 71.6836 },
  { name: 'Sargodha', lat: 32.0836, lon: 72.6711 },
  { name: 'Sheikhupura', lat: 31.7131, lon: 73.9783 },
  { name: 'Gujrat', lat: 32.5740, lon: 74.0789 },
  { name: 'Jhelum', lat: 32.9425, lon: 73.7257 },
  { name: 'Kasur', lat: 31.1187, lon: 74.4467 },
  { name: 'Okara', lat: 30.8081, lon: 73.4460 },
  { name: 'Sahiwal', lat: 30.6682, lon: 73.1114 },
  { name: 'Attock', lat: 33.7666, lon: 72.3600 },
  { name: 'Chakwal', lat: 32.9328, lon: 72.8630 },
  { name: 'Hafizabad', lat: 32.0712, lon: 73.6885 },
  { name: 'Mandi Bahauddin', lat: 32.5859, lon: 73.4914 },
  { name: 'Narowal', lat: 32.1017, lon: 74.8797 },
  { name: 'Rahim Yar Khan', lat: 28.4212, lon: 70.2989 },
  { name: 'Khanewal', lat: 30.3013, lon: 71.9322 },
  { name: 'Lodhran', lat: 29.5406, lon: 71.6320 },
  { name: 'Pakpattan', lat: 30.3453, lon: 73.3903 },
  { name: 'Vehari', lat: 30.0453, lon: 72.3489 },
  { name: 'Muzaffargarh', lat: 30.0736, lon: 71.1932 },
  { name: 'Layyah', lat: 30.9693, lon: 70.9428 },
  { name: 'Bhakkar', lat: 31.6252, lon: 71.0654 },
  { name: 'Mianwali', lat: 32.5850, lon: 71.5440 },
  { name: 'Toba Tek Singh', lat: 30.9709, lon: 72.4839 },
  { name: 'Chiniot', lat: 31.7200, lon: 72.9781 },
  { name: 'Jhang', lat: 31.2781, lon: 72.3317 },
  { name: 'Nankana Sahib', lat: 31.4500, lon: 73.7000 }
];

export default punjabCities;
