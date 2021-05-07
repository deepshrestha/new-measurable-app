import { useEffect, useState } from 'react'

export const useHttp = () => {
    const [{httpDeviceFilter, httpDeviceData}, setData] = useState(
        {
            httpDeviceFilter: [],
            httpDeviceData: []
        }
    )

    const loadingScreen = document.getElementById("loading-screen");

    useEffect(() => {
        loadingScreen.style.display = "block";
        console.log("Fetching Data...")
        let getPresetsGroups = fetch("http://www.json-generator.com/api/json/get/bUaBuvaSYy?indent=2")
        let getDeviceDetailsFromCloud = fetch("http://www.json-generator.com/api/json/get/cfTaBqIKzS?indent=2",
            {
                method: "GET"
                /* method: "POST",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                } */
            }
        )
        
        Promise.all([getPresetsGroups, getDeviceDetailsFromCloud])
        .then( results => {
            let httpDeviceFilter = results[0].json()
            let httpDeviceData = results[1].json()

            httpDeviceFilter
            .then(responseFilter => {
                httpDeviceData
                .then(responseDevice => {
                    loadingScreen.style.display = "none";
                    setData(
                        {
                            httpDeviceFilter: responseFilter,
                            httpDeviceData: responseDevice
                        }
                    )
                })
            })
        })
        .catch(err => {
            loadingScreen.style.display = "none";
            throw new Error(err)
        })            
    }, [])

    return [
        {
            httpDeviceFilter,
            httpDeviceData
        },
        setData
    ]
}