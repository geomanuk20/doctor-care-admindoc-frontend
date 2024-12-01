import { createContext } from "react";
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

const AppContextProvider = ({children}) =>{
    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }


      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate) => { const dateArray = slotDate.split('_'); const monthIndex = parseInt(dateArray[1], 10) - 1; 
     return dateArray[0] + " " + months[monthIndex] + " " + dateArray[2];
     };


    const value = {
        calculateAge,
        slotDateFormat
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AppContextProvider;