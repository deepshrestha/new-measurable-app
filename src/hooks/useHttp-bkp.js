import { useEffect, useState } from 'react'

export const useHttp = () => {
    const [{httpDeviceFilter, httpDeviceData}, setData] = useState(
        {
            httpDeviceFilter: [],
            httpDeviceData: []
        }
    )

    useEffect(() => {
        console.log("Fetching Data...")
        fetch("/get-presets-and-groups")
        .then(result => {
            return result.json()
        })
        .then(responseFilter => {
            //console.log(responseFilter)
            fetch("/get-device-details-from-cloud",
                {
                    method: "POST",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                }
            )
            .then(result => {
                return result.json()
            })
            .then(responseDevice => {
                setData(
                    {
                        httpDeviceFilter: responseFilter,
                        httpDeviceData: responseDevice
                    }
                )
            })
        })
    }, [])

    return [
        {
            httpDeviceFilter,
            httpDeviceData
        }
    ]
}