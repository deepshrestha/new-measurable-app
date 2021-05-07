import React, { createContext } from 'react'
import { useHttp } from './../hooks/useHttp'

export const FilterContext = createContext()

const GlobalFilterContext = ({children}) => {

    const [{httpDeviceFilter, httpDeviceData}, setFilter] = useHttp()
    //console.log(httpDeviceFilter, httpDeviceData)

    return (
        <FilterContext.Provider value={[{httpDeviceFilter, httpDeviceData}, setFilter]}>
            { children }
        </FilterContext.Provider>
    )
}

export default GlobalFilterContext
