// import React, { useState } from 'react';

// type FiltersProps = {
//   continents: string[];
//   languages: string[];
//   onFilter: (filters: {
//     continents: string[];
//     language: string;
//     minCitizens: number;
//     maxCitizens: number;
//     countrySearch: string;
//     capitalSearch: string;
//   }) => void;
// };

// const Filters: React.FC<FiltersProps> = ({ continents, languages, onFilter }) => {
//   const [selectedContinents, setSelectedContinents] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState('');
//   const [minCitizens, setMinCitizens] = useState(0);
//   const [maxCitizens, setMaxCitizens] = useState(100);
//   const [countrySearch, setCountrySearch] = useState('');
//   const [capitalSearch, setCapitalSearch] = useState('');

//   const handleFilter = () => {
//     onFilter({
//       continents: selectedContinents,
//       language: selectedLanguage,
//       minCitizens,
//       maxCitizens,
//       countrySearch,
//       capitalSearch,
//     });
//   };

//   return (
//     <div className="filters">
//       <div className="filters__region">
//         <select
//           multiple
//           onChange={(e) => setSelectedContinents(Array.from(e.target.selectedOptions, (option) => option.value))}
//         >
//           {continents.map((continent) => (
//             <option key={continent} value={continent}>
//               {continent}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="filters__citizens">
//         <input type="number" min="0" max="100" defaultValue="0" onChange={(e) => setMinCitizens(e.target.value)} />
//         <input type="number" min="0" max="100" defaultValue="100" onChange={(e) => setMaxCitizens(e.target.value)} />
//       </div>

//       <div className="filters__language">
//         <select onChange={(e) => setSelectedLanguage(e.target.value)}>
//           {languages.map((language) => (
//             <option key={language} value={language}>
//               {language}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="filters__search">
//         <input type="text" placeholder="Nom du pays" onChange={(e) => setCountrySearch(e.target.value)} />
//         <input type="text" placeholder="Nom de la capitale" onChange={(e) => setCapitalSearch(e.target.value)} />
//       </div>

//       <button onClick={handleFilter}>Actualiser</button>
//     </div>
//   );
// };

// export default Filters;
