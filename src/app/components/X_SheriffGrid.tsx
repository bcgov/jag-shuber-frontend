// import * as React from 'react';
// import SheriffCard from './SheriffCard';
// import { 
//     Sheriff,
//     IdType 
// } from '../api';

// export interface SheriffGridProps {
//     sheriffs: Sheriff[];
//     SheriffRenderer?: React.ReactType<Sheriff>;
//     onClick: (id: IdType) => void;
// }

// class SheriffGrid extends React.PureComponent<SheriffGridProps, any> {
//     render() {
//         const {
//             sheriffs,
//             SheriffRenderer,
//             onClick
//         } = this.props;
//         return (
//             <div 
//                 style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}
//             >
//                 {sheriffs.map(sheriff => (
//                     <div 
//                         key={sheriff.badgeNo}
//                         onClick={() => onClick(sheriff.id)}
//                     >
//                         {SheriffRenderer && <SheriffRenderer {...sheriff} />}
//                         {!SheriffRenderer && <SheriffCard sheriff={sheriff} />}
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }

// export default SheriffGrid;